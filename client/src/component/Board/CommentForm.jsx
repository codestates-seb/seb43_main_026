import React from 'react';
import { useForm } from 'react-hook-form';

function CommentForm() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log('댓글:', data.comment);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          댓글:
          <input type="text" {...register('comment', { required: true })} />
        </label>
      </div>
      <button type="submit">댓글 작성</button>
    </form>
  );
}

export default CommentForm;
