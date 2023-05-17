//모듈
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

//공통 스타일
import { COLOR } from '../../style/theme';

//공통 컴포넌트
import Button from '../common/Button';

const Form = styled.form`
  margin: 13px 0px 40px;
  width: 100%;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Comment = styled.section`
  width: 100%;
  height: fit-content;
`;

const LabelHidden = styled.label`
  display: none;
`;

const InputComment = styled.textarea`
  width: 100%;
  padding: 10px 10px;
  height: 60px;
  border-radius: 5px;
  resize: none;
  font-size: 14px;
  line-height: 1.3;
  max-height: auto;
  margin-bottom: 5px;
  white-space: pre-line;
  border: 1px solid ${COLOR.bg_comment};
  &:focus {
    outline: none;
  }
`;

const CommentButton = styled(Button)`
  background-color: ${COLOR.main_blue};
`;

function CommentForm() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Comment>
        <LabelHidden htmlFor="comment">댓글:</LabelHidden>
        <InputComment
          id="comment"
          type="text"
          placeholder="댓글을 작성해주세요"
          {...register('comment')}
        />
      </Comment>
      <CommentButton text="댓글 작성" width="98%" height="40px" type="submit" />
    </Form>
  );
}

export default CommentForm;
