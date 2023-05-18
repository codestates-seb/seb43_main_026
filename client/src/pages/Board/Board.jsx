//모듈
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

//공통 스타일
import { COLOR, SIZE } from '../../style/theme';

//컴포넌트
import Dash from '../../component/Board/Dash';
import List from '../../component/Board/List';
import Pagination from '../../component/Board/Pagination';

//아이콘
import { BsCalendar2Heart } from 'react-icons/bs';
import { RxDashboard } from 'react-icons/rx';
import { RiListUnordered } from 'react-icons/ri';
import { HiPlus } from 'react-icons/hi';
import { BiCheckbox, BiCheckboxChecked } from 'react-icons/bi';

//더미데이터
// import boardData from '../../component/Board/boardData';

//서버 url
// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = `a`;

//전체 컨테이너
const Container = styled.main`
  margin: 0 auto;
  margin-top: 30px;
  background-color: ${(props) => (!props.isDash ? COLOR.bg : COLOR.bg_blue)};
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
const TitleAndIcon = styled.section`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLOR.bg};
  padding: 0 12px 0 10px;
`;

const TitleIcon = styled.div`
  width: 27px;
`;

const Title = styled.div`
  display: flex;
`;

const Community = styled.span`
  font-size: 18px;
  font-weight: 600;
  line-height: 21px;
`;

const CalendarShow = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 3px;
  height: 35px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  background-color: ${(props) =>
    !props.calendarShare ? 'transparent' : COLOR.bg_light_blue};
  color: ${COLOR.main_dark_blue};
  > p {
    color: ${COLOR.main_dark_blue};
    padding: 0 5px 0 2px;
  }
`;

const CalIcon = styled(BsCalendar2Heart)`
  margin-right: 6px;
  color: ${COLOR.main_blue};
`;

const MoveCategory = styled.div`
  width: fit-content;
`;

//리스트 조회 방식 및 정렬
const SortBox = styled.section`
  width: 100%;
  height: 42px;
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
  padding: 0px 6px;
  button {
    display: flex;
  }
`;

const SortBtn = styled.button`
  border: none;
  padding: 0 5px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  background-color: transparent;
`;

const Sort = styled.div`
  display: flex;
  margin-right: 7px;
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
  height: 38px;
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
  margin-right: 7px;
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

const ListBox = styled.section`
  width: 100%;
  min-height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [isDash, setIsDash] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [orderBy, setOrderBy] = useState('latest');
  const [calendarShare, setCalendarShare] = useState(false);

  const navigate = useNavigate();

  const fetchPostsCalendar = async (value) => {
    try {
      const params = {
        page: currentPage,
        size: pageSize,
        orderBy: value,
        calendarShare,
      };

      const response = await axios.get(`${API_URL}/boards`, {
        params: params,
      });

      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPostsWithAll = async (value) => {
    try {
      const params = {
        page: currentPage,
        size: pageSize,
        orderBy: value,
      };

      const response = await axios.get(`${API_URL}/boards`, {
        params: params,
      });

      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    setPageSize(10);
  };

  const handleSortClick = (orderByValue) => {
    setOrderBy(orderByValue);
  };

  const handleUploadClick = () => {
    navigate('/board/add');
  };

  const handleViewCalendar = () => {
    setCalendarShare((prev) => !prev);
  };

  useEffect(() => {
    if (calendarShare) {
      console.log('----1----');
      fetchPostsCalendar(orderBy);
    } else if (!calendarShare) {
      console.log('----2----');
      fetchPostsWithAll(orderBy);
    }
  }, [calendarShare, orderBy]);

  return (
    <Container isDash={isDash}>
      <TitleAndIcon>
        <Title>
          <TitleIcon>
            <CalIcon size={20} />
          </TitleIcon>
          <Community>커뮤니티</Community>
        </Title>
        <MoveCategory>
          <CalendarShow
            onClick={handleViewCalendar}
            calendarShare={calendarShare}
          >
            {!calendarShare ? (
              <BiCheckbox size={25} />
            ) : (
              <BiCheckboxChecked size={25} />
            )}
            <p>캘린더 모아보기</p>
          </CalendarShow>
        </MoveCategory>
      </TitleAndIcon>
      <SortBox>
        <View>
          <SortBtn onClick={() => setIsDash(true)}>
            <ImgView size={19} isDash={isDash} />
          </SortBtn>
          <SortBtn onClick={() => setIsDash(false)}>
            <TxtView size={21} isDash={isDash} />
          </SortBtn>
        </View>
        <Sort>
          <SortBtn onClick={() => handleSortClick('latest')}>최신순</SortBtn>
          <SortBtn onClick={() => handleSortClick('likes')}>추천순</SortBtn>
          <SortBtn onClick={() => handleSortClick('comments')}> 댓글순</SortBtn>
        </Sort>
      </SortBox>
      {!isDash && (
        <Upload>
          <UploadBtn onClick={handleUploadClick}>등록하기</UploadBtn>
        </Upload>
      )}
      <ListBox>
        {isDash && <Dash posts={posts} />}
        {!isDash && <List posts={posts} />}
        {posts.length === 0 && <span>데이터가 없습니다</span>}
      </ListBox>
      {isDash ? (
        <UploadIconBtn onClick={handleUploadClick}>
          <PlusIcon size={32} color="#ffffff" />
        </UploadIconBtn>
      ) : (
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalPosts={posts.length}
          onPaginationClick={handlePaginationClick}
        />
      )}
    </Container>
  );
};

export default Board;
