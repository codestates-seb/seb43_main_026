import styled from 'styled-components';
import CalendarComponent from '../../component/calendar/CalendarComponent';
import { SIZE, COLOR } from '../../style/theme';
const MyCalendarContainer = styled.div`
  /* 모바일 기준 */
  background-color: #fff;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 0px;
  .cal-main {
    height: 700px;
  }

  /* 태블릿 버전 */
  @media screen and(min-width: ${SIZE.tablet}) {
    background-color: #fff;
    .cal-main {
      padding: 0 40px;
      height: 900px;
    }
    .cal-bottom {
      padding: 30px 50px;
    }
  }

  /* pc버전  */
  @media screen and (max-width: ${SIZE.desktop}) {
    background-color: ${COLOR.pc_bg};
  }
`;

const MyCalendar = () => {
  return (
    <MyCalendarContainer>
      <CalendarComponent />
    </MyCalendarContainer>
  );
};

export default MyCalendar;
