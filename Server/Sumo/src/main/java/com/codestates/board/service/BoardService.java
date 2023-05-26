package com.codestates.board.service;


import com.codestates.auth.LoginUtils;
import com.codestates.aws.S3Uploader;
import com.codestates.board.entity.Board;
import com.codestates.board.entity.BoardLike;
import com.codestates.board.repository.BoardLikeRepository;
import com.codestates.board.repository.BoardRepository;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.member.entity.Member;
import com.codestates.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.Optional;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private BoardLikeRepository boardLikeRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private S3Uploader S3Uploader;


    // 게시글 생성
    @Transactional
    public Board createBoard(Board board){

        Member currentMember = getCurrentMember();
        board.setMember(currentMember);
        currentMember.addBoard(board);

        if(Boolean.TRUE.equals(board.getCalendarShare()) && canCalendarShare(currentMember.getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_POSTED_THIS_MONTH);
        }

        if(board.getCalendarShare() != null){
            board.setCalendarShare(board.getCalendarShare());
        }
        if(board.getWorkoutRecordShare() != null){
            board.setWorkoutRecordShare(board.getWorkoutRecordShare());
        }


        return boardRepository.save(board);

    }

    @Transactional
    public Board createBoardWithImage(Board board, MultipartFile image) throws IOException{

        Member currentMember = getCurrentMember();
        board.setMember(currentMember);
        currentMember.addBoard(board);

        if(Boolean.TRUE.equals(board.getCalendarShare()) && canCalendarShare(currentMember.getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_POSTED_THIS_MONTH);
        }

        if(board.getCalendarShare() != null){
            board.setCalendarShare(board.getCalendarShare());
        }
        if(board.getWorkoutRecordShare() != null){
            board.setWorkoutRecordShare(board.getWorkoutRecordShare());
        }

        uploadImageToS3(board, image, currentMember);

        return boardRepository.save(board);

    }


    // 게시글 수정
    @Transactional
    public Board updateBoard(Board board){

        Member currentMember = getCurrentMember();
        Board findBoard = findVerifiedBoard(board.getBoardId());


        if (!findBoard.getMember().getMemberId().equals(currentMember.getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.BOARD_ACCESS_DENIED);
        }

        Optional.ofNullable(board.getTitle()).ifPresent(title -> findBoard.setTitle(title));
        Optional.ofNullable(board.getContent()).ifPresent(content -> findBoard.setContent(content));
        Optional.ofNullable(board.getCalendarShare()).ifPresent(calendarShare -> findBoard.setCalendarShare(calendarShare));
        Optional.ofNullable(board.getWorkoutRecordShare()).ifPresent(workoutRecordShare -> findBoard.setWorkoutRecordShare(workoutRecordShare));

        findBoard.setModifiedAt(LocalDateTime.now());
        return boardRepository.save(findBoard);
    }

    // TODO 수정할 때 확장자가 다른 경우에 파일이 대체되지 않음(다른 이름은 같은데 확장자가 달라서 이름 자체가 다른 것으로 인식)
    @Transactional
    public Board updateBoardWithImage(Board board, MultipartFile image) throws IOException {

        Member currentMember = getCurrentMember();
        Board findBoard = findVerifiedBoard(board.getBoardId());


        if (!findBoard.getMember().getMemberId().equals(currentMember.getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.BOARD_ACCESS_DENIED);
        }

        Optional.ofNullable(board.getTitle()).ifPresent(title -> findBoard.setTitle(title));
        Optional.ofNullable(board.getContent()).ifPresent(content -> findBoard.setContent(content));
        Optional.ofNullable(board.getBoardImageAddress()).ifPresent(boardImageAddress -> findBoard.setBoardImageAddress(boardImageAddress));
        Optional.ofNullable(board.getCalendarShare()).ifPresent(calendarShare -> findBoard.setCalendarShare(calendarShare));
        Optional.ofNullable(board.getWorkoutRecordShare()).ifPresent(workoutRecordShare -> findBoard.setWorkoutRecordShare(workoutRecordShare));

        if (!image.isEmpty()) {
            Member member = memberRepository.findByEmail(currentMember.getEmail()).get();
            uploadImageToS3(findBoard, image, member);
        }


        findBoard.setModifiedAt(LocalDateTime.now());
        return boardRepository.save(findBoard);
    }

    // 게시글 삭제
    public void deleteBoard(long boardId){
        Member currentMember = getCurrentMember();
        Board board = findVerifiedBoard(boardId);

        if (!board.getMember().getMemberId().equals(currentMember.getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.BOARD_ACCESS_DENIED);
        }

        boardRepository.deleteById(boardId);
    }


    // 게시글 조회
    public Board findBoard(long boardId){
        Board findBoard = findVerifiedBoard(boardId);

        findBoard.setViewCount(findBoard.getViewCount() +1);
        boardRepository.save(findBoard);

        return findBoard;
    }

    // 게시글 확인
    private Board findVerifiedBoard(long boardId){
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        Board findBoard =
                optionalBoard.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        return findBoard;
    }


  
    //TOGGLE LIKE
    public void toggleLike(Long memberId, Long boardId){
        Board board = findVerifiedBoard(boardId);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Optional<BoardLike> boardLike = boardLikeRepository.findByBoardAndMember(board, member);


        if(boardLike.isPresent()) {
            if (boardLike.get().getBoardLikeStatus() == BoardLike.BoardLikeStatus.LIKE){
                    boardLike.get().setBoardLikeStatus(BoardLike.BoardLikeStatus.DISLIKE);
            } else {
                boardLike.get().setBoardLikeStatus(BoardLike.BoardLikeStatus.LIKE);
            }
            boardLikeRepository.save(boardLike.get());
        } else{
            BoardLike newBoardLike = new BoardLike(board, member);
            newBoardLike.setBoardLikeStatus(BoardLike.BoardLikeStatus.LIKE);
            boardLikeRepository.save(newBoardLike);
        }

        board.setBoardLike(boardLikeRepository.findByBoard(board));
    }



    public Page<Board> getGeneralSortedBoards(PageRequest pageRequest, String orderBy) {
        return boardRepository.findAll(getPageableWithSort(pageRequest, orderBy));
    }

    public Page<Board> getBoardsWithCheckbox(boolean calendarShare, PageRequest pageRequest, String orderBy) {
        return calendarShare ? boardRepository.findAllByCalendarShareTrue(getPageableWithSort(pageRequest, orderBy))
                : boardRepository.findAllByCalendarShareFalse(getPageableWithSort(pageRequest, orderBy));
    }

    private Pageable getPageableWithSort(PageRequest pageRequest, String orderBy) {
        Sort sort = getSort(orderBy);
        return PageRequest.of(pageRequest.getPageNumber(), pageRequest.getPageSize(), sort);
    }

    private Sort getSort(String orderBy) {
        if(orderBy == null || orderBy.equalsIgnoreCase("latest")){
            return Sort.by(Sort.Direction.DESC, "createdAt");
        } else if (orderBy.equalsIgnoreCase("oldest")){
            return Sort.by(Sort.Direction.ASC, "createdAt");
        } else if (orderBy.equalsIgnoreCase("boardLike")){
            return Sort.by(Sort.Direction.DESC, "boardLike");
        } else if (orderBy.equalsIgnoreCase("comments")){
            return Sort.by(Sort.Direction.DESC, "commentCount");
        } else {
            throw new BusinessLogicException(ExceptionCode.INVALID_ORDER_BY_PARAMETER);
        }
    }


    //현재 로그인한 회원 정보 가지고오기
    private Member getCurrentMember() {
        String email = LoginUtils.checkLogin();
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }


    //보드 좋아요 개수 체크
    public int getBoardLikesCount(long boardId){
        Board board = findVerifiedBoard(boardId);
        int boardLike = board.getBoardLikeCount();
        return boardLike ;
    }

    public boolean canCalendarShare(Long memberId){
        YearMonth currentYearMonth = YearMonth.now();
        LocalDateTime startOfMonth = currentYearMonth.atDay(1).atStartOfDay();
        LocalDateTime endOfMonth = currentYearMonth.atEndOfMonth().atTime(23, 59, 59);

        boolean canPost = boardRepository.existsByMemberIdAndCalendarShareAndCreatedAtBetween(memberId, true, startOfMonth, endOfMonth);
        // 이번 달에 체크박스가 true로 설정된 게시글을 작성했다면, false반환.
        // 작성가능하면 true반환.
        return canPost;
    }


    // 파일 이름에서 확장자 추출 메서드
    private String getFileExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf(".");
        if (dotIndex > 0 && dotIndex < fileName.length() - 1) {
            return fileName.substring(dotIndex);
        }
        return "";
    }

    private void uploadImageToS3(Board board, MultipartFile image, Member member) throws IOException {
        // s3에 업로드 할 파일명 변경
        String fileExtension = getFileExtension(image.getOriginalFilename());
        String newFileName = "memberId-" + String.valueOf(member.getMemberId()) + "(" + board.getCreatedAt().toString() + ")" + fileExtension;

        // s3에 업로드 한 후 schedule에 imageAddress 세팅
        String imageAddress = S3Uploader.upload(image, newFileName, member.getNickname() + "/board");
        board.setBoardImageAddress(imageAddress);
    }

    public long getBoardCount() {
        return boardRepository.count();
    }


    public boolean isLikedByMember(Long boardId) {
        Member currentMember = getCurrentMember();
        Board verifiedBoard = findVerifiedBoard(boardId);
        return boardLikeRepository.findByBoardAndMember(verifiedBoard, currentMember)
                .map(boardLike -> boardLike.getBoardLikeStatus() == BoardLike.BoardLikeStatus.LIKE)
                .orElse(false);
    }





}