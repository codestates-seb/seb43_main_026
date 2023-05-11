import styled from 'styled-components';
import ImageUpload from '../../common/ImageUpload';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';
// datepicker 한국어로 변경
import { ko } from 'date-fns/esm/locale';
import { COLOR } from '../../../style/theme';
// import SearchPlace from './SearchPlace';
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

// 수영 시간 등록
const TimeDropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const SwimTimeContainer = styled.div`
  /* 모바일 기준 */
  width: 90%;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${COLOR.main_blue};
  margin-top: 50px;
  padding: 0 0 5px 10px;
  > span {
    margin-right: 50px;
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
  // 지도 모달창
  const [openSearchModal, setOpenSearchModal] = useState(false);

  const handleSearchModal = () => {
    setOpenSearchModal(!openSearchModal);
  };
  return (
    <InputPlaceContainer>
      <span className="input-place">장소 :</span>
      <input type="text" onClick={handleSearchModal} />
      {/* {openSearchModal ? <SearchPlace /> : null} */}
    </InputPlaceContainer>
  );
};

// 운동 시간 등록
const TimeDropdown = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [durationTime, setDurationTime] = useState('');

  // 00시 부터 24시까지의 시간
  // 25개의 빈 배열을 만들어 안에 요소를 넣음
  const hours = [...Array(25).keys()].map((h) => {
    const hour = h < 10 ? `0${h}` : h;
    return `${hour}:00`;
  });

  const halfHours = [...Array(24).keys()].map((h) => {
    const hour = h < 10 ? `0${h}` : h;
    return `${hour}:30`;
  });

  const times = [...hours, ...halfHours].sort();
  // endTime이 startTime보다 큰지 확인하는 함수
  const isEndTimeValid = () => {
    if (!startTime || !endTime) return true; // 둘 중 하나가 선택되지 않은 경우

    const start = parseInt(startTime.replace(':', ''));
    const end = parseInt(endTime.replace(':', ''));
    return end > start;
  };

  // 종료 시간이 더 빠를 경우 에러메세지 띄우기
  const getErrorMessage = () => {
    if (isEndTimeValid()) return '';

    return '종료 시간은 시작 시간보다 빠를 수 없습니다.';
  };
  // 지속 시간 계산
  const calculateDuration = () => {
    if (!startTime || !endTime) return 0;

    const startHour = parseInt(startTime.substring(0, 2));
    const startMinute = parseInt(startTime.substring(3));
    const endHour = parseInt(endTime.substring(0, 2));
    const endMinute = parseInt(endTime.substring(3));

    const startInMinutes = startHour * 60 + startMinute;
    const endInMinutes = endHour * 60 + endMinute;

    return (endInMinutes - startInMinutes) / 60;
  };

  useEffect(() => {
    const durationInMinutes = calculateDuration();
    setDurationTime(durationInMinutes);
  }, [startTime, endTime]);
  console.log(durationTime);
  return (
    <TimeDropdownContainer>
      <div>
        <label htmlFor="startTime">시작 시간</label>
        <select
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        >
          {times.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="endTime">종료 시간</label>
        <select value={endTime} onChange={(e) => setEndTime(e.target.value)}>
          {times.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        <p style={{ color: 'red' }}>{getErrorMessage()}</p>
      </div>
    </TimeDropdownContainer>
  );
};
const SwimTime = () => {
  return (
    <SwimTimeContainer>
      <span>수영 시간</span>
      <TimeDropdown />
    </SwimTimeContainer>
  );
};

// 캘린더 작성 바디
const CalendarAddBody = () => {
  return (
    <CalendarAddBodyContainer>
      <ImageUpload />
      <InputDate />
      <InputPlace />
      <SwimTime />
    </CalendarAddBodyContainer>
  );
};

export default CalendarAddBody;
