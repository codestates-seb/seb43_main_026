import axios from 'axios';
import styled from 'styled-components';
import { COLOR } from '../../../style/theme';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

const CalendarDeleteModalContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 100;
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
`;

const DeleteModal = styled.div`
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  border: 2px solid ${COLOR.main_blue};
  border-radius: 10px;
  > p {
    font-size: 20px;
    font-weight: 600;
    margin-top: 30px;
  }
`;

const DeleteModalButtons = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  > button {
    border-radius: 20px;
    width: 80px;
    height: 40px;
    text-align: center;
    border: 1px solid ${COLOR.main_blue};
    background-color: #fff;
    font-size: 14px;
    font-weight: 600;
    color: ${COLOR.main_blue};
    :hover {
      border: 1px solid ${COLOR.main_blue_active};
      color: ${COLOR.main_blue_active};
    }
    :last-of-type {
      border: none;
      background-color: ${COLOR.main_blue};
      color: #fff;
      :hover {
        background-color: ${COLOR.main_blue_active};
      }
    }
  }
`;

const CalendarDeleteModal = ({ handleDeleteModal, scheduleId }) => {
  const nav = useNavigate();
  const [deleted, setDeleted] = useState(false);
  const handleSubmitDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/schedules/${scheduleId}`, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      })
      .then((res) => {
        console.log(res.data);
        setDeleted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (deleted) {
      nav('/calendar'); // 페이지 이동
    }
  }, [deleted, nav]);
  return (
    <CalendarDeleteModalContainer>
      <DeleteModal>
        <p>항목을 삭제하겠습니까?</p>
        <DeleteModalButtons>
          <button onClick={handleDeleteModal}>취소</button>
          <button onClick={handleSubmitDelete}>삭제</button>
        </DeleteModalButtons>
      </DeleteModal>
    </CalendarDeleteModalContainer>
  );
};

export default CalendarDeleteModal;
