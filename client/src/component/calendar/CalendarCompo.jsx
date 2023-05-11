/* eslint-disable import/named */
import styled from 'styled-components';
import { Calendar, momentLocalizer } from 'react-big-calendar';
// import { useState } from 'react';
import moment from 'moment';
// 스타일링을 위해 import해야함
import 'react-big-calendar/lib/css/react-big-calendar.css';
//아이콘
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdAddCircle,
} from 'react-icons/io';
import { BsArrowClockwise } from 'react-icons/bs';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { TbCapture } from 'react-icons/tb';
import { Link } from 'react-router-dom';

// toolbar styled-component
const ToolbarCon = styled.div`
  /* 모바일 기준 */
  @media ${(props) => props.theme.breakpoints.mobileMin} {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    /* 캘린더 이동 버튼 */
    .tool-btn-group {
      display: flex;
      flex-direction: row;
      > button {
        border: none;
        background-color: inherit;
        cursor: pointer;
      }
      .toolbar-label {
        font-size: 18px;
        padding-top: 5px;
        > span:first-child {
          margin-right: 12px;
        }
      }
    }
    /* 출석률 & 총 운동 시간 */
    .cal-info {
      display: flex;
      flex-direction: column;
      padding-top: 25px;
      > p {
        font-size: 14px;
        display: flex;
        align-items: center;
        :first-of-type {
          margin-bottom: 5px;
        }
        > span {
          margin-left: 10px;
        }
      }
    }
    background-color: ${(props) => props.theme.color.main_gray};
  }

  /* 태블릿 버전 */
  @media ${(props) => props.theme.breakpoints.tabletMin} {
    background-color: #ffff;
    height: 120px;
    display: flex;
    flex-direction: column;

    /* 캘린더 이동 버튼 */
    .tool-btn-group {
      padding-top: 20px;
      .toolbar-label {
        font-size: 26px;
        margin: 0 50px 10px;
      }
    }
    /* 출석률 & 총 운동 시간 */
    .cal-info {
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
  }

  /* pc버전 */
  /* @media ${(props) => props.theme.breakpoints.desktopMin} {
    background-color: ${(props) => props.theme.color.pc_bg};
  } */
`;

// calender styled-component
const CalendarCon = styled.div`
  /* 모바일 기준 */
  @media ${(props) => props.theme.breakpoints.mobileMin} {
    width: 100%;
    background-color: #fff;

    /* 캘린더 본체 */
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
    /* 캘린더 아래 버튼 */
    .cal-bottom {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 20px;
      /* 캡쳐 버튼 */
      .cal-cap {
        height: 44px;
        width: 44px;
        border-radius: 50%;
        border: none;
        padding-top: 5px;
        background-color: ${(props) => props.theme.color.main_blue};
        text-align: center;
        color: #ffff;
        cursor: pointer;
      }
      /* 캘린더 등록버튼 */
      .cal-add-btn {
        color: ${(props) => props.theme.color.main_blue};
        cursor: pointer;
      }
    }
    /* 캘린더 오늘 날짜 표시 */
    .rbc-today {
      background-color: ${(props) => props.theme.color.main_blue};
    }
    /* 캘린더 날짜 */
    .rbc-date-cell {
      text-align: center;
      padding-top: 5px;
    }
  }

  /* 태블릿 버전 */
  @media ${(props) => props.theme.breakpoints.tabletMin} {
    width: 100%;
    /* 캘린더 본체 */
    .rbc-month-view {
      margin-top: 20px;
      border: 1px solid #ddd;
    }
  }

  /* pc버전 */
  @media ${(props) => props.theme.breakpoints.desktopMin} {
    width: 60%;
    margin: 0 auto 40px;
    box-shadow: 0px 0px 4px 3px rgba(0, 0, 0, 0.1);
    /* 캘린더 본체 */
    .rbc-month-view {
      margin-top: 20px;
    }
    /* 캘린더 아래 버튼 */
    .cal-bottom {
      /* width: 70%; */
      margin: 10px auto;
    }
  }
`;
// 캘린더 상단(툴바)
const Toolbar = (props) => {
  const { date } = props;

  const navigate = (action) => {
    props.onNavigate(action);
  };

  return (
    <ToolbarCon>
      <span className="tool-btn-group">
        <button type="button" onClick={navigate.bind(null, 'TODAY')}>
          <BsArrowClockwise size={20} />
        </button>
        <button type="button" onClick={navigate.bind(null, 'PREV')}>
          <IoIosArrowBack size={30} />
        </button>
        <p className="toolbar-label">
          <span>{`${date.getFullYear()}년`}</span>
          <span>{`${date.getMonth() + 1}월`}</span>
        </p>
        <button type="button" onClick={navigate.bind(null, 'NEXT')}>
          <IoIosArrowForward size={30} />
        </button>
      </span>
      <section className="cal-info">
        <p>
          <MdOutlineCalendarMonth size={16} className="tool-icon" />
          출석률:<span>80%</span>
        </p>
        <p>
          <AiOutlineClockCircle size={16} className="tool-icon" />총 운동 시간:
          <span>20시간</span>
        </p>
      </section>
    </ToolbarCon>
  );
};

const CalendarCompo = () => {
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);
  // const [selectedDate, setSelectedDate] = useState(null);
  // 캘린더 날짜 데이터 형식 변경
  // const activeDate = moment(selectedDate).format('YYYY-MM-DD');
  // const handleSelectSlot = (slotInfo) => {
  //   // console.log('Selected date:', slotInfo);
  //   setSelectedDate(slotInfo.start);
  // };
  // console.log(activeDate);
  return (
    <CalendarCon>
      <Calendar
        id="calMain"
        className="cal-main"
        localizer={localizer}
        views={['month']}
        components={{
          toolbar: Toolbar,
        }}
        // selectable
        // onSelectSlot={handleSelectSlot}
      />
      <section className="cal-bottom">
        <button className="cal-cap">
          <TbCapture size={33} />
        </button>
        <Link to={'/calendar/add'}>
          <IoMdAddCircle className="cal-add-btn" size={50} />
        </Link>
      </section>
    </CalendarCon>
  );
};

export default CalendarCompo;
