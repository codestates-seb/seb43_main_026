import styled from 'styled-components';
import CalendarAddBody from '../../component/Calendar/CalendarAddComponent/CalendarAddBody';

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
      <CalendarAddBody />
    </CalendarAddContainer>
  );
};

export default CalendarAdd;
