//모듈
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

//공통 스타일
import { COLOR } from '../../style/theme';

//공통 컴포넌트
import BackButton from '../../component/common/BackButton';

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
const Image = styled.section`
  border-bottom: 1px solid ${COLOR.main_blue};
`;

// 캘린더 공유
const Calendar = styled.div`
  width: 100%;
  height: 40px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLOR.main_dark_blue};
  color: white;
`;

// 운동기록 공유
const WorkOut = styled.div`
  width: 100%;
  height: 40px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLOR.main_blue};
  color: white;
  border-bottom: 1px solid ${COLOR.main_blue};
`;

const Sharecheckbox = styled.input`
  width: 20px;
  height: 20px;
  outline: none;
  cursor: pointer;
`;

const Record = styled.section`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  font-weight: 600;
  border-bottom: 1px solid ${COLOR.main_blue};
  section {
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Current = styled.section`
  height: 100%;
  border-right: 1px solid ${COLOR.main_blue};
  background-color: ${COLOR.main_gray};
  span {
    color: ${COLOR.main_dark_blue};
  }
`;

const Year = styled.span`
  margin-bottom: 4px;
  font-size: 14px;
`;
const Month = styled.span`
  font-size: 17px;
`;

const Attendance = styled.section`
  height: 100%;
`;
const TotalTime = styled.section`
  height: 100%;
  border-left: 1px solid ${COLOR.main_blue};
  background-color: ${COLOR.bg_comment};
`;

const Name = styled.span`
  margin-bottom: 4px;
  font-size: 14px;
`;
const Rate = styled.span`
  font-size: 17px;
`;

// 내용
const Content = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: fit-content;
`;

const Memo = styled.textarea`
  width: 100%;
  resize: none;
  min-height: 250px;
  max-height: auto;
  padding: 10px;
  line-height: 1.3;
  &:focus {
    outline: none;
  }
`;

const BoardAdd = () => {
  const { register, handleSubmit } = useForm();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear(); // 현재 년도
  const currentMonth = currentDate.getMonth() + 1; // 현재 월 (0부터 시작하므로 +1 필요)

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
          <UploadImage register={register} id="image" />
        </Image>
        <Calendar>
          <label htmlFor="calendarShare">캘린더 결산</label>
          <Sharecheckbox
            id="calendarShare"
            type="checkbox"
            {...register('calendarShare')}
          />
        </Calendar>
        <WorkOut>
          <label htmlFor="workoutRecordShare">나의 운동 기록 같이 올리기</label>
          <Sharecheckbox
            id="workoutRecordShare"
            type="checkbox"
            {...register('workoutRecordShare')}
          />
        </WorkOut>
        <Record>
          <Current>
            <Year>{`${currentYear}년`}</Year>
            <Month>{`${currentMonth}월`}</Month>
          </Current>
          <Attendance>
            <Name>출석률</Name>
            <Rate>80%</Rate>
          </Attendance>
          <TotalTime>
            <Name>총 운동 시간</Name>
            <Rate>40 시간</Rate>
          </TotalTime>
        </Record>
        <Content>
          <LabelHidden htmlFor="content">내용</LabelHidden>
          <Memo id="content" placeholder="내용" {...register('content')} />
        </Content>
      </Form>
    </Container>
  );
};

export default BoardAdd;
