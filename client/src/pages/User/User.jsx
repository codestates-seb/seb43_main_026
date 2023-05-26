import styled from 'styled-components';
import Pagination from 'react-js-pagination';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ProfileImage from '../../assets/image/headalee.png';
import { COLOR } from '../../style/theme';
import { FaHeart } from 'react-icons/fa';
import { BiComment } from 'react-icons/bi';

import Button from '../../component/common/Button';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${COLOR.bg_light_blue};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserProfile = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 90%;
  height: 20%;
  background-color: white;
  border-radius: 15px;
  display: flex;
  align-items: center;
`;

const UserImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 1px solid ${COLOR.main_blue};
  margin: 0 1.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1rem 0;
`;

const Nickname = styled.span`
  font-size: 1.1rem;
  display: flex;
  align-items: center;
`;

const AttendanceRate = styled.span`
  margin: 0.5rem 0;
  font-size: 0.8rem;
`;

const ExerciseTime = styled.span`
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
`;

const UserCalendarList = styled.ul`
  width: 100%;
  height: 200vh;
  background-color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    li:first-child,
    li:last-child {
      display: none;
    }

    li {
      font-weight: 500;
      font-size: 16px;
      border: none;
      border-radius: 5px;
      background-color: transparent;
      color: ${COLOR.main_dark_blue};
      margin: 0 2px;
      padding: 5px;
    }
    li.active {
      background-color: ${COLOR.main_blue};
      color: ${COLOR.bg};
    }
  }
`;

const MainTitle = styled.h1`
  width: 100%;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${COLOR.main_blue};
`;

const Lists = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const NoList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 2rem;
`;

const Item = styled.li`
  margin-top: 13px;
  padding: 0 1.5%;
  display: flex;
  flex-direction: column;
`;
const Image = styled.div`
  width: 180px;
  height: 288px;
  overflow: hidden;
  border-radius: 5px;
  background-color: ${COLOR.bg};
  @media screen and (max-width: 385px) {
    width: 320px;
    height: 200px;
  }
  img {
    width: 180px;
    height: 288px;
    object-fit: cover;
    @media screen and (max-width: 385px) {
      width: 320px;
      height: 200px;
    }
  }
  img:hover {
    opacity: 0.8;
  }
`;
const Info = styled.div`
  margin: 5px 0px;
  width: 177px;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 385px) {
    width: 320px;
  }
`;

const Title = styled.h2`
  font-size: 13px;
  font-weight: 600;
  line-height: 20px;
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Reaction = styled.div`
  display: flex;
  span {
    font-size: 13px;
    color: ${COLOR.font_comment};
  }
  div {
    margin-right: 4px;
  }
`;

const Like = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    line-height: 20px;
  }
`;

const HeartIcon = styled(FaHeart)`
  margin-right: 2px;
  color: ${COLOR.main_dark_blue};
`;

const Comment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    line-height: 20px;
  }
`;

const CommentIcon = styled(BiComment)`
  margin-right: 2px;
  transform: scaleX(-1);
  color: ${COLOR.main_dark_blue};
`;

const User = ({ loginUser }) => {
  const navigate = useNavigate();

  const [boards, setBoards] = useState([]);
  const [currentBoards, setCurrentBoards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const postPerPage = 6;

  useEffect(() => {
    if (!loginUser) {
      navigate('/login');
    } else {
      setBoards([...loginUser.boards]);
    }
  }, [loginUser, navigate]);

  useEffect(() => {
    const indexOfLast = currentPage * postPerPage; // 현재 페이지의 마지막 아이템 인덱스
    const indexOfFirst = indexOfLast - postPerPage; // 현재 페이지의 첫번째 아이템 인덱스
    setCurrentBoards(boards.slice(indexOfFirst, indexOfLast));
  }, [boards, currentPage, postPerPage]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    loginUser && (
      <Container>
        <UserProfile>
          <UserImage src={ProfileImage} alt="프로필 사진" />
          <UserInfo>
            <Nickname>{loginUser.nickname}</Nickname>
            <AttendanceRate>이번달 출석률 80%</AttendanceRate>
            <ExerciseTime>이번달 운동시간 100시간</ExerciseTime>
            <Button
              text={'프로필 설정'}
              width={'6rem'}
              height={'25px'}
              style={{ paddingLeft: '10px' }}
              handleClick={() => {
                navigate('/edit/profile');
              }}
            />
          </UserInfo>
        </UserProfile>
        <UserCalendarList>
          <MainTitle>🗓️ 내가 작성한 게시글</MainTitle>
          <Lists>
            {boards.length === 0 ? (
              <NoList>작성한 게시글이 없습니다.</NoList>
            ) : (
              currentBoards.map((board) => (
                <Item key={board.boardId}>
                  <Link to={`/board/${board.boardId}`}>
                    <Image>
                      <img src={board.boardImageAddress} alt="캘린더 이미지" />
                    </Image>
                    <Info>
                      <Title>{board.title}</Title>
                      <Reaction>
                        <Like>
                          <HeartIcon size={15} />
                          <span>{board.boardLikeCount}</span>
                        </Like>
                        <Comment>
                          <CommentIcon size={15} />
                          <span>{board.commentCount}</span>
                        </Comment>
                      </Reaction>
                    </Info>
                  </Link>
                </Item>
              ))
            )}
          </Lists>
          {boards.length !== 0 ? (
            <Pagination
              totalItemsCount={boards.length}
              activePage={currentPage}
              itemsCountPerPage={postPerPage}
              pageRangeDisplayed={5}
              prevPageText="<"
              nextPageText=">"
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
              innerClass="pagination"
            />
          ) : null}
        </UserCalendarList>
      </Container>
    )
  );
};

export default User;
