import styled from 'styled-components';
import BackBtn from '../../common/Button';
import { COLOR } from '../../../style/theme';

// styled-component
// 버튼
const CalendarSaveButtonContainer = styled.button`
  border: none;
  background-color: inherit;
  font-size: 18px;
  font-weight: 600;
  color: ${COLOR.main_dark_blue};
  cursor: pointer;
`;

// 전체 컨테이너
const CalendarAddHeaderContainer = styled.header`
  /* 모바일 기준 */
  width: 100%;
  height: 48px;
  background-color: ${COLOR.main_gray};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px 0 10px;
`;

// component
// 버튼
const CalendarSaveButton = () => {
  return <CalendarSaveButtonContainer>저 장</CalendarSaveButtonContainer>;
};
const CalendarAddHeader = () => {
  return (
    <CalendarAddHeaderContainer>
      <BackBtn />
      <CalendarSaveButton />
    </CalendarAddHeaderContainer>
  );
};
export default CalendarAddHeader;
