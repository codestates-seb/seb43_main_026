//모듈
import styled from 'styled-components';

//공통 스타일
import { COLOR } from '../../../style/theme';
import { useEffect } from 'react';

const Container = styled.section`
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

const Record = ({ isShareCalendar }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear(); // 현재 년도
  const currentMonth = currentDate.getMonth() + 1; // 현재 월 (0부터 시작하므로 +1 필요)

  useEffect(() => {}, [isShareCalendar]);

  return (
    <Container>
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
    </Container>
  );
};

export default Record;
