//모듈
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';

//공통 스타일
import { COLOR } from '../../../style/theme';

//서버 url
const API_URL = process.env.REACT_APP_API_URL;

const Container = styled.li`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${COLOR.bg_comment};
`;

const CommentTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentInfo = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  padding: 3px 10px 0px;
  display: flex;
  align-items: center;
`;

const CommentModify = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;

  button {
    border: none;
    background-color: transparent;
    width: 40px;
    cursor: pointer;
  }
`;

const CommentWriter = styled.span`
  font-size: 14px;
  font-weight: 600;
  margin-right: 4px;
  color: ${COLOR.main_dark_blue};
`;
const CreateAt = styled.span`
  font-size: 13px;
  color: ${COLOR.font_comment};
`;

const Text = styled.div`
  width: 100%;
  min-height: 35px;
  max-height: auto;
  padding: 0px 10px 5px 10px;
  line-height: 1.3;
  white-space: pre-line;
  font-size: 14px;
`;

const Comment = ({ comment, setComment, setCommentCount }) => {
  const { boardId } = useParams();

  const handleButtonModify = () => {};

  const handleButtonDelete = (commentId) => {
    axios
      .delete(`${API_URL}/boards/${boardId}/${commentId}`, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        setComment(response.data);
        setCommentCount(response.data.length);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {comment.length
        ? comment.map((post) => (
            <Container key={post.commentId}>
              <CommentTitle>
                <CommentInfo>
                  <CommentWriter>{post.title}</CommentWriter>
                  <CreateAt>2023-05-10</CreateAt>
                </CommentInfo>
                <CommentModify>
                  <button onClick={handleButtonModify}>수정</button>
                  <button onClick={() => handleButtonDelete(post.commentId)}>
                    삭제
                  </button>
                </CommentModify>
              </CommentTitle>
              <Text>{post.commentContent}</Text>
            </Container>
          ))
        : null}
    </>
  );
};

export default Comment;
