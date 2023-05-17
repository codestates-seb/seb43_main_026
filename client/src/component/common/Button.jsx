import styled from 'styled-components';
import { COLOR } from '../../style/theme';

const Container = styled.button`
  width: ${(props) => (props.width ? `${props.width}` : '100%')};
  height: ${(props) => (props.height ? `${props.height}` : '5vh')};
  border: none;
  background-color: ${COLOR.main_blue};
  color: white;
  font-weight: 300;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${COLOR.main_blue_hover};
  }
`;

const Button = ({ text, width, height, handleClick, style }) => {
  return (
    <Container
      style={style}
      width={width}
      height={height}
      onClick={handleClick}
    >
      {text}
    </Container>
  );
};

export default Button;
