import styled from 'styled-components';
import CalendarAddHeader from '../../component/calendar/calendarAddCompo/CalendarAddHeader';
import CalendarAddBody from '../../component/calendar/calendarAddCompo/CalendarAddBody';

const CalendarAddContainer = styled.div``;

const CalendarAdd = () => {
  return (
    <CalendarAddContainer>
      <CalendarAddHeader />
      <CalendarAddBody />
    </CalendarAddContainer>
  );
};

export default CalendarAdd;
