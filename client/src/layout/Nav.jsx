import styled from "styled-components";

const Container = styled.section``;
const NavBarContainer = styled.nav`
  display: flex;
  position: fixed;
  top: 50px;
  right: 0;
  width: 306px;
  height: 100vh;
  background-color: aliceblue;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding-top: 20px;
`;
const NavList = styled.ul``;
const MenuList = styled.li``;

const Nav = () => {
  return (
    <Container>
      <NavBarContainer>
        <NavList>
          <MenuList></MenuList>
          <MenuList></MenuList>
          <MenuList></MenuList>
          <MenuList></MenuList>
        </NavList>
      </NavBarContainer>
    </Container>
  );
};

export default Nav;
