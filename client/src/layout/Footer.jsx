import styled from 'styled-components';
import LogoImage from '../assets/image/logo.png';
import { SIZE, COLOR } from '../style/theme';

const Container = styled.div`
  width: 100%;
  height: 15vh;
  background-color: ${COLOR.main_blue};
  bottom: 0;
  @media screen and (max-width: ${SIZE.mobileMax}) {
    display: none;
  }

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    .logo {
      img {
        width: 10rem;
      }
    }
    .github {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.7rem;
    }
  }
`;

const Logo = styled.img``;

const GithubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 1.5rem;
  img {
    width: 4rem;
    border-radius: 100%;
    margin-bottom: 0.5rem;
  }
`;

const Footer = () => {
  return (
    <Container>
      <div>
        <div className="logo">
          <Logo src={LogoImage} alt="logo" />
        </div>
        <div className="github">
          <GithubProfile profileUrl="52683129" name="rsuubinn" />
          <GithubProfile profileUrl="119961147" name="kijiwon" />
          <GithubProfile profileUrl="104323906" name="chochojj" />
          <GithubProfile profileUrl="117034592" name="Seohabin6078" />
          <GithubProfile profileUrl="70518135" name="yhj0076" />
          <GithubProfile profileUrl="113077033" name="mins-git" />
        </div>
      </div>
    </Container>
  );
};

const GithubProfile = ({ profileUrl, name }) => {
  return (
    <GithubContainer>
      <img
        src={`https://avatars.githubusercontent.com/u/${profileUrl}?v=4`}
        alt="github profile img"
      />
      <a href={`https://github.com/${name}`}>@{name}</a>
    </GithubContainer>
  );
};

export default Footer;
