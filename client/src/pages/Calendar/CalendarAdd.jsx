import styled from 'styled-components';
import { SIZE, COLOR } from '../../style/theme';
import { useState, useEffect } from 'react';
// import { calendarAPI } from '../../assets/api';
// 컴포넌트
import BackButton from '../../component/common/BackButton';
import { WarningModal } from '../../component/Calendar/CalendarAddComponent/WarningModal';
import ImageUpload from '../../component/common/ImageUpload';
import SearchPlace from '../../component/Calendar/SearchPlace';
import TimeDropDown from '../../component/Calendar/TimeDropDown';

// 라이브러리
import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import { format } from 'date-fns';
import axios from 'axios';

const CalendarAddContainer = styled.main`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 30px;
`;

const CalendarAddHeaderContainer = styled.header`
  width: 100%;
  height: 48px;
  background-color: ${COLOR.main_gray};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px 0 10px;
`;

const CalendarSaveButtonContainer = styled.button`
  border: none;
  background-color: inherit;
  font-size: 18px;
  font-weight: 600;
  color: ${COLOR.main_dark_blue};
  cursor: pointer;
  @media screen and (min-width: ${SIZE.tablet}) {
    font-size: 20px;
  }
`;

const InputDateContainer = styled.div`
  width: 100%;
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

const InputPlaceContainer = styled.div`
  width: 100%;
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

const SwimTimeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${COLOR.main_blue};
  margin-top: 40px;
  padding: 0 20px 10px 10px;
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

const InputMemoContainer = styled.div`
  width: 100%;
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

const CalendarAddBodyContainer = styled.form`
  width: 100%;
  height: 100%;
  /* padding: 0px 30px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
  @media screen and (min-width: ${SIZE.tablet}) {
    width: 90%;
  }
`;

const CalendarAdd = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageData, setImageData] = useState(new FormData());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [place, setPlace] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [durationTime, setDurationTime] = useState('');
  const [memo, setMemo] = useState('');

  // 경고창
  const [imageAvailable, setImageAvailavble] = useState(true);
  const [timeAvailable, setTimeAvailable] = useState(true);

  useEffect(() => {
    console.log(imageData.get('image'));
  }, [imageData]);

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

  const onSubmit = () => {
    const dataSet = {
      date: formattedDate,
      startTime: startTime,
      endTime: endTime,
      durationTime: durationTime,
      location: place,
      memo: memo,
    };
    console.log(dataSet, imageData);
    if (!imageData) {
      setImageAvailavble(false);
      return;
    } else if (!dataSet.durationTime || dataSet.durationTime === 0) {
      setTimeAvailable(false);
      return;
    }

    // calendarAPI.calendarAdd({ dataSet, imageData });
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/ schedules`,
        { data: dataSet, image: imageData },
        {
          headers: {
            Authorization: `${localStorage.getItem('accessToken')}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 장소 등록
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const handleSearchModal = () => {
    setOpenSearchModal(!openSearchModal);
  };

  // 메모 등록
  const handleChangeMemo = (e) => {
    setMemo(e.target.value);
    console.log(memo);
  };

  // 저장
  // const navigate = useNavigate();
  const handleSubmit = () => {
    onSubmit();
    // navigate('/');
  };

  const token = localStorage.getItem('accessToken');
  console.log(token);
  return (
    <CalendarAddContainer>
      <CalendarAddHeaderContainer>
        <BackButton />
        <CalendarSaveButtonContainer type="submit" onClick={handleSubmit}>
          저 장
        </CalendarSaveButtonContainer>
      </CalendarAddHeaderContainer>
      {!imageAvailable ? (
        <WarningModal
          setWarning={setImageAvailavble}
          text={'사진을 등록해 주세요.'}
        />
      ) : null}
      {!timeAvailable ? (
        <WarningModal
          setWarning={setTimeAvailable}
          text={'운동 시간을 입력해 주세요.'}
        />
      ) : null}
      <CalendarAddBodyContainer>
        <ImageUpload
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          imageData={imageData}
          setImageData={setImageData}
        />
        <InputDateContainer>
          <span>날짜 </span>
          <div>
            <ReactDatePicker
              className="date-picker"
              locale={ko}
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </InputDateContainer>
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
        <SwimTimeContainer>
          <span>수영 시간</span>
          <TimeDropDown {...swimTimeProps} />
        </SwimTimeContainer>
        <InputMemoContainer>
          <span>메모</span>
          <textarea value={memo} onChange={handleChangeMemo} />
        </InputMemoContainer>
      </CalendarAddBodyContainer>
    </CalendarAddContainer>
  );
};

export default CalendarAdd;
