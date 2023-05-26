import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { COLOR } from '../../../style/theme';

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

const FormModify = styled.form`
  width: 100%;

  textarea {
    width: 100%;
    resize: none;
    width: 100%;
    padding: 4px 10px;
    height: 60px;
    border-radius: 5px;
    font-size: 14px;
    line-height: 1.3;
    max-height: auto;
    margin-bottom: 5px;
    white-space: pre-line;

    &:focus {
      outline: none;
    }
  }
`;

const Comment = ({ comment, setComment, setCommentCount, localMemberId }) => {
  const { boardId } = useParams();
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  const handleButtonModify = (commentId) => {
    setEditingCommentId(commentId);
    const editingComment = comment.find((c) => c.commentId === commentId);
    if (editingComment) {
      setEditedContent(editingComment.commentContent);
    }
  };

  const handleButtonDelete = (commentId) => {
    axios
      .delete(`${API_URL}/boards/${boardId}/${commentId}`, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      .then(() => {
        const updatedComments = comment.filter(
          (c) => c.commentId !== commentId
        );
        setComment(updatedComments);
        setCommentCount(updatedComments.length);
      })

      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditSubmit = async (e, commentId) => {
    e.preventDefault();

    try {
      await axios.patch(
        `${API_URL}/boards/${boardId}/${commentId}`,
        {
          commentId: commentId,
          commentContent: editedContent,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem('accessToken')}`,
          },
        }
      );

      const updatedComments = comment.map((c) => {
        if (c.commentId === commentId) {
          return { ...c, commentContent: editedContent };
        }
        return c;
      });
      setComment(updatedComments);
      setEditingCommentId(null);
      setEditedContent('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {comment &&
        comment.map((post) => (
          <Container key={post.commentId}>
            <CommentTitle>
              <CommentInfo>
                <CommentWriter>{post.writer}</CommentWriter>
                <CreateAt>
                  {post.createdAt ? post.createdAt.slice(0, 10) : ''}
                </CreateAt>
              </CommentInfo>
              <CommentModify>
                {post.memberId === localMemberId ? (
                  editingCommentId === post.commentId ? (
                    <button
                      onClick={(e) => handleEditSubmit(e, post.commentId)}
                    >
                      완료
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleButtonModify(post.commentId)}
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleButtonDelete(post.commentId)}
                      >
                        삭제
                      </button>
                    </>
                  )
                ) : null}
              </CommentModify>
            </CommentTitle>
            {editingCommentId === post.commentId ? (
              <FormModify onSubmit={(e) => handleEditSubmit(e, post.commentId)}>
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
              </FormModify>
            ) : (
              <Text>{post.commentContent}</Text>
            )}
          </Container>
        ))}
    </>
  );
};

export default Comment;
