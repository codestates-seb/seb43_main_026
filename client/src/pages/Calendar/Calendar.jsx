import styled from 'styled-components';
import { SIZE, COLOR } from '../../style/theme';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import html2canvas from 'html2canvas';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
//아이콘
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdAddCircle,
} from 'react-icons/io';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { TbCapture } from 'react-icons/tb';
import { WarningToast } from '../../component/common/WarningToast';

moment.locale('ko-KR');
const localizer = momentLocalizer(moment);

const calenderStyle = {
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundColor: '#fff',
  width: '100%',
  height: '100%',
  padding: '0px',
};

// styled-component
const ToolbarButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;

  > button {
    border: none;
    background-color: inherit;
    cursor: pointer;
    :first-of-type > p {
      font-weight: 700;
    }
  }
  > p {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    > span:first-of-type {
      margin-bottom: 5px;
    }
  }
  @media screen and (min-width: ${SIZE.tablet}) {
    padding-top: 20px;
    margin: 0 auto;
    > button:first-of-type {
      > p {
        font-size: 18px;
        font-weight: 700;
      }
    }
    > p {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: 26px;
      padding-top: 5px;
      margin: 0 80px 10px;
      > span:first-of-type {
        margin-right: 12px;
        margin-bottom: 0px;
      }
    }
  }

  @media screen and (min-width: ${SIZE.desktop}) {
    > p {
      margin: 0px 40px 10px;
    }
  }
`;

const CalendarInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  > p {
    font-size: 12px;
    display: flex;
    align-items: center;
    :first-of-type {
      margin-bottom: 5px;
    }
    > span {
      margin-left: 10px;
    }
  }

  @media screen and (min-width: ${SIZE.tablet}) {
    width: 100%;
    padding-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    > p {
      font-size: 16px;
      :first-of-type {
        margin-bottom: 0;
        margin-right: 20px;
      }
    }
  }
`;

const ToolbarContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
  background-color: ${COLOR.main_gray};

  @media screen and (min-width: ${SIZE.tablet}) {
    background-color: #ffff;
    height: 120px;
    display: flex;
    flex-direction: column;
  }
`;

const CaptureButton = styled.button`
  height: 44px;
  width: 44px;
  border-radius: 50%;
  border: none;
  padding-top: 4px;
  padding-left: 4.5px;
  background-color: ${COLOR.main_blue};
  text-align: center;
  color: #ffff;
  cursor: pointer;
`;

const CalendarBottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px;

  .cal-add-btn {
    color: ${COLOR.main_blue};
    cursor: pointer;
  }

  @media screen and (min-width: ${SIZE.desktop}) {
    margin: 10px 40px;
  }
`;

const CalendarContainer = styled.div`
  width: 100%;
  background-color: #fff;
  > div {
    padding-bottom: 20px;
  }
  .rbc-calendar {
    height: 650px;
    .rbc-month-view {
      margin-top: 10px;
      border-top: none;
      .rbc-header {
        padding: 10px 0px;
      }
      .rbc-day-bg {
        cursor: pointer;
      }
    }

    .rbc-today {
      background-color: ${COLOR.main_blue};
    }

    .rbc-date-cell {
      text-align: center;
      padding-top: 5px;
    }
  }
  .rbc-row-segment {
    min-height: 80px;
    padding: 0 1.2px 0 1.2px;
  }
  @media screen and (min-width: ${SIZE.tablet}) {
    width: 100%;

    .rbc-calendar {
      padding: 0 40px;
      height: 900px;
      .rbc-month-view {
        margin-top: 20px;
        border: 1px solid #ddd;
      }
    }
    .rbc-row-segment {
      min-height: 120px;
    }
  }

  @media screen and (min-width: ${SIZE.desktop}) {
    width: 60%;
    margin: 0 auto 40px;
    box-shadow: 0px 0px 4px 3px rgba(0, 0, 0, 0.1);

    .rbc-month-view {
      margin-top: 20px;
    }
  }
`;

const MyCalendarContainer = styled.div`
  background-color: #fff;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 0px;

  @media screen and(min-width: ${SIZE.tablet}) {
    background-color: #fff;
    .cal-bottom {
      padding: 30px 50px;
    }
  }

  @media screen and (max-width: ${SIZE.desktop}) {
    background-color: ${COLOR.pc_bg};
  }
`;

const Toolbar = (props) => {
  const {
    date,
    setCalendarYear,
    setCalendarMonth,
    totalDuration,
    attendanceRate,
  } = props;

  useEffect(() => {
    setCalendarMonth(date.getMonth() + 1);
    setCalendarYear(date.getFullYear());
  }, [date]);

  const navigate = (action) => {
    props.onNavigate(action);
  };

  return (
    <ToolbarContainer>
      <ToolbarButtonsContainer>
        <button type="button" onClick={navigate.bind(null, 'TODAY')}>
          <p>TODAY</p>
        </button>
        <button type="button" onClick={navigate.bind(null, 'PREV')}>
          <IoIosArrowBack size={30} />
        </button>
        <p>
          <span>{`${date.getFullYear()}년`}</span>
          <span>{`${date.getMonth() + 1}월`}</span>
        </p>
        <button type="button" onClick={navigate.bind(null, 'NEXT')}>
          <IoIosArrowForward size={30} />
        </button>
      </ToolbarButtonsContainer>
      <CalendarInfoContainer>
        <p>
          <MdOutlineCalendarMonth size={16} />
          출석률:<span>{attendanceRate}</span>
        </p>
        <p>
          <AiOutlineClockCircle size={16} />총 운동 :
          <span>{totalDuration} 시간</span>
        </p>
      </CalendarInfoContainer>
    </ToolbarContainer>
  );
};

const MyCalendar = ({ loginUser, isLoginSuccess, setIsLoginSuccess }) => {
  const nav = useNavigate();
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth() + 1);
  const [calendarData, setCalendarData] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [visible, setVisible] = useState(isLoginSuccess);
  const [message, setMessage] = useState('');

  const totalDuration = calendarData.reduce((total, el) => {
    return total + el.durationTime;
  }, 0);

  const calculateAttendanceRate = () => {
    const totalDaysInMonth = new Date(calendarYear, calendarMonth, 0).getDate();
    const totalEvents = calendarData.length;

    if (totalDaysInMonth === 0) {
      return 0;
    }

    const attendanceRate = (totalEvents / totalDaysInMonth) * 100;
    return attendanceRate.toFixed(0) + '%';
  };
  const attendanceRate = calculateAttendanceRate();

  const events = useMemo(
    () =>
      calendarData.map((schedule) => ({
        title: '',
        start: new Date(schedule.date),
        end: new Date(schedule.date),
        url: schedule.imageAddress,
        id: schedule.scheduleId,
      })),
    [calendarData]
  );

  const navToDetail = () => {
    if (selectedEventId) {
      nav(`/calendar/${selectedEventId}`);
    }
  };
  const navToAdd = () => {
    nav('/calendar/add');
  };

  const handleSelectEvent = (event) => {
    const clickedEvent = calendarData.find(
      (schedule) => schedule.scheduleId === event.id
    );
    if (clickedEvent) {
      setSelectedEventId(clickedEvent.scheduleId);
      navToDetail();
    }
  };

  const onCapture = async () => {
    const calMainElement = document.getElementById('calMain');
    const images = calMainElement.getElementsByTagName('img');

    // 이미지 로드를 기다리기 위한 Promise 배열 생성
    const imagePromises = Array.from(images).map((image) => {
      return new Promise((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject();
      });
    });

    try {
      // 이미지 로딩이 완료될 때까지 기다림
      await Promise.all(imagePromises);
      // 이미지 로딩이 완료된 후에 캡처 수행
      const canvas = await html2canvas(calMainElement, {
        useCORS: true, // CORS 에러 우회
        allowTaint: true,
      });
      // 캡처된 이미지 처리
      document.body.appendChild(canvas);
      await onSave(canvas.toDataURL(), 'calendar_capture.png');
      document.body.removeChild(canvas);
    } catch (error) {
      console.error('Image loading error:', error);
    }
  };

  const onSave = (uri, filename) => {
    return new Promise((resolve) => {
      const link = document.createElement('a');
      document.body.appendChild(link);
      link.href = uri;
      link.download = filename;
      link.click();
      document.body.removeChild(link);

      resolve();
    });
  };

  useEffect(() => {
    if (!loginUser) {
      nav('/login');
    }
  }, []);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/schedules?year=${calendarYear}&month=${calendarMonth}`,
        {
          headers: {
            Authorization: `${localStorage.getItem('accessToken')}`,
          },
        }
      )
      .then((res) => {
        setCalendarData(res.data);
      })
      .catch(async (err) => console.log(err));
  }, [calendarYear, calendarMonth]);

  useEffect(() => {
    navToDetail();
  }, [selectedEventId]);

  useEffect(() => {
    if (isLoginSuccess) {
      setVisible(true);
      setMessage('로그인에 성공하였습니다.');
      setIsLoginSuccess(false);
    }
  }, [isLoginSuccess]);

  return (
    <>
      {visible ? (
        <WarningToast
          text={message}
          setWarning={setVisible}
          visible={visible}
        />
      ) : null}
      <MyCalendarContainer>
        <CalendarContainer>
          <div id="calMain">
            <Calendar
              localizer={localizer}
              views={['month']}
              events={events}
              components={{
                toolbar: (props) => (
                  <Toolbar
                    {...props}
                    setCalendarMonth={setCalendarMonth}
                    setCalendarYear={setCalendarYear}
                    totalDuration={totalDuration}
                    attendanceRate={attendanceRate}
                  />
                ),
              }}
              eventPropGetter={(event) => ({
                style: {
                  ...calenderStyle,
                  backgroundImage: `url(${event.url})`,
                },
              })}
              onSelectEvent={(event) => handleSelectEvent(event)}
              // onSelectSlot={(slotInfo) => handleSelectEvent(slotInfo)}
            />
          </div>
          <CalendarBottomContainer>
            <CaptureButton onClick={onCapture}>
              <TbCapture size={33} />
            </CaptureButton>
            <IoMdAddCircle
              className="cal-add-btn"
              size={50}
              onClick={navToAdd}
            />
          </CalendarBottomContainer>
        </CalendarContainer>
      </MyCalendarContainer>
    </>
  );
};

export default MyCalendar;
