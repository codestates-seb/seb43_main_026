//모듈
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

//공통 스타일
import { COLOR, SIZE } from '../../style/theme';

//공통 컴포넌트
import BackButton from '../../component/common/BackButton';

//컴포넌트
import CommentForm from '../../component/Board/BoardDetail/CommentForm';
import Comment from '../../component/Board/BoardDetail/Comment';
import Record from '../../component/Board/BoardAdd/Record';

//아이콘
import { FaRegHeart, FaHeart } from 'react-icons/fa';

//서버 url
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

//뒤로가기 상단바
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

const Modify = styled.button``;
const Delete = styled.button``;

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

const BoardDetail = () => {
  const [posts, setPosts] = useState([]);
  const [liked, setLiked] = useState();
  const [comment, setComment] = useState([]);
  const [commentCount, setCommentCount] = useState([]);

  const localMemberId = localStorage.getItem('memberId');

  const { boardId } = useParams();

  const navigate = useNavigate();

  const createDate = posts.length > 0 ? posts[0].createdAt.slice(0, 10) : '';

  const handleButtonClick = () => {
    const params = {
      'member-id': posts.memberId,
    };
    axios
      .post(`${API_URL}/boards/${boardId}/likes`, null, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
        params: params,
      })
      .then((response) => {
        console.log(response.data);
        navigate(`/board/${boardId}`);
      })
      .catch((error) => {
        console.error(error);
      });
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
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/boards/${boardId}`, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
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
        console.log(response.data);
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
        console.log(response.data);
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
          <BackButton />
        </Goback>
        {posts.memberId === localMemberId && (
          <ModifyAndDelete>
            <Modify onClick={handleButtonModify}>수정</Modify>
            <Delete onClick={handleButtonDelete}>삭제</Delete>
          </ModifyAndDelete>
        )}
      </GobackAndModify>
      <BoardInfo>
        <Title>{posts.title}</Title>
        <BoardCommentInfo>
          <Writer>{posts.writer}</Writer>
          <BoardCreateAt>{createDate}</BoardCreateAt>
        </BoardCommentInfo>
      </BoardInfo>
      <ImageAndLike>
        <Image>
          <img src={posts.boardImageAddress} alt="사진" />
        </Image>
        <Like>
          <LikeButton onClick={handleButtonClick}>
            {liked ? (
              <FaRegHeart size={25} color={COLOR.main_blue} />
            ) : (
              <FaHeart size={25} color={COLOR.main_blue} />
            )}
          </LikeButton>
        </Like>
      </ImageAndLike>
      {posts.workoutRecordShare && <Record />}
      <Content>{posts.content}</Content>
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
