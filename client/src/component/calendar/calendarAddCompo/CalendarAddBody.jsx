import styled from 'styled-components';
import ImageUpload from '../../common/ImageUpload';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
// datepicker 한국어로 변경
import { ko } from 'date-fns/esm/locale';
import { COLOR } from '../../../style/theme';
// styled-component
// 날짜 등록
const InputDateContainer = styled.div`
  /* 모바일 기준 */
  width: 90%;
  margin-top: 50px;
  padding: 0 0 5px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${COLOR.main_blue};
  .input-date {
    margin-right: 10px;
    font-size: 18px;
  }
  .date-picker {
    border: none;
    font-size: 20px;
  }
`;

// 장소 등록
const InputPlaceContainer = styled.div`
  /* 모바일 기준 */
  width: 90%;
  margin-top: 50px;
  padding: 0 0 5px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${COLOR.main_blue};
  .input-place {
    font-size: 18px;
    margin-right: 10px;
  }
`;

//캘린더 작성 바디
const CalendarAddBodyContainer = styled.section`
  /* 모바일 기준 */
  width: 100%;
  height: 100%;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

//component
// 날짜 등록
const InputDate = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  // 날짜 데이터 형식 변환
  const year = selectedDate.getFullYear();
  const month =
    // 10보다 작은 경우, 문자열을 이용하여 2자리 숫자로 만들기
    //getMonth()는 0부터 11까지의 값을 반환 -> 실제 월 값에 1을 더해야함
    selectedDate.getMonth() + 1 < 10
      ? '0' + (selectedDate.getMonth() + 1)
      : selectedDate.getMonth() + 1;
  const day =
    selectedDate.getDate() < 10
      ? '0' + selectedDate.getDate()
      : selectedDate.getDate();

  const dateData = `${year}-${month}-${day}`;
  console.log(dateData);
  return (
    <InputDateContainer>
      <span className="input-date">날짜 :</span>
      <div>
        <DatePicker
          className="date-picker"
          locale={ko}
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
        />
      </div>
    </InputDateContainer>
  );
};

// 장소 등록
const InputPlace = () => {
  return (
    <InputPlaceContainer>
      <span className="input-place">장소 :</span>
      <div></div>
    </InputPlaceContainer>
  );
};

// 캘린더 작성 바디
const CalendarAddBody = () => {
  return (
    <CalendarAddBodyContainer>
      <ImageUpload />
      <InputDate />
      <InputPlace />
    </CalendarAddBodyContainer>
  );
};

export default CalendarAddBody;
