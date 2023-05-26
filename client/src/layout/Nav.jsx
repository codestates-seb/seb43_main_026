import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { COLOR } from '../style/theme';
import Button from '../component/common/Button';
import profileImage from '../assets/image/headalee.png';
import { userAPI } from '../assets/api';

const Overlay = styled.section`
  position: fixed;
  z-index: 1000;
  top: 50px;
  width: 100%;
  height: 100vh;
  background-color: ${COLOR.bg_dark};
`;

const Container = styled.nav`
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
  border: 1px solid ${COLOR.main_dark_blue};
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
`;

const Nav = ({ nav, handleNav, loginUser, setLoginUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    userAPI.logout();
    setLoginUser(null);
  };
  return (
    <Overlay style={{ display: nav ? 'block' : 'none' }} onClick={handleNav}>
      <Container onClick={(e) => e.stopPropagation()}>
        <UserBox>
          <ImgBox>
            <img src={profileImage} alt="프로필 사진" />
          </ImgBox>
          {loginUser ? (
            <span>{loginUser.nickname}</span>
          ) : (
            <span>로그인을 해주세요</span>
          )}
        </UserBox>
        <NavList>
          {loginUser && (
            <MenuList to={`/users/${loginUser.memberId}`} onClick={handleNav}>
              마이페이지
            </MenuList>
          )}
          <MenuList to="/calendar" onClick={handleNav}>
            내 캘린더
          </MenuList>
          <MenuList to="/board" onClick={handleNav}>
            커뮤니티
          </MenuList>

          {loginUser ? (
            <Button
              text={`로그아웃`}
              width={'110px'}
              height={'40px'}
              style={{ marginTop: '35px' }}
              handleClick={() => {
                handleLogout();
                navigate('/');
                handleNav();
              }}
            />
          ) : (
            <Button
              text={`로그인`}
              width={'110px'}
              height={'40px'}
              style={{ marginTop: '35px' }}
              handleClick={() => {
                navigate('/login');
                handleNav();
              }}
            />
          )}
        </NavList>
      </Container>
    </Overlay>
  );
};

export default Nav;
