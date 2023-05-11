import styled from 'styled-components';
import BackBtn from '../../common/Button';
import { COLOR } from '../../../style/theme';
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
  .cal-save-btn {
    border: none;
    background-color: inherit;
    font-size: 18px;
    font-weight: 600;
    color: ${COLOR.main_dark_blue};
    cursor: pointer;
  }
`;

const CalendarAddHeader = () => {
  return (
    <CalendarAddHeaderContainer>
      <BackBtn />
      <button className="cal-save-btn">저 장</button>
    </CalendarAddHeaderContainer>
  );
};
export default CalendarAddHeader;
