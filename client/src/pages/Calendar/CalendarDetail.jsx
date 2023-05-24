import styled from 'styled-components';
import { SIZE, COLOR } from '../../style/theme';
import NavToDetail from '../../component/Calendar/NavButton';
import CalendarDeleteModal from '../../component/Calendar/CalendarDetailComponent/CalendarDeleteModal';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';
import { BsTrash3 } from 'react-icons/bs';

const CalendarDetailContainer = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 30px;
`;

const CalendarDetailHeaderContainer = styled.header`
  width: 100%;
  height: 48px;
  background-color: ${COLOR.main_gray};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px 0 10px;
  margin-bottom: 30px;

  > p {
    font-size: 20px;
    margin-left: 10px;
    color: ${COLOR.main_dark_blue};
    font-weight: 600;
  }
  @media screen and (min-width: ${SIZE.tablet}) {
  }
`;

const CalendarDetailButtons = styled.div`
  margin-left: auto;
  > :first-child {
    margin-right: 20px;
    cursor: pointer;
  }
  > :last-child {
    cursor: pointer;
  }
`;

const CalendarDetailBodyContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  > img {
    width: 300px;
    height: 300px;
    margin-bottom: 40px;
  }
`;

const CalendarDetailInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${SIZE.tablet}) {
    padding: 0px 30px;
  }
  > p {
    padding-left: 10px;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  > textarea {
    width: 90%;
    min-height: 120px;
    background-color: ${COLOR.bg_light_blue};
    border-radius: 10px;
    padding: 20px 10px 10px 10px;
    margin-left: 14px;
    font-size: 18px;

    :focus {
      outline: none;
    }
    @media screen and (min-width: ${SIZE.tablet}) {
      margin-left: 30px;
    }
  }
`;

const CalendarInfoGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  padding: 0px 10px 10px 10px;
  border-bottom: 1px solid ${COLOR.main_blue};
  margin-bottom: 40px;
  > span {
    font-size: 20px;
    font-weight: 400;
  }
  @media screen and (min-width: ${SIZE.tablet}) {
    width: 100%;
    justify-content: start;
    > p {
      width: 100px;
      margin-right: 30%;
    }
    > span {
      min-width: 200px;
      text-align: center;
    }
  }
`;

const CalendarDetail = () => {
  const nav = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { scheduleid } = useParams();
  const [calendarData, setCalendarData] = useState({});

  const handleDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const navToEdit = () => {
    nav(`/calendar/${calendarData.scheduleId}/edit`);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/schedules/${scheduleid}`, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      })
      .then((res) => {
        setCalendarData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [scheduleid]);

  return (
    <CalendarDetailContainer>
      <CalendarDetailHeaderContainer>
        <NavToDetail />
        <p>{calendarData.date}</p>
        <CalendarDetailButtons>
          <FaRegEdit size={20} onClick={navToEdit} />
          <BsTrash3 size={20} color="red" onClick={handleDeleteModal} />
        </CalendarDetailButtons>
      </CalendarDetailHeaderContainer>
      <CalendarDetailBodyContainer>
        <img src={calendarData.imageAddress} alt="이미지 자리" />
        <CalendarDetailInfoContainer>
          <CalendarInfoGroup>
            <p>장소</p> <span>{calendarData.location}</span>
          </CalendarInfoGroup>
          <CalendarInfoGroup>
            <p>운동 시간</p> <span>{calendarData.durationTime} 시간</span>
          </CalendarInfoGroup>
          <p>메모</p>
          <textarea value={calendarData.memo} readOnly></textarea>
        </CalendarDetailInfoContainer>
      </CalendarDetailBodyContainer>
      {openDeleteModal ? (
        <CalendarDeleteModal
          handleDeleteModal={handleDeleteModal}
          scheduleId={calendarData.scheduleId}
        />
      ) : null}
    </CalendarDetailContainer>
  );
};

export default CalendarDetail;
