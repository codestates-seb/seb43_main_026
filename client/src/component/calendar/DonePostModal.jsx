import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { COLOR } from '../../style/theme';

const Container = styled.div`
  width: 280px;
  height: 150px;
  position: fixed;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 80px;
  border: 2px solid ${COLOR.main_dark_blue};
  border-radius: 20px;
  background-color: #fff;
  > p {
    font-size: 20px;
    font-weight: 600;
    color: ${COLOR.main_dark_blue};
    margin-top: 20px;
  }
`;

const DoneButton = styled.button`
  width: 100px;
  height: 40px;
  margin-top: 40px;
  justify-self: end;
  border: none;
  border-radius: 20px;
  background-color: ${COLOR.main_dark_blue};
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  :hover {
    background-color: ${COLOR.main_dark_blue_hover};
  }
`;

export const DonePostModal = ({ setDonePost, text }) => {
  const nav = useNavigate();
  const handleDonePost = () => {
    setDonePost(false);
    nav(`/calendar`);
  };
  return (
    <Container>
      <p>{text}</p>
      <DoneButton onClick={handleDonePost}>확인</DoneButton>
    </Container>
  );
};

export const DoneEditModal = ({ setDonePost, text, scheduleId }) => {
  const nav = useNavigate();
  const handleDonePost = () => {
    setDonePost(false);
    nav(`/calendar/${scheduleId}`);
  };
  return (
    <Container>
      <p>{text}</p>
      <DoneButton onClick={handleDonePost}>확인</DoneButton>
    </Container>
  );
};
