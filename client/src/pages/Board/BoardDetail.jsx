import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COLOR, SIZE } from '../../style/theme';
import { IoArrowBack } from 'react-icons/io5';
import CommentForm from '../../component/Board/BoardDetail/CommentForm';
import Comment from '../../component/Board/BoardDetail/Comment';
import Record from '../../component/Board/BoardAdd/Record';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL;

const Container = styled.main`
  margin: 0 auto;
  display: flex;
  max-width: 1200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
  width: 100%;
  height: fit-content;
`;

const GobackAndModify = styled.section`
  width: 100%;
  height: 45px;
  background-color: ${COLOR.main_gray};
  padding: 0px 15px 0px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  @media screen and (min-width: ${SIZE.mobileMax}) {
    height: 50px;
  }
`;

const Goback = styled.button`
  margin-top: 5px;
`;

const ModifyAndDelete = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    font-size: 16px;
    font-weight: 600;
    color: ${COLOR.main_dark_blue};
    &:hover {
      color: ${COLOR.main_dark_blue_hover};
    }
    &:active {
      color: ${COLOR.main_dark_blue_active};
    }

    @media screen and (min-width: ${SIZE.mobileMax}) {
      font-size: 18px;
    }
  }
`;

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

const Content = styled.section`
  width: 100%;
  min-height: 200px;
  max-height: auto;
  max-height: fit-content;
  padding: 15px 15px;
  white-space: pre-line;
  border-bottom: 1px solid ${COLOR.main_blue};
`;

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

const BoardDetail = () => {
  const localMemberId = parseInt(localStorage.getItem('memberId'));
  const { boardId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({});
  const [isSamePerson, setIsSamePerson] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [totalWorkoutTime, setTotalWorkoutTime] = useState(0);
  const [todayWorkoutTime, setTodayWorkoutTime] = useState(0);
  const [workoutLocation, setWorkoutLocation] = useState('');
  const [attendance, setAttendance] = useState(0);

  //eslint 오류
  console.log(totalWorkoutTime, todayWorkoutTime, workoutLocation, attendance);

  const createDate = post.createdAt ? post.createdAt.slice(0, 10) : '';

  const handleButtonLike = () => {
    const params = {
      'member-id': post.memberId,
    };
    axios
      .post(`${API_URL}/boards/${boardId}/likes`, null, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
        params: params,
      })
      .then(() => {
        setLiked((prevLiked) => !prevLiked);
      })
      .catch((error) => {
        console.error(error);
      });
    navigate(`/board/${boardId}`);
  };

  const handleButtonModify = () => {
    navigate(`/board/${boardId}/edit`);
  };

  const handleButtonDelete = () => {
    axios
      .delete(`${API_URL}/boards/${boardId}`, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        setPost(response.data);
        navigate(`/board`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleBackButton = () => {
    navigate(`/board`);
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/boards/${boardId}`, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        setPost(response.data);
        setIsSamePerson(response.data.memberId === localMemberId);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //좋아요
  useEffect(() => {
    axios
      .get(`${API_URL}/boards/${boardId}/isliked`, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        setLiked(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //댓글
  useEffect(() => {
    axios
      .get(`${API_URL}/boards/${boardId}/comments`, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        setComment(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container>
      <GobackAndModify>
        <Goback>
          <IoArrowBack
            size={27}
            color={COLOR.main_blue}
            onClick={handleBackButton}
          />
        </Goback>
        {isSamePerson && (
          <ModifyAndDelete>
            <button onClick={handleButtonModify}>수정</button>
            <button onClick={handleButtonDelete}>삭제</button>
          </ModifyAndDelete>
        )}
      </GobackAndModify>
      <BoardInfo>
        <Title>{post.title}</Title>
        <BoardCommentInfo>
          <Writer>{post.writer}</Writer>
          <BoardCreateAt>{createDate}</BoardCreateAt>
        </BoardCommentInfo>
      </BoardInfo>
      <ImageAndLike>
        <Image>
          <img src={post.boardImageAddress} alt="사진" />
        </Image>
        <Like>
          <LikeButton onClick={handleButtonLike}>
            {liked ? (
              <FaHeart size={25} color={COLOR.main_blue} />
            ) : (
              <FaRegHeart size={25} color={COLOR.main_blue} />
            )}
          </LikeButton>
        </Like>
      </ImageAndLike>
      {post.workoutRecordShare && (
        <Record
          post={post}
          setTotalWorkoutTime={setTotalWorkoutTime}
          setTodayWorkoutTime={setTodayWorkoutTime}
          setWorkoutLocation={setWorkoutLocation}
          setAttendance={setAttendance}
        />
      )}
      <Content>{post.content}</Content>
      <CommentContainer>
        <CommentHeader>
          댓글<CommentCount>{commentCount}</CommentCount>
        </CommentHeader>
        <CommentForm
          boardId={boardId}
          setComment={setComment}
          setCommentCount={setCommentCount}
        />
        <CommentList>
          <Comment
            boardId={boardId}
            comment={comment}
            setComment={setComment}
            setCommentCount={setCommentCount}
            localMemberId={localMemberId}
          />
        </CommentList>
      </CommentContainer>
    </Container>
  );
};

export default BoardDetail;
