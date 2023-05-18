//모듈
import styled from 'styled-components';

//공통 스타일
import { COLOR } from '../../style/theme';

const Container = styled.ul`
  padding-top: 3px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  background-color: ${COLOR.bg};
`;

const Modal = () => {
  return <Container></Container>;
};

export default Modal;
