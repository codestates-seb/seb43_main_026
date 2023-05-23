import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { COLOR } from '../../style/theme';
import Button from '../../component/common/Button';
import ProfileImage from '../../assets/image/headalee.png';
import { useEffect } from 'react';

// const SERVER_URL = process.env.REACT_APP_API_URL;

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
  height: 20%;
  background-color: white;
  border-radius: 15px;
  display: flex;
  align-items: center;
`;

const UserImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 1px solid ${COLOR.main_blue};
  margin: 0 1.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1rem 0;
`;

const Nickname = styled.span`
  font-size: 1.1rem;
  display: flex;
  align-items: center;
`;

const AttendanceRate = styled.span`
  margin: 0.5rem 0;
  font-size: 0.8rem;
`;

const ExerciseTime = styled.span`
  font-size: 0.8rem;
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

const User = ({ loginUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginUser) {
      navigate('/login');
    }
  }, []);

  return (
    <Container>
      <UserProfile>
        <UserImage src={ProfileImage} alt="프로필 사진" />
        <UserInfo>
          <Nickname>{loginUser.nickname}</Nickname>
          <AttendanceRate>이번달 출석률 80%</AttendanceRate>
          <ExerciseTime>이번달 운동시간 100시간</ExerciseTime>
          <Button
            text={'프로필 설정'}
            width={'6rem'}
            height={'25px'}
            style={{ paddingLeft: '10px' }}
            handleClick={() => {
              navigate('/edit/profile');
            }}
          />
        </UserInfo>
      </UserProfile>
      <UserCalendarList>
        <Title>🗓️ 내가 자랑한 캘린더</Title>
      </UserCalendarList>
    </Container>
  );
};

export default User;
