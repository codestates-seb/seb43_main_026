import styled from 'styled-components';
import { COLOR } from '../../style/theme';

const Container = styled.button`
  width: ${(props) => (props.width ? `${props.width}` : '100%')};
  height: ${(props) => (props.height ? `${props.height}` : '5vh')};
  margin-top: 3rem;
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

const Button = ({ text, width, height }) => {
  return (
    <Container width={width} height={height}>
      {text}
    </Container>
  );
};

export default Button;
