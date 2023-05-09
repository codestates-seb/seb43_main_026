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
  button {
    cursor: pointer;
  }
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
  padding: 0 10px;
`;

const TxtCal = styled.div`
  display: flex;
  span {
    font-size: 15px;
    font-weight: 600;
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
  padding: 0 5px;
  background-color: ${(props) => props.theme.color.main_gray};
  @media ${(props) => props.theme.breakpoints.mobileMax} {
  }
`;

const View = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 5px;
  button {
    display: flex;
  }
`;

const SortBtn = styled.button`
  border: none;
  padding: 0 3px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
`;

const Sort = styled.div`
  display: flex;
`;

const TXTView = styled(RiListUnordered)`
  color: ${(props) => props.theme.color.main_dark_blue};
`;
const ImgView = styled(RxDashboard)`
  color: ${(props) => props.theme.color.main_dark_blue};
`;

//보드 작성페이지 이동
const UploadBox = styled.article`
  width: 100%;
  height: 30px;
  background-color: ${(props) => props.theme.color.bg_blue};
  display: flex;
  flex-direction: row-reverse;
  padding: 0 5px;
  @media ${(props) => props.theme.breakpoints.mobileMax} {
  }
`;

//텍스트 버튼 이후 공통 컴포넌트로 작성
const UploadBtn = styled.button`
  border: none;
  background-color: transparent;
  font-size: 15px;
  font-weight: 600;
  color: ${(props) => props.theme.color.main_dark_blue};
`;

const ListBox = styled.ul`
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
          <SortBtn>
            <TXTView size={19} />
          </SortBtn>
          <SortBtn>
            <ImgView size={18} />
          </SortBtn>
        </View>
        <Sort>
          <SortBtn>최신순</SortBtn>
          <SortBtn>추천순</SortBtn>
          <SortBtn>댓글순</SortBtn>
        </Sort>
      </SortBox>
      <UploadBox>
        <UploadBtn>등록하기</UploadBtn>
      </UploadBox>
      <ListBox></ListBox>
    </Container>
  );
};

export default Board;
