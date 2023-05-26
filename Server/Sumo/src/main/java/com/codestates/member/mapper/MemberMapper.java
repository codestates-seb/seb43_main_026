package com.codestates.member.mapper;

import com.codestates.board.dto.BoardResponseDto;
import com.codestates.board.entity.Board;
import com.codestates.board.mapper.BoardMapper;
import com.codestates.member.dto.MemberDto;
import com.codestates.member.entity.Member;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MemberMapper {
    private final BoardMapper boardMapper;

    public MemberMapper(BoardMapper boardMapper) {
        this.boardMapper = boardMapper;
    }

    public Member memberPostDtoToMember(MemberDto.Post postDto){
        if (postDto == null){
            return null;
        }
        else {
            Member member = new Member();
            member.setEmail(postDto.getEmail());
            member.setNickname(postDto.getNickname());
            member.setPassword(postDto.getPassword());
            return member;
        }
    }

    public Member memberPatchDtoToMember(MemberDto.Patch patchDto){
        if (patchDto == null){
            return null;
        } else {
            Member member = new Member();
            member.setMemberId(patchDto.getMemberId());
            member.setNickname(patchDto.getNickname());
            member.setEmail(patchDto.getEmail());
            return member;
        }
    }

    public MemberDto.Response memberToMemberResponseDto(Member member){
        if(member == null){
            return null;
        } else {
            long memberId = 0L;
            String email = null;
            String nickname = null;
            int boardCount = 0;
            List<Board> boards = new ArrayList<>();
            memberId = member.getMemberId();
            email = member.getEmail();
            nickname = member.getNickname();
            boardCount = member.getBoards().size();
            boards = member.getBoards();

            List<BoardResponseDto> boardResponseDtos = new ArrayList<>();
            for(Board i : boards){
                BoardResponseDto boardDto = boardMapper.boardToBoardResponseDto(i);
                boardResponseDtos.add(boardDto);
            }

            MemberDto.Response response = new MemberDto.Response(memberId,email,nickname, boardCount,boardResponseDtos);
            return response;
        }
    }
}
