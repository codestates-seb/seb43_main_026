// eslint-disable-next-line import/no-unresolved
import styled from 'styled-components';

const HeaderCon = styled.header`
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.color.bg};
  border: 1px solid black;
`;
const Header = () => {
  return <HeaderCon></HeaderCon>;
};

export default Header;
