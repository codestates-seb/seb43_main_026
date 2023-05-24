import styled from 'styled-components';
import { SIZE } from '../../style/theme';
import { useState } from 'react';

const DropdownContainer = styled.ul`
  position: relative;
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
  > button {
    width: inherit;
    height: inherit;
    background-color: inherit;
    border: none;
    font-size: 16px;
  }
  @media screen and (min-width: ${SIZE.tablet}) {
    width: 200px;
    > button {
      font-size: 18px;
    }
  }
`;

const DropdownItem = styled.div`
  z-index: 10;
  top: 28px;
  position: absolute;
  width: inherit;
  height: 120px;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  background-color: #fff;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 10px 10px;
  > button {
    width: inherit;
    height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: inherit;
    border: none;
    padding-top: 10px;
    font-size: 16px;
  }
`;

const TimeDropDownContainer = styled.section`
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

  @media screen and (min-width: ${SIZE.tablet}) {
    > div {
      width: 80%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 30px 30px 0 0;
      > section {
        :last-of-type {
          margin-top: 0px;
        }
        > label {
          font-size: 18px;
          font-weight: 600;
        }
      }
    }
    > p {
      width: 100%;
      text-align: center;
      font-size: 18px;
    }
  }
`;

const Dropdown = ({ times, timeValue, setTimeValue }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdown = (e) => {
    setTimeValue(e.target.value);
    setShowDropdown(!showDropdown);
  };
  return (
    <DropdownContainer
      value={timeValue}
      onChange={(e) => setTimeValue(e.target.value)}
    >
      <button type="button" value="" onClick={handleDropdown}>
        {timeValue ? timeValue : '시간 선택 ⏰'}
      </button>
      {showDropdown ? (
        <DropdownItem>
          {times.map((time) => (
            <button
              key={time}
              value={time}
              type="button"
              onClick={handleDropdown}
            >
              {time}
            </button>
          ))}
        </DropdownItem>
      ) : null}
    </DropdownContainer>
  );
};

const TimeDropDown = ({ ...swimTimeProps }) => {
  const { startTime, setStartTime, endTime, setEndTime } = swimTimeProps;

  // 00시 부터 24시까지의 시간
  // 25개의 빈 배열을 만들어 안에 요소를 넣음
  const hours = [...Array(25).keys()].map((h) => {
    const hour = h < 10 ? `0${h}` : h;
    return `${hour}:00:00`;
  });

  const halfHours = [...Array(24).keys()].map((h) => {
    const hour = h < 10 ? `0${h}` : h;
    return `${hour}:30:00`;
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
