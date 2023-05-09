//모듈
import styled from 'styled-components';

//아이콘
import { BsCalendar2Heart } from 'react-icons/bs';
import { RxDashboard } from 'react-icons/rx';
import { RiListUnordered } from 'react-icons/ri';

//전체 컨테이너
const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${(props) => props.theme.breakpoints.mobileMax} {
    width: 100%;
    height: fit-content;
  }
`;

//상단 캘린더 타이틀
const Title = styled.article`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.color.bg};

  @media ${(props) => props.theme.breakpoints.mobileMax} {
    padding: 0 10px;
  }
`;

const TxtCal = styled.div`
  display: flex;
  span {
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
  }
`;

const CalIcon = styled(BsCalendar2Heart)`
  margin-right: 5px;
  color: ${(props) => props.theme.color.main_blue};
`;

//리스트 조회 방식 및 정렬
const SortBox = styled.article`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.color.main_gray};
  @media ${(props) => props.theme.breakpoints.mobileMax} {
  }
`;
const View = styled.div``;
const TXTView = styled(RiListUnordered)``;
const ImgView = styled(RxDashboard)``;
const Sort = styled.div``;

//보드 작성페이지 이동
const UploadBox = styled.article`
  width: 100%;
  height: 30px;
  background-color: ${(props) => props.theme.color.bg_blue};
  display: flex;
  flex-direction: row-reverse;
  @media ${(props) => props.theme.breakpoints.mobileMax} {
  }
`;

const ListBox = styled.article`
  @media ${(props) => props.theme.breakpoints.mobileMax} {
  }
`;

const Board = () => {
  return (
    <Container>
      <Title>
        <TxtCal>
          <CalIcon size={20} />
          <span>내 캘린더</span>
        </TxtCal>
      </Title>
      <SortBox>
        <View>
          <button>
            <TXTView size={20} />
          </button>
          <button>
            <ImgView size={20} />
          </button>
        </View>
        <Sort>
          <button>최신순</button>
          <button>추천순</button>
          <button>댓글순</button>
        </Sort>
      </SortBox>
      <UploadBox>
        <button>등록하기</button>
      </UploadBox>
      <ListBox></ListBox>
    </Container>
  );
};

export default Board;
