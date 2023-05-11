import styled from 'styled-components';
import { FiMenu } from 'react-icons/fi';
import LogoImage from '../assets/image/logo.png';
import { COLOR, SIZE } from '../style/theme';
const HeaderContainer = styled.header`
  z-index: 1000;
  width: 100%;
  min-width: 360px;
  height: 50px;
  background-color: ${COLOR.main_blue};
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  @media screen and (min-width: ${SIZE.tablet}) {
    padding: 0 15px;
  }
  .logo_img {
    width: 120px;
    margin-top: 10px;
    cursor: pointer;
  }
  .nav_icon {
    cursor: pointer;
    color: white;
  }
`;
const Header = ({ handleNav }) => {
  return (
    <HeaderContainer>
      <img src={LogoImage} alt="로고" className="logo_img" />
      <FiMenu size={30} className="nav_icon" onClick={handleNav} />
    </HeaderContainer>
  );
};

export default Header;
