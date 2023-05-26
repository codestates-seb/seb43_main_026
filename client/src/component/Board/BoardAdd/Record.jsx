import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { COLOR } from '../../../style/theme';

const API_URL = process.env.REACT_APP_API_URL;

const Container = styled.section`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  font-weight: 600;
  background-color: ${COLOR.bg};
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
  background-color: ${COLOR.bg};
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

const Record = ({
  isShareCalendar,
  post,
  setTotalWorkoutTime,
  setTodayWorkoutTime,
  setWorkoutLocation,
  setAttendance,
}) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear(); // 현재 년도
  const currentMonth = currentDate.getMonth() + 1; // 현재 월 (0부터 시작하므로 +1 필요)
  const [calendarData, setCalendarData] = useState([]);
  const [todayData, setTodayData] = useState([]);

  //이번 달 총 일수
  function getTotalDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  // 이번 달의 출석률 계산
  const totalDays = getTotalDaysInMonth(currentYear, currentMonth);
  const workoutRate = Math.round(calendarData.length / totalDays);
  setAttendance(workoutRate);

  // 총 운동 시간
  const totalDuration = calendarData.reduce((total, el) => {
    return total + el.durationTime;
  }, 0);

  const totalDurationString = totalDuration.toString();
  setTotalWorkoutTime(totalDurationString);

  //하루 기록 추출
  const todayDateString = `${currentYear}-${String(currentMonth).padStart(
    2,
    '0'
  )}-${String(currentDate.getDate()).padStart(2, '0')}`;
  setTodayWorkoutTime(
    todayData.length > 0 ? `${todayData[0].durationTime} 시간` : 0
  );
  setWorkoutLocation(
    todayData.length > 0 ? `${todayData[0].location}` : '기록 없음'
  );

  useEffect(() => {
    axios
      .get(`${API_URL}/schedules?year=${currentYear}&month=${currentMonth}`, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => {
        setCalendarData(res.data);
        setTodayData(res.data.filter((el) => el.date === todayDateString));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <Current>
        <Year>{`${currentYear}년`}</Year>
        <Month>{`${currentMonth}월`}</Month>
      </Current>
      {isShareCalendar ? (
        <Attendance>
          <Name>출석률</Name>
          <Rate> {post ? post.totalWorkoutTime : { workoutRate }}%</Rate>
        </Attendance>
      ) : (
        <Attendance>
          <Name>장소</Name>
          <Rate>
            {post
              ? post.workoutLocation
              : todayData.length > 0
              ? `${todayData[0].location}`
              : '기록 없음'}
          </Rate>
        </Attendance>
      )}
      {isShareCalendar ? (
        <TotalTime>
          <Name>총 운동 시간</Name>
          <Rate>{post ? post.totalWorkoutTime : totalDurationString} 시간</Rate>
        </TotalTime>
      ) : (
        <TotalTime>
          <Name>오늘 운동 시간</Name>
          <Rate>
            {post
              ? post.todayWorkoutTime
              : todayData.length > 0
              ? `${todayData[0].durationTime} 시간`
              : '기록 없음'}
          </Rate>
        </TotalTime>
      )}
    </Container>
  );
};

export default Record;
