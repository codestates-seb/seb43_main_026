import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLOR } from '../style/theme';
const Container = styled.section`
  position: fixed;
  z-index: 1000;
  top: 50px;
  width: 100%;
  height: 100vh;
  background-color: ${COLOR.bg_dark};
`;

const NavBarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50px;
  right: 0;
  width: 306px;
  height: 100vh;
  background-color: white;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  padding-top: 20px;
`;

const UserBox = styled.div`
  margin-top: 30px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  span {
    color: ${COLOR.main_dark_blue};
    font-weight: 700;
    font-size: 15px;
  }
`;

const ImgBox = styled.div`
  overflow: hidden;
  width: 90px;
  height: 90px;
  border: 2px solid ${COLOR.main_dark_blue};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 90px;
    height: 90px;
    object-fit: cover;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

const MenuList = styled(Link)`
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  margin-top: 11px;
  background-color: white;
  font-size: 15px;
  font-weight: 500;
  color: ${COLOR.main_blue};
  &:hover {
    cursor: pointer;
    color: ${COLOR.main_blue_hover};
  }
  &:active {
    color: ${COLOR.main_blue_active};
  }

  button {
    width: 110px;
    height: 40px;
    border-radius: 5px;
    background-color: ${COLOR.main_blue};
    border: none;
    font-size: 15px;
    font-weight: 500;
    color: white;
    &:hover {
      cursor: pointer;
      background-color: ${COLOR.main_blue_hover};
    }
    &:active {
      background-color: ${COLOR.main_blue_active};
    }
  }

  &:last-of-type {
    margin-top: 30px;
  }
`;

const Nav = ({ nav, handleNav }) => {
  const navigate = useNavigate();
  return (
    <Container style={{ display: nav ? 'block' : 'none' }} onClick={handleNav}>
      <NavBarContainer onClick={(e) => e.stopPropagation()}>
        <UserBox>
          <ImgBox>
            <img
              src="https://images.unsplash.com/photo-1592769606534-fe78d27bf450?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fCVFQSVCMCU5NSVFQyU5NSU4NCVFQyVBNyU4MHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt="프로필 사진"
            />
          </ImgBox>
          <span>로그인을 해주세요</span>
        </UserBox>
        <NavList>
          <MenuList to="">마이페이지</MenuList>
          <MenuList to="/">내 캘린더</MenuList>
          <MenuList to="">이번달 수영왕</MenuList>
          <MenuList to="/board">커뮤니티</MenuList>
          <MenuList>
            <button onClick={() => navigate('/login')}>로그인</button>
          </MenuList>
        </NavList>
      </NavBarContainer>
    </Container>
  );
};

export default Nav;
