import styled from 'styled-components';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
// 스타일링을 위해 import해야함
import 'react-big-calendar/lib/css/react-big-calendar.css';

const CalendarCon = styled.div`
  width: 100%;
  padding: 0 50px;
  margin-top: 100px;
  margin-bottom: 30px;
`;

// 캘린더 상단(툴바)
const Toolbar = (props) => {
  const { date } = props;

  const navigate = (action) => {
    props.onNavigate(action);
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={navigate.bind(null, 'TODAY')}>
          이번달
        </button>
        <button type="button" onClick={navigate.bind(null, 'PREV')}>
          이전
        </button>
        <span className="rbc-toolbar-label">{`${date.getFullYear()}년 ${
          date.getMonth() + 1
        }월`}</span>
        <button type="button" onClick={navigate.bind(null, 'NEXT')}>
          다음
        </button>
      </span>
    </div>
  );
};

const MyCalendar = () => {
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);
  return (
    <CalendarCon>
      <Calendar
        localizer={localizer}
        style={{ height: 600 }}
        views={['month']}
        components={{
          toolbar: Toolbar,
        }}
      />
    </CalendarCon>
  );
};

export default MyCalendar;
