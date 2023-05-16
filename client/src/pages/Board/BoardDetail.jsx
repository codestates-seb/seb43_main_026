//모듈
import styled from 'styled-components';

//공통 스타일
import { COLOR } from '../../style/theme';

//공통 컴포넌트
import BackButton from '../../component/common/BackButton';

//아이콘
import { FaRegHeart } from 'react-icons/fa';

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

//상단바
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
const TitleAndWriter = styled.section`
  width: 100%;
  display: flex;
  height: 70px;
  flex-direction: column;
  justify-content: center;
  padding: 0 15px;
  border-bottom: 1px solid ${COLOR.main_blue};
`;
const Writer = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${COLOR.main_dark_blue};
  margin-top: 5px;
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-top: 3px;
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  padding: 20px 20px;
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
  height: 200px;
  max-height: fit-content;
  padding: 15px 15px;
  border-bottom: 1px solid ${COLOR.main_blue};
`;

//댓글
const CommentBox = styled.section`
  width: 100%;
  height: fit-content;
`;

const CommentHeader = styled.div`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  background-color: ${COLOR.bg_comment};
`;
const CommentCount = styled.span``;

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
      <TitleAndWriter>
        <Title>제목</Title>
        <Writer>작성자</Writer>
      </TitleAndWriter>
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
      <CommentBox>
        <CommentHeader>
          댓글<CommentCount>{}</CommentCount>
        </CommentHeader>
      </CommentBox>
    </Container>
  );
};

export default BoardDetail;
