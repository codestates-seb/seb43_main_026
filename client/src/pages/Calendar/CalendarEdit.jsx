import styled from 'styled-components';
import ImageUpload from '../../component/common/ImageUpload';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';
import { ko } from 'date-fns/esm/locale';
import { COLOR, SIZE } from '../../style/theme';
import SearchPlace from '../../component/Calendar/SearchPlace';
import TimeDropDown from '../../component/Calendar/TimeDropDown';
import BackButton from '../../component/common/BackButton';
import { format } from 'date-fns';
import { useParams } from 'react-router';
import axios from 'axios';

// styled-component
const CalendarEditContainer = styled.main`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px auto 30px;
`;

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
  @media screen and (min-width: ${SIZE.tablet}) {
    font-size: 20px;
  }
`;

const EditDateContainer = styled.div`
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

const EditPlaceContainer = styled.div`
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

const EditSwimTimeContainer = styled.div`
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

const EditMemoContainer = styled.div`
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
// 바디
const CalendarEditBody = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: ${SIZE.tablet}) {
    width: 90%;
  }
`;

const CalendarEdit = () => {
  const [editImageUrl, setEditImageUrl] = useState(null);
  const [editSelectedDate, setEditSelectedDate] = useState(new Date());
  const [editPlace, setEditPlace] = useState('');
  const [editStartTime, setEditStartTime] = useState('');
  const [editEndTime, setEditEndTime] = useState('');
  const [editDurationTime, setEditDurationTime] = useState('');
  const [editMemo, setEditMemo] = useState('');
  const formattedDate = format(editSelectedDate, 'yyyy-MM-dd');
  console.log(formattedDate);

  // const navigate = useNavigate();
  const { scheduleId } = useParams();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/schedules/${scheduleId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // 장소 검색
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const handleSearchModal = () => {
    setOpenSearchModal(!openSearchModal);
  };
  const swimTimeProps = {
    sterTime: editStartTime,
    setStartTime: setEditStartTime,
    endTime: editEndTime,
    setEndTime: setEditEndTime,
  };

  // 지속시간 계산
  const calculateDuration = () => {
    if (!editStartTime || !editEndTime) return 0;

    const startHour = parseInt(editStartTime.substring(0, 2));
    const startMinute = parseInt(editStartTime.substring(3));
    const endHour = parseInt(editEndTime.substring(0, 2));
    const endMinute = parseInt(editEndTime.substring(3));

    const startInMinutes = startHour * 60 + startMinute;
    const endInMinutes = endHour * 60 + endMinute;

    return (endInMinutes - startInMinutes) / 60;
  };

  useEffect(() => {
    const durationInMinutes = calculateDuration();
    setEditDurationTime(durationInMinutes);
    console.log(editDurationTime);
  }, [editStartTime, editEndTime]);

  return (
    <CalendarEditContainer>
      <CalendarEditHeader>
        <BackButton />
        <CalendarSaveEditContainer>저장</CalendarSaveEditContainer>
      </CalendarEditHeader>
      <CalendarEditBody>
        <ImageUpload imageUrl={editImageUrl} setImageUrl={setEditImageUrl} />

        <EditDateContainer>
          <span>날짜 </span>
          <div>
            <DatePicker
              className="date-picker"
              locale={ko}
              selected={editSelectedDate}
              onChange={(date) => setEditSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </EditDateContainer>
        <EditPlaceContainer>
          <span>장소 </span>
          <input
            type="read-only"
            onClick={handleSearchModal}
            placeholder="장소를 넣어주세요"
            defaultValue={editPlace}
          />
          {openSearchModal ? (
            <SearchPlace
              handleSearchModal={handleSearchModal}
              place={editPlace}
              setPlace={setEditPlace}
            />
          ) : null}
        </EditPlaceContainer>
        <EditSwimTimeContainer>
          <span>수영 시간</span>
          <TimeDropDown {...swimTimeProps} />
        </EditSwimTimeContainer>
        <EditMemoContainer>
          <span>메모</span>
          <textarea
            value={editMemo}
            onChange={(e) => setEditMemo(e.target.value)}
          />
        </EditMemoContainer>
      </CalendarEditBody>
    </CalendarEditContainer>
  );
};

export default CalendarEdit;
