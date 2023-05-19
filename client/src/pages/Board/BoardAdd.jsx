//모듈
import styled from 'styled-components';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

//공통 스타일
import { COLOR, SIZE } from '../../style/theme';

//공통 컴포넌트
import BackButton from '../../component/common/BackButton';

//컴포넌트
import UploadImage from '../../component/Board/BoardAdd/UploadImage';
import Record from '../../component/Board/BoardAdd/Record';

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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;

const Category = styled.span`
  font-size: 19px;
  font-weight: 600;
  color: ${COLOR.main_dark_blue_active};

  @media screen and (min-width: ${SIZE.mobileMax}) {
    font-size: 20px;
  }
`;

const UploadBtn = styled.button`
  font-size: 17px;
  font-weight: 600;
  color: ${COLOR.main_dark_blue};
  &:hover {
    color: ${COLOR.main_dark_blue_hover};
  }
  &:active {
    color: ${COLOR.main_dark_blue_active};
  }

  @media screen and (min-width: ${SIZE.mobileMax}) {
    font-size: 20px;
  }
`;

//게시글 입력폼
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// 이미지 업로드
const Image = styled.section`
  padding: 0 0 20px 0;
  border-bottom: 1px solid ${COLOR.main_blue};
`;

// 운동기록 공유
const WorkOutContainer = styled.div`
  position: sticky;
  width: 100%;
  height: fit-content;
`;

const WorkOut = styled.div`
  position: absolute;
  top: -40px;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  color: ${COLOR.main_dark_blue};
`;

const Sharecheckbox = styled.input`
  width: 15px;
  height: 15px;
  outline: none;
  margin-right: 5px;
  cursor: pointer;
`;
//제목
const TitleContainer = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
`;

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

// 내용
const Content = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: fit-content;
  flex-direction: column;
`;

const Memo = styled.textarea`
  width: 100%;
  resize: none;
  min-height: 400px;
  max-height: auto;
  padding: 10px;
  line-height: 1.3;
  white-space: pre-line;
  &:focus {
    outline: none;
  }
`;

// 캘린더 공유
const Calendar = styled.div`
  width: 100%;
  height: 40px;
  padding: 0 15px;
  display: none;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLOR.main_dark_blue};
  color: white;
`;

const ErrorContainer = styled.div`
  width: 100%;
  position: sticky;
`;
const ErrorMessage = styled.span`
  position: absolute;
  right: 8px;
  top: 12px;
  color: ${COLOR.main_dark_blue};
  font-weight: 600;
`;

const BoardAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [workoutRecordShare, setWorkoutRecordShare] = useState(true);

  const location = useLocation();
  const { isShareCalendar } = location.state;
  console.log(isShareCalendar);

  const isCalendarShareChecked = isShareCalendar ? true : false;

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
  };

  const handleWorkoutRecordShareChange = (e) => {
    setWorkoutRecordShare(e.target.checked);
  };

  return (
    <Container>
      <GobackAndUpload>
        <Goback>
          <BackButton />
        </Goback>
        {isShareCalendar && <Category>{`< 캘린더 자랑 >`}</Category>}
        <UploadBtn type="submit" onClick={handleSubmit(onSubmit)}>
          등록
        </UploadBtn>
      </GobackAndUpload>

      <Form>
        <Image>
          <LabelHidden htmlFor="image">사진</LabelHidden>
          <UploadImage register={register} id="image" />
        </Image>
        <WorkOutContainer>
          <WorkOut>
            <Sharecheckbox
              id="workoutRecordShare"
              type="checkbox"
              {...register('workoutRecordShare')}
              checked={workoutRecordShare}
              onChange={handleWorkoutRecordShareChange}
            />
            <label htmlFor="workoutRecordShare">
              나의 운동 기록 같이 올리기
            </label>
          </WorkOut>
        </WorkOutContainer>
        {workoutRecordShare && <Record />}
        <TitleContainer>
          {errors.title && (
            <ErrorContainer>
              <ErrorMessage>제목을 입력해주세요.</ErrorMessage>
            </ErrorContainer>
          )}
          <LabelHidden htmlFor="title">제목</LabelHidden>
          <InputTitle
            id="title"
            type="text"
            placeholder="제목"
            {...register('title', { required: true })}
          />
        </TitleContainer>
        <Content>
          {errors.content && (
            <ErrorContainer>
              <ErrorMessage>내용을 입력해주세요.</ErrorMessage>
            </ErrorContainer>
          )}
          <LabelHidden htmlFor="content">내용</LabelHidden>
          <Memo
            id="content"
            placeholder="내용"
            {...register('content', { required: true })}
          />
        </Content>

        <Calendar>
          <label htmlFor="calendarShare">캘린더 결산</label>
          <Sharecheckbox
            id="calendarShare"
            type="checkbox"
            {...register('calendarShare')}
            checked={isCalendarShareChecked}
          />
        </Calendar>
      </Form>
    </Container>
  );
};

export default BoardAdd;
