//모듈
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';

//공통 스타일
import { COLOR, SIZE } from '../../style/theme';

//컴포넌트
import Dash from '../../component/Board/Dash';
import List from '../../component/Board/List';
import Pagination from '../../component/Board/Pagination';
import Modal from '../../component/Board/Modal';

//아이콘
import { BsCalendar2Heart } from 'react-icons/bs';
import { RxDashboard } from 'react-icons/rx';
import { RiListUnordered } from 'react-icons/ri';
import { HiPlus } from 'react-icons/hi';
import { BiCheckbox, BiCheckboxChecked } from 'react-icons/bi';

//서버 url
const API_URL = process.env.REACT_APP_API_URL;

//전체 컨테이너
const Container = styled.main`
  margin: 0 auto;
  background-color: ${(props) => (!props.isDash ? COLOR.bg : COLOR.bg_blue)};
  display: flex;
  max-width: 1200px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0px;
  width: 100%;
  max-height: fit-content;
  min-height: 100vh;

  button {
    cursor: pointer;
  }
  .del {
    display: none;
  }
  @media screen and (min-width: ${SIZE.mobileMax}) {
    margin-top: 20px;
  }
`;

//상단 캘린더 타이틀
const TitleAndIcon = styled.section`
  width: 100%;
  height: 60px;
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
  @media screen and (min-width: ${SIZE.mobileMax}) {
    font-size: 20px;
  }
`;

const CalendarShow = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 3px;
  height: 35px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  background-color: ${(props) =>
    !props.calendarShow ? 'transparent' : COLOR.bg_light_blue};
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
  height: 50px;
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
  font-size: 16px;
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
  min-height: 580px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoData = styled.span`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [isDash, setIsDash] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [orderBy, setOrderBy] = useState('latest');
  const [calendarShow, setCalendarShow] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isAfter25th, setIsAfter25th] = useState(false);
  const [isShareCalendar, setIsShareCalendar] = useState(false);
  const [isCalendarPost, setIsCalendarPost] = useState(null);
  const [canPost, setCanPost] = useState(null);

  const navigate = useNavigate();

  const modalRef = useRef(null);
  const previousPage = useRef(1);

  const fetchPostsCalendar = async (value, page = 1) => {
    try {
      const params = {
        page: page,
        size: 10,
        orderBy: value,
        calendarShow,
      };

      const response = await axios.get(
        `${API_URL}/boards/`,
        {
          params: params,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem('accessToken')}`,
          },
        }
      );
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPostsWithAll = async (value, page = 1) => {
    try {
      const params = {
        page: page,
        size: 10,
        orderBy: value,
      };

      const response = await axios.get(
        `${API_URL}/boards/`,
        {
          params: params,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem('accessToken')}`,
          },
        }
      );
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaginationClick = (pageNumber) => {
    if (pageNumber === previousPage.current) {
      return;
    }

    setCurrentPage(pageNumber);

    if (calendarShow) {
      fetchPostsCalendar(orderBy, pageNumber);
    } else {
      fetchPostsWithAll(orderBy, pageNumber);
    }
  };

  const handleSortClick = (orderByValue) => {
    setCurrentPage(1);
    setOrderBy(orderByValue);
  };

  const handleUploadClick = () => {
    if (isAfter25th) {
      setIsModal(true);
    } else {
      navigate('/board/add', { state: { isShareCalendar: false } });
    }
  };

  const handleViewCalendar = () => {
    setCalendarShow((prev) => !prev);
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModal(false);
    }
  };

  //캘린더 모아보기 필터
  useEffect(() => {
    if (calendarShow) {
      fetchPostsCalendar(orderBy, currentPage);
    } else {
      fetchPostsWithAll(orderBy, currentPage);
    }
  }, [calendarShow, orderBy, currentPage]);

  //캘린더 자랑 이력 조회
  useEffect(() => {
    axios
      .get(`${API_URL}/boards/canPost/${localStorage.getItem('memberId')}`, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        setIsCalendarPost(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //캘린더 자랑 가능 조회
  useEffect(() => {
    if (isCalendarPost) {
      setCanPost(false);
    } else {
      setCanPost(true);
    }
  }, [isCalendarPost]);

  //총 게시글 수 조회
  useEffect(() => {
    axios
      .get(`${API_URL}/boards/count`, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        setTotalPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //날짜 25일 이후인지 감지
  useEffect(() => {
    const checkDateChange = () => {
      const currentDate = new Date();
      const currentDay = currentDate.getDate();

      // 25일부터 말일까지 true
      if (currentDay >= 25) {
        setIsAfter25th(true);
      } else {
        setIsAfter25th(false);
      }
    };

    // 다음 날 자정 계산
    const nextMidnight = new Date();
    nextMidnight.setDate(nextMidnight.getDate() + 1);
    nextMidnight.setHours(0, 0, 0, 0);
    const timeToNextMidnight = nextMidnight.getTime() - Date.now();

    const timeout = setTimeout(() => {
      checkDateChange();

      // 매일 자정에 체크되도록 timeout 재설정
      const followingMidnight = new Date();
      followingMidnight.setDate(followingMidnight.getDate() + 2);
      followingMidnight.setHours(0, 0, 0, 0);
      const timeToFollowingMidnight = followingMidnight.getTime() - Date.now();
      setTimeout(checkDateChange, timeToFollowingMidnight);
    }, timeToNextMidnight);

    // 컴포넌트가 언마운트될 때 timeout 클리어
    return () => clearTimeout(timeout);
  }, []);

  //모달 밖 클릭 시 닫힘
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    previousPage.current = currentPage;
  }, [currentPage]);

  //리스트 뷰 변경시 페이지 초기화
  useEffect(() => {
    setCurrentPage(1);
    previousPage.current = 1;
  }, [isDash]);

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
            calendarShow={calendarShow}
          >
            {!calendarShow ? (
              <BiCheckbox size={26} />
            ) : (
              <BiCheckboxChecked size={26} />
            )}
            <p>캘린더 모아보기</p>
          </CalendarShow>
        </MoveCategory>
      </TitleAndIcon>
      <SortBox>
        <View>
          <SortBtn onClick={() => setIsDash(true)}>
            <ImgView size={24} isDash={isDash} />
          </SortBtn>
          <SortBtn onClick={() => setIsDash(false)}>
            <TxtView size={26} isDash={isDash} />
          </SortBtn>
        </View>
        <Sort>
          <SortBtn onClick={() => handleSortClick('latest')}>최신순</SortBtn>
          <SortBtn onClick={() => handleSortClick('boardLike')}>추천순</SortBtn>
          <SortBtn onClick={() => handleSortClick('comments')}> 댓글순</SortBtn>
        </Sort>
      </SortBox>
      {!isDash && (
        <Upload>
          <UploadBtn onClick={handleUploadClick}>등록하기</UploadBtn>
        </Upload>
      )}
      {isModal && isAfter25th && canPost && (
        <Modal
          ref={modalRef}
          setIsModal={setIsModal}
          setIsShareCalendar={setIsShareCalendar}
          isShareCalendar={isShareCalendar}
        />
      )}
      <ListBox>
        {isDash ? (
          <Dash
            posts={posts}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            orderBy={orderBy}
            isDash={isDash}
          />
        ) : posts.length === 0 ? (
          <NoData>데이터가 없습니다</NoData>
        ) : (
          <List posts={posts} />
        )}
      </ListBox>
      {isDash && (
        <UploadIconBtn onClick={handleUploadClick}>
          <PlusIcon size={32} color="#ffffff" />
        </UploadIconBtn>
      )}
      {isDash || (
        <Pagination
          currentPage={currentPage}
          totalPosts={totalPosts}
          onPaginationClick={handlePaginationClick}
        />
      )}
    </Container>
  );
};

export default Board;
