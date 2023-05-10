//모듈
import styled from 'styled-components';
import { useState } from 'react';

//컴포넌트
import Dash from '../component/Board/Dash';
import List from '../component/Board/List';

//아이콘
import { BsCalendar2Heart } from 'react-icons/bs';
import { RxDashboard } from 'react-icons/rx';
import { RiListUnordered } from 'react-icons/ri';
import { HiPlus } from 'react-icons/hi';

//더미데이터
import boardData from '../component/Board/boardData';

//전체 컨테이너
const Container = styled.section`
  margin: 0 auto;
  margin-top: 30px;
  background-color: ${(props) =>
    props.view === 'list' ? '#ffffff' : props.theme.color.bg_blue};
  display: flex;
  max-width: 1090px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    cursor: pointer;
  }
  .del {
    display: none;
  }
  @media ${(props) => props.theme.breakpoints.tabletMin} {
    margin-top: 15px;
    width: 100%;
    height: fit-content;
  }
  @media ${(props) => props.theme.breakpoints.mobileMax} {
    margin-top: 0px;
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
  background-color: transparent;
`;

const Sort = styled.div`
  display: flex;
`;

const TXTView = styled(RiListUnordered)`
  color: ${(props) =>
    props.view === 'list' ? props.theme.color.main_dark_blue : `#7F97BA`};
`;

const ImgView = styled(RxDashboard)`
  color: ${(props) =>
    props.view === 'dash' ? props.theme.color.main_dark_blue : `#7F97BA`};
`;

//보드 작성페이지 이동
const UploadBox = styled.article`
  width: 100%;
  height: 30px;
  background-color: ${(props) => props.theme.color.bg_blue};
  display: flex;
  flex-direction: row-reverse;
  padding: 0 5px;
`;

const UploadBtn = styled.button`
  border: none;
  background-color: transparent;
  font-size: 15px;
  font-weight: 600;
  color: ${(props) => props.theme.color.main_dark_blue};
`;

const UploadIconBtn = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 35px;
  right: 35px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  box-shadow: 1px 1px 10px 0px ${(props) => props.theme.color.bg_dark};
  background-color: ${(props) => props.theme.color.main_blue};
  cursor: pointer;
  @media ${(props) => props.theme.breakpoints.tabletMin} {
    position: sticky;
    margin-right: -955px;
    margin-bottom: 30px;
  }
`;

const PlusIcon = styled(HiPlus)``;

const ListBox = styled.article`
  width: 100%;
`;

const Board = () => {
  const [posts, setPosts] = useState(boardData);
  const [view, setView] = useState('list');

  // 첫 번째 게시글의 제목을 "New Title"로 업데이트
  //setPost안쓰면 eslint오류나서 그냥 쓰는 코드
  const updatePost = () => {
    const newPosts = [...posts];
    newPosts[0].title = 'New Title';
    setPosts(newPosts);
  };

  const handleViewChange = (viewType) => {
    setView(viewType);
  };

  return (
    <Container view={view}>
      <Title>
        <TxtCal>
          <CalIcon size={20} />
          <span>내 캘린더</span>
        </TxtCal>
      </Title>
      <SortBox>
        <View>
          <SortBtn onClick={() => handleViewChange('dash')}>
            <ImgView size={18} view={view} />
          </SortBtn>
          <SortBtn onClick={() => handleViewChange('list')}>
            <TXTView size={20} view={view} />
          </SortBtn>
        </View>
        <Sort>
          <SortBtn>최신순</SortBtn>
          <SortBtn>추천순</SortBtn>
          <SortBtn>댓글순</SortBtn>
        </Sort>
      </SortBox>
      {view === 'list' && (
        <UploadBox>
          <UploadBtn>등록하기</UploadBtn>
        </UploadBox>
      )}
      <ListBox>
        {view === 'dash' && <Dash posts={posts} />}
        {view === 'list' && <List posts={posts} />}
      </ListBox>
      {view === 'dash' && (
        <UploadIconBtn>
          <PlusIcon size={32} color="#ffffff" />
        </UploadIconBtn>
      )}
      {/* 여기도 지워야함 */}
      <button className="del" onClick={updatePost}>
        Update Post
      </button>
    </Container>
  );
};

export default Board;
