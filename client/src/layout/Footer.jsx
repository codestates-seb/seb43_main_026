import styled from 'styled-components';

const Footer = () => {
  return <Container>Footer</Container>;
};

export default Footer;

const Container = styled.div`
  width: 100%;
  height: 10vh;
  background-color: ${(props) => props.theme.color.pc_bg};
  position: absolute;
  bottom: 0;
`;
