import styled from 'styled-components';
import { FiMenu } from 'react-icons/fi';
import LogoImage from '../assets/image/logo.png';
import { COLOR, SIZE } from '../style/theme';
import { useNavigate } from 'react-router';

const Container = styled.header`
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
  padding: 0 20px 0 15px;
  @media screen and (min-width: ${SIZE.tablet}) {
    padding: 0 15px;
  }
  > button {
    width: 120px;
    height: inherit;
    border: none;
    background-color: inherit;
    > img {
      width: 120px;
      cursor: pointer;
    }
  }

  .nav_icon {
    cursor: pointer;
    color: white;
  }
`;

const Header = ({ handleNav }) => {
  const nav = useNavigate();

  return (
    <Container>
      <button onClick={() => nav('/')}>
        <img src={LogoImage} alt="로고" className="logo_img" />
      </button>

      <FiMenu size={30} className="nav_icon" onClick={handleNav} />
    </Container>
  );
};

export default Header;
