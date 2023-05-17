/* eslint-disable import/named */
// 모듈
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Link } from 'react-router-dom';
// 스타일링
import styled from 'styled-components';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { SIZE, COLOR } from '../../style/theme';
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

// import axios from 'axios';

// styled-component
// 툴바 버튼 그룹
const ToolbarButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  > button {
    border: none;
    background-color: inherit;
    cursor: pointer;
  }
  > p {
    font-size: 16px;
    font-weight: 600;
    padding-top: 5px;
    > span:first-child {
      margin-right: 12px;
    }
  }
  @media screen and (min-width: ${SIZE.tablet}) {
    padding-top: 20px;
    > p {
      font-size: 26px;
      margin: 0 50px 10px;
    }
  }
`;

// 캘린더 정보
const CalendarInfoContainer = styled.section`
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
  /* 태블릿 버전 */
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

// 툴바
const ToolbarContainer = styled.div`
  /* 모바일 기준 */
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: ${COLOR.main_gray};

  /* 태블릿 버전 */
  @media screen and (min-width: ${SIZE.tablet}) {
    background-color: #ffff;
    height: 120px;
    display: flex;
    flex-direction: column;
  }
`;

// 캘린더 하단
const CalendarBottomContainer = styled.div`
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
    background-color: ${COLOR.main_blue};
    text-align: center;
    color: #ffff;
    cursor: pointer;
  }
  /* 캘린더 등록버튼 */
  .cal-add-btn {
    color: ${COLOR.main_blue};
    cursor: pointer;
  }
  /* pc버전 */
  @media screen and (min-width: ${SIZE.desktop}) {
    margin: 10px 40px;
  }
`;

// 캘린더
const CalendarContainer = styled.div`
  /* 모바일 기준 */
  width: 100%;
  background-color: #fff;
  /* 캘린더 본체 */
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

    /* 캘린더 오늘 날짜 표시 */
    .rbc-today {
      background-color: ${COLOR.main_blue};
    }
    /* 캘린더 날짜 */
    .rbc-date-cell {
      text-align: center;
      padding-top: 5px;
    }
  }

  /* 태블릿 버전 */
  @media screen and (min-width: ${SIZE.tablet}) {
    width: 100%;
    /* 캘린더 본체 */
    .rbc-calendar {
      padding: 0 40px;
      height: 900px;
      .rbc-month-view {
        margin-top: 20px;
        border: 1px solid #ddd;
      }
    }
  }

  /* pc버전 */
  @media screen and (min-width: ${SIZE.desktop}) {
    width: 60%;
    margin: 0 auto 40px;
    box-shadow: 0px 0px 4px 3px rgba(0, 0, 0, 0.1);
    /* 캘린더 본체 */
    .rbc-month-view {
      margin-top: 20px;
    }
  }
`;

// component
// 툴바 버튼
const ToolbarButtons = ({ props }) => {
  const { date } = props;

  const navigate = (action) => {
    props.onNavigate(action);
  };
  return (
    <ToolbarButtonsContainer>
      <button type="button" onClick={navigate.bind(null, 'TODAY')}>
        <BsArrowClockwise size={20} />
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
  );
};

// 캘린더 정보
const CalendarInfo = () => {
  return (
    <CalendarInfoContainer>
      <p>
        <MdOutlineCalendarMonth size={16} />
        출석률:<span>80%</span>
      </p>
      <p>
        <AiOutlineClockCircle size={16} />총 운동 시간:
        <span>20시간</span>
      </p>
    </CalendarInfoContainer>
  );
};
// 캘린더 툴바
const Toolbar = (props) => {
  return (
    <ToolbarContainer>
      <ToolbarButtons props={props} />
      <CalendarInfo />
    </ToolbarContainer>
  );
};

// 캘린더 하단
const CalendarBottom = () => {
  return (
    <CalendarBottomContainer>
      {' '}
      <button className="cal-cap">
        <TbCapture size={33} />
      </button>
      <Link to={'/calendar/add'}>
        <IoMdAddCircle className="cal-add-btn" size={50} />
      </Link>
    </CalendarBottomContainer>
  );
};

// 이벤트 커스텀
// const CustomEvent = ({ event }) => {
//   const imageUrl = useSelector((state) => state.image.imageUrl);

//   return <div style={{ backgroundImage: `url(${imageUrl})` }}></div>;
// };

// 캘린더
const CalendarComponent = () => {
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);
  // useEffect(()=>{
  //   axios
  //   .get(`${process.env.REACT_APP_API_URL}`)
  // })
  return (
    <CalendarContainer>
      <Calendar
        id="calMain"
        localizer={localizer}
        views={['month']}
        components={{
          toolbar: Toolbar,
          event: CustomEvent,
        }}
        tileContent={({ activeStartDate, date, view }) => {
          return view === 'month' && date.getDay() === 0 ? (
            <p
              onMouseEnter={
                //do whatever you want
                console.log('activeStartDate')
              }
            >
              {activeStartDate}
            </p>
          ) : null;
        }}
      />
      <CalendarBottom></CalendarBottom>
    </CalendarContainer>
  );
};

export default CalendarComponent;
