import styled from 'styled-components';
import BackButton from '../../component/common/BackButton';
import { COLOR } from '../../style/theme';
import ImageUpload from '../../component/common/ImageUpload';
// styled-component
const CalendarEditContainer = styled.main``;

// 헤더
const CalendarEditHeader = styled.header`
  width: 100%;
  height: 48px;
  background-color: ${COLOR.main_gray};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px 0 10px;
  margin-bottom: 30px;
`;
const CalendarSaveEditContainer = styled.button`
  border: none;
  background-color: inherit;
  font-size: 18px;
  font-weight: 600;
  color: ${COLOR.main_dark_blue};
  cursor: pointer;
`;

// 바디
const CalendarEditBody = styled.body``;
const CalendarEditImage = styled.div``;
const CalendarEdit = () => {
  return (
    <CalendarEditContainer>
      <CalendarEditHeader>
        <BackButton />
        <CalendarSaveEditContainer>저장</CalendarSaveEditContainer>
      </CalendarEditHeader>
      <CalendarEditBody>
        <CalendarEditImage>
          <ImageUpload />
        </CalendarEditImage>
      </CalendarEditBody>
    </CalendarEditContainer>
  );
};

export default CalendarEdit;
