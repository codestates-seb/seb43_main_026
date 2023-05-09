import styled from 'styled-components';
import CalendarCompo from '../component/calendar/CalendarCompo';

const MyCalendarCon = styled.div`
  /* 모바일 기준 */
  @media ${(props) => props.theme.breakpoints.mobileMin} {
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
  }

  /* 태블릿 버전 */
  @media ${(props) => props.theme.breakpoints.tabletMin} {
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
  @media ${(props) => props.theme.breakpoints.desktopMin} {
    background-color: ${(props) => props.theme.color.pc_bg};
  }
`;

const MyCalendar = () => {
  return (
    <MyCalendarCon>
      <CalendarCompo />
    </MyCalendarCon>
  );
};

export default MyCalendar;
