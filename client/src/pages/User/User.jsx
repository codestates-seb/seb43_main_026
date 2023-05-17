import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router';
import { COLOR } from '../../style/theme';
import Button from '../../component/common/Button';
import { useEffect } from 'react';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_URL;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${COLOR.bg_light_blue};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserProfile = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 90%;
  height: 17vh;
  background-color: white;
  border-radius: 15px;
  display: flex;
  align-items: center;
`;

const UserImage = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 100%;
  border: 1px solid ${COLOR.main_blue};
  margin: 0 4rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.span`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`;

const AttendanceRate = styled.span`
  margin: 0.5rem 0;
  font-size: 1rem;
`;

const ExerciseTime = styled.span`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const UserCalendarList = styled.ul`
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 1rem;
`;

const Title = styled.h1`
  width: 100%;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${COLOR.main_blue};
`;

const User = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  console.log(userId);
  useEffect(() => {
    axios.get(`${SERVER_URL}/members/${userId}`);
  }, []);
  return (
    <Container>
      <UserProfile>
        <UserImage />
        <UserInfo>
          <Nickname>
            수빈
            <Button
              text={'프로필 설정'}
              width={'80px'}
              height={'25px'}
              style={{ paddingLeft: '10px' }}
              handleClick={() => {
                navigate('/edit/profile');
              }}
            />
          </Nickname>
          <AttendanceRate>이번달 출석률 80%</AttendanceRate>
          <ExerciseTime>이번달 운동시간 100시간</ExerciseTime>
        </UserInfo>
      </UserProfile>
      <UserCalendarList>
        <Title>🗓️ 내가 자랑한 캘린더</Title>
      </UserCalendarList>
    </Container>
  );
};

export default User;
