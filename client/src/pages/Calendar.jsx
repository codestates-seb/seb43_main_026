import styled from 'styled-components';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
// 스타일링을 위해 import해야함
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdAddCircle,
} from 'react-icons/io';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { BsArrowClockwise } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { TbCapture } from 'react-icons/tb';

const CalendarCon = styled.div`
  min-width: 360px;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* 캘린더 아래 버튼 */
  .cal-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    /* 캡쳐 버튼 */
    .cal-cap {
      height: 44px;
      width: 44px;
      border-radius: 50%;
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
  /* 태블릿 버전 768px-1023px*/
  @media ${(props) => props.theme.breakpoints.tabletMax} {
    height: 100vh;
    .cal-main {
      height: 1000px;
    }
    .cal-bottom {
      padding: 30px 40px;
    }
  }
  /* 모바일(기본)버전  360px-767px*/
  @media ${(props) => props.theme.breakpoints.mobileMax} {
    height: 100%;
    margin-top: 0px;
    .cal-main {
      height: 800px;
    }
    .rbc-month-view {
      border-top: none;
      padding: 0px;
    }
    .cal-bottom {
      padding: 10px 14px;
    }
  }
`;

// toolbar styled-component
const ToolbarCon = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
  /* 캘린더 상단 캘린더 이동 */
  .cal-btn-group {
    display: flex;
    flex-direction: row;
    .cal-btn {
      border: none;
      background-color: inherit;
      cursor: pointer;
    }
  }
  .tool-icon {
    padding-top: 3px;
    margin-right: 5px;
  }
  /* 태블릿 버전 */
  @media ${(props) => props.theme.breakpoints.tabletMax} {
    height: 80px;
    .cal-btn-group {
      margin-bottom: 30px;
      .toolbar-label {
        font-size: 20px;
        padding-top: 5px;
        > span:first-child {
          margin-right: 10px;
        }
      }
    }
    .cal-info {
      margin-top: 30px;
      display: flex;
      flex-direction: row;
      > p {
        display: flex;
        align-items: center;
        :first-child {
          margin-right: 10px;
        }
      }
    }
  }
  /* 모바일(기본)버전 */
  @media ${(props) => props.theme.breakpoints.mobileMax} {
    height: 100px;
    margin-bottom: 50px;
    background-color: ${(props) => props.theme.color.main_gray};
    .cal-btn-group {
      margin: 0;
      .toolbar-label {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 10px;
        > span {
          font-size: 20px;
          font-weight: 500;
          :first-of-type {
            margin-bottom: 5px;
          }
        }
      }
    }
    /* 캘린더 상단 출석률, 운동 시간 표시  */
    .cal-info {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      > p {
        display: flex;
        align-items: center;
        :first-of-type {
          margin-bottom: 5px;
        }
      }
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
      <span className="cal-btn-group">
        <button
          className="cal-btn"
          type="button"
          onClick={navigate.bind(null, 'TODAY')}
        >
          <BsArrowClockwise size={25} />
        </button>
        <button
          className="cal-btn"
          type="button"
          onClick={navigate.bind(null, 'PREV')}
        >
          <IoIosArrowBack size={30} />
        </button>
        <p className="toolbar-label">
          <span>{`${date.getFullYear()}년`}</span>
          <span>{`${date.getMonth() + 1}월`}</span>
        </p>
        <button
          className="cal-btn"
          type="button"
          onClick={navigate.bind(null, 'NEXT')}
        >
          <IoIosArrowForward size={30} />
        </button>
      </span>
      <section className="cal-info">
        <p>
          <MdOutlineCalendarMonth size={20} className="tool-icon" />
          <span>80%</span>
        </p>
        <p>
          <AiOutlineClockCircle size={20} className="tool-icon" />
          <span>20시간</span>
        </p>
      </section>
    </ToolbarCon>
  );
};

const MyCalendar = () => {
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);
  return (
    <CalendarCon>
      <Calendar
        className="cal-main"
        localizer={localizer}
        views={['month']}
        components={{
          toolbar: Toolbar,
        }}
      />
      <section className="cal-bottom">
        <div className="cal-cap">
          <TbCapture size={33} />
        </div>
        <IoMdAddCircle className="cal-add-btn" size={50} />
      </section>
    </CalendarCon>
  );
};

export default MyCalendar;
