import styled from 'styled-components';
import CalendarAddHeader from '../../component/calendar/calendarAddCompo/CalendarAddHeader';
import CalendarAddBody from '../../component/calendar/calendarAddCompo/CalendarAddBody';

const CalendarAddContainer = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 30px;
`;

const CalendarAdd = () => {
  return (
    <CalendarAddContainer>
      <CalendarAddHeader />
      <CalendarAddBody />
    </CalendarAddContainer>
  );
};

export default CalendarAdd;
