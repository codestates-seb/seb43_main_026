import styled from 'styled-components';
import { SIZE, COLOR } from '../../style/theme';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useNavigate } from 'react-router';
import html2canvas from 'html2canvas';
import { useState, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

//아이콘
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdAddCircle,
} from 'react-icons/io';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { TbCapture } from 'react-icons/tb';
import axios from 'axios';

moment.locale('ko-KR');
const localizer = momentLocalizer(moment);

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

const CalendarBottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px;

  .cal-cap {
    height: 44px;
    width: 44px;
    border-radius: 50%;
    border: none;
    padding-top: 5px;
    background-color: ${COLOR.main_blue};
    text-align: center;
    color: #ffff;
    cursor: pointer;
  }

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
  const { date, setCalendarMonth, setCalendarYear } = props;

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
          출석률:<span>80%</span>
        </p>
        <p>
          <AiOutlineClockCircle size={16} />총 운동 :<span>20.5시간</span>
        </p>
      </CalendarInfoContainer>
    </ToolbarContainer>
  );
};

const MyCalendar = ({ loginUser }) => {
  const [calendarYear, setCalendarYear] = useState('');
  const [calendarMonth, setCalendarMonth] = useState('');
  const [calendarData, setCalendarData] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');

  const navigate = useNavigate();

  console.log(calendarYear, calendarMonth);
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
        console.log(res.data);
        setCalendarData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [calendarYear, calendarMonth]);
  useEffect(() => {
    console.log(calendarData);
  }, [calendarData]);

  const nav = useNavigate();
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
      console.log(clickedEvent.scheduleId);
    }
  };

  // 슬롯을 두 번 클릭해야 페이지 이동이 됨 -> useEffect로 해결
  useEffect(() => {
    navToDetail();
    if (!loginUser) {
      navigate('/login');
    }
  }, [selectedEventId]);

  //캡쳐
  const onCapture = () => {
    console.log('capture');
    const calMainElement = document.getElementById('calMain');
    html2canvas(calMainElement, {
      useCORS: true, // CORS 이슈 해결을 위해 사용
      allowTaint: true, // 외부 도메인 이미지 포함을 위해 사용
    }).then((canvas) => {
      document.body.appendChild(canvas);
      onSave(canvas.toDataURL(), 'calendar.png');
      document.body.removeChild(canvas);
    });
  };
  const onSave = (uri, filename) => {
    console.log('onSave');
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  };

  return (
    <MyCalendarContainer>
      <CalendarContainer>
        <div id="calMain">
          <Calendar
            localizer={localizer}
            views={['month']}
            events={calendarData.map((schedule) => ({
              title: '',
              start: new Date(schedule.date),
              end: new Date(schedule.date),
              url: schedule.imageAddress,
              id: schedule.scheduleId,
              tile: schedule.scheduleId,
            }))}
            components={{
              toolbar: (props) => (
                <Toolbar
                  {...props}
                  setCalendarMonth={setCalendarMonth}
                  setCalendarYear={setCalendarYear}
                />
              ),
            }}
            eventPropGetter={(event) => ({
              style: {
                backgroundImage: `url(${event.url})`, // 배경 이미지로 설정
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%',
              },
            })}
            onSelectEvent={(event) => handleSelectEvent(event)}
            onSelectSlot={(slotInfo) => handleSelectEvent(slotInfo)}
          />
        </div>
        <CalendarBottomContainer>
          <button className="cal-cap" onClick={onCapture}>
            <TbCapture size={33} />
          </button>
          <IoMdAddCircle className="cal-add-btn" size={50} onClick={navToAdd} />
        </CalendarBottomContainer>
      </CalendarContainer>
    </MyCalendarContainer>
  );
};

export default MyCalendar;
