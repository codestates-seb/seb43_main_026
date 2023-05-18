//모듈
import styled from 'styled-components';

//공통 스타일
import { COLOR } from '../../style/theme';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 200px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.bg};
`;

//메세지
const Alert = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Emoji = styled.span``;
const Message = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Period = styled.span``;

//이동 버튼
const Buttons = styled.article`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Share = styled.button``;
const NotShare = styled.button``;

const Modal = () => {
  return (
    <Container>
      <Alert>
        <Emoji> 잠시만요 !</Emoji>
        <Message>
          <span>아직 캘린더 자랑을 하지 않으셨네요</span>
          <span>지금 바로 내 캘린더를 자랑하러 가볼까요?</span>
        </Message>
        <Period>자랑 기간 </Period>
      </Alert>
      <Buttons>
        <Share>네</Share>
        <NotShare>아니요</NotShare>
      </Buttons>
    </Container>
  );
};

export default Modal;
