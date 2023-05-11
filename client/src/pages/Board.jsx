//모듈
import styled from 'styled-components';
import { useState } from 'react';

//공통 스타일
import { COLOR, SIZE } from '../style/theme';

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
    props.isDash === false ? COLOR.bg : COLOR.bg_blue};
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

  button {
    cursor: pointer;
  }
  .del {
    display: none;
  }
  @media screen and (min-width: ${SIZE.mobileMax}) {
    margin-top: 15px;
  }
`;

//상단 캘린더 타이틀
const Title = styled.article`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: ${COLOR.bg};
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
  color: ${COLOR.main_blue};
`;

//리스트 조회 방식 및 정렬
const SortBox = styled.article`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  background-color: ${COLOR.main_gray};
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
  padding: 0 3.5px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  background-color: transparent;
`;

const Sort = styled.div`
  display: flex;
`;

const TxtView = styled(RiListUnordered)`
  color: ${(props) => (props.isDash ? `#7F97BA` : COLOR.dark_blue)};
`;

const ImgView = styled(RxDashboard)`
  color: ${(props) => (props.isDash ? COLOR.main_dark_blue : `#7F97BA`)};
`;

//보드 작성페이지 이동
const Upload = styled.article`
  width: 100%;
  height: 35px;
  background-color: ${COLOR.bg_blue};
  display: flex;
  flex-direction: row-reverse;
  padding: 0 5px;
`;

const UploadBtn = styled.button`
  border: none;
  background-color: transparent;
  font-size: 15px;
  font-weight: 600;
  color: ${COLOR.main_dark_blue};
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
  box-shadow: 1px 1px 10px 0px ${COLOR.bg_dark};
  background-color: ${COLOR.main_blue};
  cursor: pointer;
  @media screen and (min-width: ${SIZE.mobileMax}) {
    position: sticky;
    margin-bottom: 30px;
    margin-top: 30px;
  }
`;

const PlusIcon = styled(HiPlus)`
  color: ${COLOR.bg};
`;

const ListBox = styled.article`
  width: 100%;
`;

const Board = () => {
  const [posts, setPosts] = useState(boardData);
  const [isDash, setIsDash] = useState(true);

  // 첫 번째 게시글의 제목을 "New Title"로 업데이트
  //setPost안쓰면 eslint오류나서 그냥 쓰는 코드
  const updatePost = () => {
    const newPosts = [...posts];
    newPosts[0].title = 'New Title';
    setPosts(newPosts);
  };

  const handleViewChange = (value) => {
    setIsDash(value);
  };

  return (
    <Container isDash={isDash}>
      <Title>
        <TxtCal>
          <CalIcon size={20} />
          <span>내 캘린더</span>
        </TxtCal>
      </Title>
      <SortBox>
        <View>
          <SortBtn onClick={() => handleViewChange(true)}>
            <ImgView size={19} isDash={isDash} />
          </SortBtn>
          <SortBtn onClick={() => handleViewChange(false)}>
            <TxtView size={21} isDash={isDash} />
          </SortBtn>
        </View>
        <Sort>
          <SortBtn>최신순</SortBtn>
          <SortBtn>추천순</SortBtn>
          <SortBtn>댓글순</SortBtn>
        </Sort>
      </SortBox>
      {!isDash && (
        <Upload>
          <UploadBtn>등록하기</UploadBtn>
        </Upload>
      )}
      <ListBox>
        {isDash && <Dash posts={posts} />}
        {!isDash && <List posts={posts} />}
      </ListBox>
      {isDash && (
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
