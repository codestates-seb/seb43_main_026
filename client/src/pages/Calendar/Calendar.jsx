import styled from 'styled-components';
import CalendarComponent from '../../component/Calendar/CalendarComponent';
import { SIZE, COLOR } from '../../style/theme';
import { WarningToast } from '../../component/common/WarningToast';

const MyCalendarContainer = styled.div`
  background-color: #fff;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 0px;

  @media screen and(min-width: ${SIZE.tablet}) {
    background-color: #fff;
    .cal-bottom {
      padding: 30px 50px;
    }
  }

  @media screen and (max-width: ${SIZE.desktop}) {
    background-color: ${COLOR.pc_bg};
  }
`;

const MyCalendar = ({ isLoginSuccess, setIsLoginSuccess }) => {
  return (
    <>
      {isLoginSuccess && (
        <WarningToast
          setWarning={setIsLoginSuccess}
          text={'로그인에 성공하였습니다.'}
        />
      )}
      <MyCalendarContainer>
        <CalendarComponent />
      </MyCalendarContainer>
    </>
  );
};

export default MyCalendar;
