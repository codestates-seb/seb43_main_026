import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router';
import { COLOR, SIZE } from '../../style/theme';
import BackButton from '../../component/common/BackButton';
import ImageUpload from '../../component/common/ImageUpload';
import Record from '../../component/Board/BoardAdd/Record';

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
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Image = styled.section`
  padding: 0 0 20px 0;
  border-bottom: 1px solid ${COLOR.main_blue};
`;

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

const BoardEdit = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [imageData, setImageData] = useState(new FormData());
  const [post, setPost] = useState([]);
  const [workoutRecordShare, setWorkoutRecordShare] = useState(
    post && post.workoutRecordShare
  );
  const [imageUrl, setImageUrl] = useState(null);
  const [totalWorkoutTime, setTotalWorkoutTime] = useState(0);
  const [todayWorkoutTime, setTodayWorkoutTime] = useState(0);
  const [workoutLocation, setWorkoutLocation] = useState('');
  const [attendance, setAttendance] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const fetchPostData = async () => {
    try {
      const response = await axios.get(`${API_URL}/boards/${boardId}`, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      });
      setPost(response.data);
      setImageUrl(response.data.boardImageAddress);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();

    let boardPatchDto = {
      title: data.title,
      content: data.content,
      calendarShare: data.calendarShare,
      workoutRecordShare: data.workoutRecordShare,
      attendanceRate: attendance,
      totalWorkoutTime: totalWorkoutTime,
      todayWorkoutTime: todayWorkoutTime,
      workoutLocation: workoutLocation,
    };

    try {
      const formData = new FormData();
      formData.append(
        'board',
        new Blob([JSON.stringify(boardPatchDto)], {
          type: 'application/json',
        })
      );
      if (imageData.get('image')) {
        formData.append('image', imageData.get('image'));
      }

      await axios.patch(`${API_URL}/boards/${boardId}`, formData, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      fetchPostData(); // 이동 후 다시 데이터 가져오기
      navigate(`/board/${boardId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWorkoutRecordShareChange = (e) => {
    setWorkoutRecordShare(e.target.checked);
  };

  useEffect(() => {
    if (post) {
      setValue('title', post.title);
      setValue('content', post.content);
    }
  }, [post, setValue]);

  useEffect(() => {
    fetchPostData();
  }, [boardId]);

  return (
    <Container>
      <GobackAndUpload>
        <Goback>
          <BackButton />
        </Goback>
        {post.calendarShare && <Category>{`< 캘린더 자랑 >`}</Category>}
        <UploadBtn type="submit" onClick={handleSubmit(onSubmit)}>
          등록
        </UploadBtn>
      </GobackAndUpload>

      <Form>
        <Image>
          <LabelHidden htmlFor="image">사진</LabelHidden>
          <ImageUpload
            id="image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            imageData={imageData}
            setImageData={setImageData}
          />
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
        {workoutRecordShare && (
          <Record
            isShareCalendar={post.calendarShare}
            post={post}
            setTotalWorkoutTime={setTotalWorkoutTime}
            setTodayWorkoutTime={setTodayWorkoutTime}
            setWorkoutLocation={setWorkoutLocation}
            setAttendance={setAttendance}
          />
        )}
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
            defaultValue={post.title}
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
            defaultValue={post.content}
            {...register('content', { required: true })}
          />
        </Content>

        <Calendar>
          <label htmlFor="calendarShare">캘린더 결산</label>
          <Sharecheckbox
            id="calendarShare"
            type="checkbox"
            {...register('calendarShare')}
            checked={post.calendarShare}
          />
        </Calendar>
      </Form>
    </Container>
  );
};

export default BoardEdit;
