import styled from 'styled-components';
import ImageUpload from '../../component/common/ImageUpload';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';
// import { ko } from 'date-fns/esm/locale';
import { COLOR, SIZE } from '../../style/theme';
import SearchPlace from '../../component/Calendar/SearchPlace';
import TimeDropDown from '../../component/Calendar/TimeDropDown';
import NavToDetail from '../../component/Calendar/NavButton';
// import { format } from 'date-fns';
import { useParams } from 'react-router';
import axios from 'axios';
import { DoneEditModal } from '../../component/Calendar/DonePostModal';
import { WarningToast } from '../../component/common/WarningToast';

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
  letter-spacing: 2px;
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
  > p {
    font-size: 20px;
    font-weight: 600;
  }
  @media screen and (min-width: ${SIZE.tablet}) {
    > span {
      font-size: 20px;
      margin-right: 30px;
    }
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
  @media screen and (min-width: ${SIZE.tablet}) {
    > span {
      font-size: 20px;
      margin-right: 30px;
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
    > span {
      font-size: 20px;
    }
  }
`;

const EditMemoContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 30px;
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
    padding: 10px 20px;
    font-size: 16px;
    :focus {
      outline: 2px solid ${COLOR.main_blue};
    }
  }
  @media screen and (min-width: ${SIZE.tablet}) {
    > span {
      font-size: 20px;
    }
    > textarea {
      margin-right: 0px;
      padding: 20px 20px 10px;
      font-size: 18px;
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
  const { scheduleid } = useParams();
  const [scheduleId, setScheduleId] = useState('');
  const [editImageUrl, setEditImageUrl] = useState(null);
  const [editImageData, setEditImageData] = useState(new FormData());
  const [editSelectedDate, setEditSelectedDate] = useState('');
  const [editPlace, setEditPlace] = useState('');
  const [editStartTime, setEditStartTime] = useState('');
  const [editEndTime, setEditEndTime] = useState('');
  const [editDurationTime, setEditDurationTime] = useState('');
  const [editMemo, setEditMemo] = useState('');
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const swimTimeProps = {
    startTime: editStartTime,
    setStartTime: setEditStartTime,
    endTime: editEndTime,
    setEndTime: setEditEndTime,
  };

  const [visible, setVisible] = useState(false);
  const [timeAvailable, setTimeAvailable] = useState(true);
  const [doneEdit, setDoneEdit] = useState(false);

  const handleSearchModal = () => {
    setOpenSearchModal(!openSearchModal);
  };

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
    axios
      .get(`${process.env.REACT_APP_API_URL}/schedules/${scheduleid}`, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      })
      .then((res) => {
        setScheduleId(res.data.scheduleId);
        setEditImageUrl(res.data.imageAddress);
        setEditSelectedDate(res.data.date);
        setEditPlace(res.data.location);
        setEditStartTime(res.data.startTime);
        setEditEndTime(res.data.endTime);
        setEditMemo(res.data.memo);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [scheduleid]);

  useEffect(() => {
    const durationInMinutes = calculateDuration();
    setEditDurationTime(durationInMinutes);
  }, [editStartTime, editEndTime]);

  const handleEdit = async () => {
    if (!editDurationTime || editDurationTime <= 0) {
      setTimeAvailable(false);
      setVisible(true);
      return;
    }
    const editScheduleData = {
      date: editSelectedDate,
      startTime: editStartTime,
      endTime: editEndTime,
      durationTime: editDurationTime,
      location: editPlace,
      memo: editMemo,
    };

    try {
      const formData = new FormData();
      const json = JSON.stringify(editScheduleData);
      const blob = new Blob([json], { type: 'application/json' });
      formData.append('schedule', blob);
      formData.append('schedule', JSON.stringify(editScheduleData));
      formData.append('image', editImageData.get('image'));

      await axios.patch(
        `${process.env.REACT_APP_API_URL}/schedules/${scheduleId}`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem('accessToken'),
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setDoneEdit(true);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <CalendarEditContainer>
      <CalendarEditHeader>
        <NavToDetail scheduleId={scheduleId} />
        <CalendarSaveEditContainer onClick={handleEdit}>
          저장
        </CalendarSaveEditContainer>
      </CalendarEditHeader>
      {!timeAvailable ? (
        <WarningToast
          setWarning={setVisible}
          text={'운동 시간을 입력해 주세요.'}
          visible={visible}
        />
      ) : null}
      {doneEdit ? (
        <DoneEditModal
          setDonePost={setDoneEdit}
          text={'수정 완료!'}
          scheduleId={scheduleid}
        />
      ) : null}
      <CalendarEditBody>
        <ImageUpload
          imageUrl={editImageUrl}
          setImageUrl={setEditImageUrl}
          imageData={editImageData}
          setImageData={setEditImageData}
        />

        <EditDateContainer>
          <span>날짜 </span>
          <p>{editSelectedDate}</p>
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
