import styled from 'styled-components';
import { SIZE } from '../../style/theme';

// styled-component
// dropdown
const DropdownContainer = styled.select`
  margin-left: 18px;
  width: 120px;
  height: 35px;
  max-height: 100px;
  cursor: pointer;
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 3px 5px 1px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 16px;
  ::-ms-expand {
    display: none;
  }
  @media screen and (min-width: ${SIZE.tablet}) {
    width: 200px;
  }
`;

const TimeDropDownContainer = styled.section`
  /* width: 60%; */
  display: flex;
  flex-direction: column;
  align-items: end;
  font-size: 18px;
  > div > section {
    display: flex;
    flex-direction: row;
    align-items: center;
    :last-of-type {
      margin-top: 15px;
    }
    > label {
      font-size: 15px;
      font-weight: 600;
    }
  }
  > p {
    width: 100%;
    font-size: 14px;
    color: red;
    margin-top: 10px;
  }
  /* 태블릿 버전 */
  @media screen and (min-width: ${SIZE.tablet}) {
    > div {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      margin-top: 30px;
      > section:last-of-type {
        margin-top: 0px;
      }
    }
    > p {
      width: 100%;
      text-align: center;
    }
  }
`;

// component
// dropdown
const Dropdown = ({ times, timeValue, setTimeValue }) => {
  return (
    <DropdownContainer
      value={timeValue}
      onChange={(e) => setTimeValue(e.target.value)}
    >
      <option value="">시간 선택 ⏰</option>
      {times.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </DropdownContainer>
  );
};

const TimeDropDown = ({ ...swimTimeProps }) => {
  // const [startTime, setStartTime] = useState('');
  // const [endTime, setEndTime] = useState('');
  const { startTime, setStartTime, endTime, setEndTime } = swimTimeProps;
  // 00시 부터 24시까지의 시간
  // 25개의 빈 배열을 만들어 안에 요소를 넣음
  const hours = [...Array(25).keys()].map((h) => {
    const hour = h < 10 ? `0${h}` : h;
    return `${hour}:00`;
  });

  const halfHours = [...Array(24).keys()].map((h) => {
    const hour = h < 10 ? `0${h}` : h;
    return `${hour}:30`;
  });

  const times = [...hours, ...halfHours].sort();

  // endTime이 startTime보다 큰지 확인
  const isEndTimeValid = () => {
    // 둘 중 하나가 선택되지 않은 경우
    if (!startTime || !endTime) return true;

    const start = parseInt(startTime.replace(':', ''));
    const end = parseInt(endTime.replace(':', ''));

    return end > start;
  };

  // 종료 시간이 더 빠를 경우 에러메세지 띄우기
  const getErrorMessage = () => {
    if (isEndTimeValid()) return '';

    return '종료는 시작보다 빠를 수 없습니다.';
  };

  // // 지속 시간 계산
  // const calculateDuration = () => {
  //   if (!startTime || !endTime) return 0;

  //   const startHour = parseInt(startTime.substring(0, 2));
  //   const startMinute = parseInt(startTime.substring(3));
  //   const endHour = parseInt(endTime.substring(0, 2));
  //   const endMinute = parseInt(endTime.substring(3));

  //   const startInMinutes = startHour * 60 + startMinute;
  //   const endInMinutes = endHour * 60 + endMinute;

  //   return (endInMinutes - startInMinutes) / 60;
  // };

  // useEffect(() => {
  //   const durationInMinutes = calculateDuration();
  //   setDurationTime(durationInMinutes);
  // }, [startTime, endTime]);

  return (
    <TimeDropDownContainer>
      <div>
        <section>
          <label htmlFor="startTime">시작</label>
          <Dropdown
            timeValue={startTime}
            setTimeValue={setStartTime}
            times={times}
          />
        </section>
        <section>
          <label htmlFor="endTime">종료</label>
          <Dropdown
            timeValue={endTime}
            setTimeValue={setEndTime}
            times={times}
          />
        </section>
      </div>
      <p>{getErrorMessage()}</p>
    </TimeDropDownContainer>
  );
};

export default TimeDropDown;
