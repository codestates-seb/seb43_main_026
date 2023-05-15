import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { COLOR } from '../style/theme';
import Button from '../component/common/Button';

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
`;

/*
현재 로그인 되어있는 유저의 id 값 불러와서 마이페이지 라우터에 넘겨줘야 함
*/

const Nav = ({ nav, handleNav }) => {
  const navigate = useNavigate();
  return (
    <Overlay style={{ display: nav ? 'block' : 'none' }} onClick={handleNav}>
      <Container onClick={(e) => e.stopPropagation()}>
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
          <MenuList to="/users/1" onClick={handleNav}>
            마이페이지
          </MenuList>
          <MenuList to="/" onClick={handleNav}>
            내 캘린더
          </MenuList>
          <MenuList to="" onClick={handleNav}>
            이번달 수영왕
          </MenuList>
          <MenuList to="/board" onClick={handleNav}>
            커뮤니티
          </MenuList>
          <MenuList>
            <Button
              text={`로그인`}
              width={'110px'}
              height={'40px'}
              handleClick={() => {
                navigate('/login');
                handleNav();
              }}
            />
          </MenuList>
        </NavList>
      </Container>
    </Overlay>
  );
};

export default Nav;
