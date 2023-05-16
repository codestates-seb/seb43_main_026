import styled from 'styled-components';
import ImageUpload from '../../common/ImageUpload';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';
// datepicker 한국어로 변경
import { ko } from 'date-fns/esm/locale';
import { COLOR, SIZE } from '../../../style/theme';
import SearchPlace from './SearchPlace';
import TimeDropDown from '../TimeDropDown';
import BackButton from '../../common/BackButton';
import { format } from 'date-fns';
import { useNavigate } from 'react-router';
import axios from 'axios';

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

// 상단 컨테이너
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
  margin-bottom: 30px;
`;

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
    margin-right: 20px;
    font-size: 18px;
    font-weight: 600;
  }

  .date-picker {
    width: 130px;
    border: none;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    :focus {
      outline: none;
    }
  }
  .react-datepicker__navigation {
    color: ${COLOR.main_blue};
  }
  .react-datepicker__day--selected {
    border-radius: 25px;
    background-color: ${COLOR.main_blue};
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
    margin-right: 20px;
    font-size: 18px;
    font-weight: 600;
  }
  > input {
    font-size: 20px;
    font-weight: 600;
    margin-right: 10px;
    border: none;
    :focus {
      outline: none;
    }
  }
`;

// 수영 시간 등록
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
    font-size: 18px;
    font-weight: 600;
  }

  @media screen and (min-width: ${SIZE.tablet}) {
    flex-direction: column;
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
    max-width: 100%;
    margin: 20px 30px 0 10px;
    min-height: 120px;
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
const CalendarAddContainer = styled.form`
  /* 모바일 기준 */
  width: 100%;
  height: 100%;
  padding: 0px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

//component
// 버튼
const CalendarSaveButton = ({ onSubmit }) => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    onSubmit();
    navigate('/');
  };
  return (
    <CalendarSaveButtonContainer type="submit" onClick={handleSubmit}>
      저 장
    </CalendarSaveButtonContainer>
  );
};

// 날짜 등록
const InputDate = ({ selectedDate, setSelectedDate }) => {
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
const InputPlace = ({ place, setPlace }) => {
  // 지도 모달창
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const handleSearchModal = () => {
    setOpenSearchModal(!openSearchModal);
  };

  return (
    <InputPlaceContainer>
      <span>장소 </span>
      <input
        type="read-only"
        onClick={handleSearchModal}
        placeholder="장소를 넣어주세요"
        defaultValue={place}
      />
      {openSearchModal ? (
        <SearchPlace
          handleSearchModal={handleSearchModal}
          place={place}
          setPlace={setPlace}
        />
      ) : null}
    </InputPlaceContainer>
  );
};

// 운동 시간 등록
const SwimTime = ({ ...swimTimeProps }) => {
  console.log(swimTimeProps);
  return (
    <SwimTimeContainer>
      <span>수영 시간</span>
      <TimeDropDown {...swimTimeProps} />
    </SwimTimeContainer>
  );
};

// 메모 등록
const InputMemo = ({ memo, setMemo }) => {
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
const CalendarAdd = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [place, setPlace] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [durationTime, setDurationTime] = useState('');
  const [memo, setMemo] = useState('');

  const swimTimeProps = {
    startTime,
    setStartTime,
    endTime,
    setEndTime,
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
    console.log(durationTime);
  }, [startTime, endTime]);
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');
  console.log(formattedDate);
  const onSubmit = () => {
    const dataSet = {
      date: formattedDate,
      imageAddress: imageUrl,
      memo: memo,
      location: place,
      startTime: startTime,
      endTime: endTime,
      durationTime: durationTime,
    };
    console.log(dataSet);
    axios
      .post(`${process.evn.REACT_APP_API_URL}/schedules`, dataSet)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(imageUrl);
  return (
    <>
      <CalendarAddHeaderContainer>
        <BackButton />
        <CalendarSaveButton onSubmit={onSubmit} />
      </CalendarAddHeaderContainer>
      <CalendarAddContainer>
        <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
        <InputDate
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <InputPlace place={place} setPlace={setPlace} />
        <SwimTime {...swimTimeProps} />
        <InputMemo memo={memo} setMemo={setMemo} />
      </CalendarAddContainer>
    </>
  );
};

export default CalendarAdd;
