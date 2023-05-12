import styled from 'styled-components';
import ImageUpload from '../../common/ImageUpload';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';
// datepicker 한국어로 변경
import { ko } from 'date-fns/esm/locale';
import { COLOR, SIZE } from '../../../style/theme';

// import SearchPlace from './SearchPlace';
// styled-component
// 날짜 등록
const InputDateContainer = styled.div`
  /* 모바일 기준 */
  width: 90%;
  margin-top: 50px;
  padding: 0 0 10px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${COLOR.main_blue};
  > span {
    margin-right: 30px;
    font-size: 18px;
    font-weight: 600;
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
  padding: 0 0 10px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${COLOR.main_blue};
  > span {
    margin-right: 30px;
    font-size: 18px;
    font-weight: 600;
  }
  > input {
    font-size: 18px;
    margin-right: 10px;
    border: none;
  }
`;

// 수영 시간 등록
// dropdown
const DropdownContainer = styled.select`
  margin-left: 18px;
  width: 120px;
  height: 35px;
  max-height: 100px;
  cursor: pointer;
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 3px 5px 1px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 16px;
  ::-ms-expand {
    display: none;
  }
`;

const TimeDropdownContainer = styled.div`
  /* width: 60%; */
  display: flex;
  flex-direction: column;
  align-items: end;
  font-size: 18px;
  > section {
    display: flex;
    flex-direction: row;
    align-items: center;

    :last-of-type {
      margin-top: 15px;
    }
    > p {
      position: absolute;
      width: 300px;
      height: 100px;
      font-size: 12px;
      margin-top: 5px;
    }
    > label {
      font-size: 15px;
      font-weight: 600;
    }
  }

  /* 태블릿 버전 */
  @media screen and (min-width: ${SIZE.tablet}) {
    flex-direction: row;
    > div:first-of-type {
      margin-bottom: 0;
      margin-right: 30px;
    }
  }
`;

const SwimTimeContainer = styled.div`
  /* 모바일 기준 */
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${COLOR.main_blue};
  margin-top: 40px;
  padding: 0 0 10px 10px;
  > span {
    margin-right: 30px;
    font-size: 18px;
    font-weight: 600;
  }

  @media screen and (min-width: ${SIZE.tablet}) {
    justify-content: space-between;
    margin-top: 50px;
  }
`;

// 메모 등록
const InputMemoContainer = styled.div`
  width: 90%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  font-size: 18px;
  > span {
    font-size: 18px;
    font-weight: 600;
  }
  > textarea {
    max-width: 90%;
    margin: 20px 30px 0 10px;
    min-height: 150px;
    border: none;
    border-radius: 10px;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
    background-color: ${COLOR.bg_light_blue};
    padding: 10px;
    font-size: 14px;
    :focus {
      outline: 2px solid ${COLOR.main_blue};
    }
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
      <span>날짜 </span>
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
      <span>장소 </span>
      <input type="text" onClick={handleSearchModal} placeholder="장소 이름" />
      {/* {openSearchModal ? <SearchPlace /> : null} */}
    </InputPlaceContainer>
  );
};

// 운동 시간 등록
// dropdown
const Dropdown = ({ times, timeValue, setTimeValue }) => {
  return (
    <DropdownContainer
      value={timeValue}
      onChange={(e) => setTimeValue(e.target.value)}
    >
      <option value="">시간 선택 ⏰</option>
      {times.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </DropdownContainer>
  );
};

// Time dropdown
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

  // endTime이 startTime보다 큰지 확인
  const isEndTimeValid = () => {
    // 둘 중 하나가 선택되지 않은 경우
    if (!startTime || !endTime) return true;

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
      <section>
        <label htmlFor="startTime">시작</label>
        <Dropdown
          timeValue={startTime}
          setTimeValue={setStartTime}
          times={times}
        />
      </section>
      <section>
        <label htmlFor="endTime">종료</label>
        <Dropdown timeValue={endTime} setTimeValue={setEndTime} times={times} />
      </section>
      <p style={{ color: 'red' }}>{getErrorMessage()}</p>
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

// 메모 등록
const InputMemo = () => {
  const [memo, setMemo] = useState('');

  const handleChangeMemo = (e) => {
    setMemo(e.target.value);
    console.log(memo);
  };
  return (
    <InputMemoContainer>
      <span>메모</span>
      <textarea value={memo} onChange={handleChangeMemo} />
    </InputMemoContainer>
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
      <InputMemo />
    </CalendarAddBodyContainer>
  );
};

export default CalendarAddBody;
