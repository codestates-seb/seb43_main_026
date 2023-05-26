import styled from 'styled-components';
import { COLOR } from '../../style/theme';

const Container = styled.button`
  width: ${(props) => (props.width ? `${props.width}` : '100%')};
  height: ${(props) => (props.height ? `${props.height}` : '35px')};
  border: none;
  background-color: ${COLOR.main_blue};
  color: white;
  font-weight: 500;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
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

