//모듈
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

//공통 스타일
import { COLOR } from '../../style/theme';

//공통 컴포넌트
import { BackButton } from '../../component/common/Button';

//컴포넌트
import UploadImage from '../../component/Board/UploadImage';

//전체 컨테이너
const Container = styled.main`
  margin: 0 auto;
  margin-top: 30px;
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
`;

//보드 상단 헤더
const GobackAndUpload = styled.section`
  width: 100%;
  height: 40px;
  background-color: ${COLOR.main_gray};
  padding: 0px 15px 0px 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

const Goback = styled.button`
  margin-top: 5px;
`;

const UploadBtn = styled.button`
  font-size: 15px;
  font-weight: 600;
  color: ${COLOR.main_dark_blue};
  &:hover {
    color: ${COLOR.main_dark_blue_hover};
  }
  &:active {
    color: ${COLOR.main_dark_blue_active};
  }
`;

//게시글 입력폼
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

//제목
const LabelHidden = styled.label`
  display: none;
`;

const InputTitle = styled.input`
  width: 100%;
  padding: 0 10px;
  height: 40px;
  border-bottom: 1px solid ${COLOR.main_blue};
  &:focus {
    outline: none;
  }
`;

// 이미지 업로드
const Image = styled.div``;

// 운동기록
const WorkOut = styled.div``;

// 캘린더 공유
const Calendar = styled.div``;

const BoardAdd = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
  };
  return (
    <Container>
      <GobackAndUpload>
        <Goback>
          <BackButton />
        </Goback>
        <UploadBtn type="submit" onClick={handleSubmit(onSubmit)}>
          등록
        </UploadBtn>
      </GobackAndUpload>
      <Form>
        <div>
          <LabelHidden htmlFor="title">제목</LabelHidden>
          <InputTitle
            id="title"
            type="text"
            placeholder="제목"
            {...register('title')}
          />
        </div>
        <Image>
          <LabelHidden htmlFor="image">사진</LabelHidden>
          <UploadImage id="image" register={register} />
        </Image>
        <WorkOut>
          <label htmlFor="workoutRecordShare">운동 기록 </label>
          <input
            id="workoutRecordShare"
            type="checkbox"
            {...register('workoutRecordShare')}
          />
        </WorkOut>
        <Calendar>
          <label htmlFor="calendarShare">캘린더 자랑하기</label>
          <input
            id="calendarShare"
            type="checkbox"
            {...register('calendarShare')}
          />
        </Calendar>
        <div>
          <LabelHidden htmlFor="content">내용</LabelHidden>
          <textarea
            id="content"
            placeholder="내용을 입력하세요"
            {...register('content')}
          />
        </div>
      </Form>
    </Container>
  );
};

export default BoardAdd;
