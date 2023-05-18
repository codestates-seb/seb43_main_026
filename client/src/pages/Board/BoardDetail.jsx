//모듈
import styled from 'styled-components';

//공통 스타일
import { COLOR } from '../../style/theme';

//공통 컴포넌트
import BackButton from '../../component/common/BackButton';

//아이콘
import { FaRegHeart } from 'react-icons/fa';
import CommentForm from '../../component/Board/BoardDetail/CommentForm';

const Container = styled.main`
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  max-width: 1200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
  width: 100%;
  height: fit-content;
  width: 100%;
  height: fit-content;
`;

//뒤로가기 상단바
const GobackAndModify = styled.section`
  width: 100%;
  height: 40px;
  background-color: ${COLOR.main_gray};
  padding: 0px 15px 0px 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

const Goback = styled.button`
  margin-top: 5px;
`;

//제목과 작성자
const BoardInfo = styled.section`
  width: 100%;
  display: flex;
  height: 70px;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 15px;
  margin-top: 2px;
  border-bottom: 1px solid ${COLOR.main_blue};
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-top: 19px;
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BoardCommentInfo = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const Writer = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${COLOR.main_dark_blue};
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const BoardCreateAt = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR.font_comment};
`;

//이미지
const ImageAndLike = styled.section`
  width: 100%;
  height: fit-content;
  max-height: 500px;
  display: flex;
  flex-direction: column;
`;

const Image = styled.article`
  width: 100%;
  min-height: 300px;
  max-height: 500px;
  overflow: hidden;
  padding: 0px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${COLOR.main_blue};
  > img {
    max-width: 80%;
    max-height: 500px;
    width: auto;
    height: auto;
    object-fit: contain;
    padding: 20px 0;
  }
`;

const Like = styled.div`
  position: sticky;
  width: 100%;
`;

const LikeButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  position: absolute;
  top: -40px;
  right: 15px;
`;

const LikeIcon = styled(FaRegHeart)`
  color: ${COLOR.main_blue};
`;

//운동기록 공유
const Record = styled.section`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  font-weight: 600;
  border-bottom: 1px solid ${COLOR.main_blue};
  section {
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Current = styled.section`
  height: 100%;
  border-right: 1px solid ${COLOR.main_blue};
  background-color: ${COLOR.main_gray};
  span {
    color: ${COLOR.main_dark_blue};
  }
`;

const Year = styled.span`
  margin-bottom: 4px;
  font-size: 14px;
`;
const Month = styled.span`
  font-size: 17px;
`;

const Attendance = styled.section`
  height: 100%;
`;
const TotalTime = styled.section`
  height: 100%;
  border-left: 1px solid ${COLOR.main_blue};
  background-color: ${COLOR.bg_comment};
`;

const Name = styled.span`
  margin-bottom: 4px;
  font-size: 14px;
`;
const Rate = styled.span`
  font-size: 17px;
`;

// 내용
const Content = styled.section`
  width: 100%;
  min-height: 200px;
  max-height: auto;
  max-height: fit-content;
  padding: 15px 15px;
  white-space: pre-line;
  border-bottom: 1px solid ${COLOR.main_blue};
`;

//댓글
const CommentContainer = styled.section`
  width: 100%;
  height: fit-content;
`;

const CommentHeader = styled.div`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  background-color: ${COLOR.bg_light_blue};
`;

const CommentCount = styled.span`
  margin-left: 2px;
`;

const CommentList = styled.ul`
  width: 100%;
  height: fit-content;
`;

const Comment = styled.li`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${COLOR.bg_comment};
`;

const CommentInfo = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  padding: 3px 10px 0px;
  display: flex;
  align-items: center;
`;

const CommentWriter = styled.span`
  font-size: 14px;
  font-weight: 600;
  margin-right: 4px;
  color: ${COLOR.main_dark_blue};
`;
const CreateAt = styled.span`
  font-size: 13px;
  color: ${COLOR.font_comment};
`;

const Text = styled.div`
  width: 100%;
  min-height: 35px;
  max-height: auto;
  padding: 0px 10px 5px 10px;
  line-height: 1.3;
  white-space: pre-line;
  font-size: 14px;
`;

const BoardDetail = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear(); // 현재 년도
  const currentMonth = currentDate.getMonth() + 1; // 현재 월 (0부터 시작하므로 +1 필요)

  return (
    <Container>
      <GobackAndModify>
        <Goback>
          <BackButton />
        </Goback>
      </GobackAndModify>
      <BoardInfo>
        <Title>제목</Title>
        <BoardCommentInfo>
          <Writer>작성자</Writer>
          <BoardCreateAt>2023.05.16</BoardCreateAt>
        </BoardCommentInfo>
      </BoardInfo>
      <ImageAndLike>
        <Image>
          <img src="https://picsum.photos/id/1/500/500" alt="사진" />
        </Image>
        <Like>
          <LikeButton>
            <LikeIcon size={25} />
          </LikeButton>
        </Like>
      </ImageAndLike>
      <Record>
        <Current>
          <Year>{`${currentYear}년`}</Year>
          <Month>{`${currentMonth}월`}</Month>
        </Current>
        <Attendance>
          <Name>출석률</Name>
          <Rate>80%</Rate>
        </Attendance>
        <TotalTime>
          <Name>총 운동 시간</Name>
          <Rate>40 시간</Rate>
        </TotalTime>
      </Record>
      <Content>내용</Content>
      <CommentContainer>
        <CommentHeader>
          댓글<CommentCount>{`(2)`}</CommentCount>
        </CommentHeader>
        <CommentForm />
        <CommentList>
          <Comment>
            <CommentInfo>
              <CommentWriter>작성자</CommentWriter>
              <CreateAt>2023.05.16</CreateAt>
            </CommentInfo>
            <Text>댓글 내용</Text>
          </Comment>
        </CommentList>
      </CommentContainer>
    </Container>
  );
};

export default BoardDetail;
