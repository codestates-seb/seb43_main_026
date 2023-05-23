import styled from 'styled-components';
import { forwardRef } from 'react';
import { useNavigate } from 'react-router';

import { COLOR } from '../../style/theme';

import { BiBell } from 'react-icons/bi';

const Container = styled.section`
  z-index: 999;
  position: absolute;
  top: 300px;
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 195px;
  border-radius: 10px;
  justify-content: space-around;
  align-items: center;
  background-color: ${COLOR.bg};
  padding: 13px 10px;
  box-shadow: 0 0 20px 4px ${COLOR.bg_comment};
`;

//메세지
const Alert = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2px 0 5px;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  span {
    margin-bottom: 3px;
  }
`;

const Period = styled.span`
  margin-top: 7px;
  font-size: 14px;
  color: ${COLOR.main_dark_blue};
`;

//이동 버튼
const Buttons = styled.article`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  button {
    width: 125px;
    height: 35px;
    margin: 3px 5px;
    border-radius: 5px;
  }
`;

const Share = styled.button`
  border: none;
  background-color: ${COLOR.main_blue};
  color: white;
  font-weight: 500;

  &:hover {
    background-color: ${COLOR.main_blue_hover};
  }
  &:active {
    background-color: ${COLOR.main_blue_active};
  }
`;

const NotShare = styled.button`
  border: 2px solid ${COLOR.main_blue};
  background-color: white;
  color: ${COLOR.main_blue};
  font-weight: 500;

  &:hover {
    border: 2px solid ${COLOR.main_blue_hover};
    color: ${COLOR.main_blue_hover};
  }
  &:active {
    border: 2px solid ${COLOR.main_blue_active};
    color: ${COLOR.main_blue_active};
  }
`;

const Modal = forwardRef(({ setIsModal }, ref) => {
  const navigate = useNavigate();

  const handleShare = () => {
    navigate('/board/add', { state: { isShareCalendar: true } });
  };

  const handleNotShare = () => {
    setIsModal(false);
    navigate('/board/add', { state: { isShareCalendar: false } });
  };

  const getLastDayOfMonth = () => {
    const currentDate = new Date();
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    return lastDayOfMonth;
  };

  const lastDayOfMonth = getLastDayOfMonth();

  return (
    <Container ref={ref}>
      <Alert>
        <BiBell size={22} color={COLOR.main_blue} />
        <Message>
          <span>아직 캘린더 자랑을 하지 않았어요</span>
          <span>지금 바로 내 캘린더를 자랑하러 가볼까요?</span>
        </Message>
        <Period>{`[ 자랑 기간 : 25일 - ${lastDayOfMonth}일 ]`}</Period>
      </Alert>
      <Buttons>
        <Share onClick={handleShare}>자랑하기</Share>
        <NotShare onClick={handleNotShare}>나중에 할래요</NotShare>
      </Buttons>
    </Container>
  );
});

Modal.displayName = 'Modal';

export default Modal;
