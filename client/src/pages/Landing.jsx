import styled from 'styled-components';
import SwimmingPool from '../assets/image/swimmingpool.png';
import Wave1 from '../assets/image/wave.png';
import Wave2 from '../assets/image/wave2.png';
import { COLOR, SIZE } from '../style/theme';
import { useNavigate } from 'react-router';

const LandingContainer = styled.main`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const SoomoContainer = styled.section`
  position: relative;
  width: 100%;
  height: 400px;
  padding-top: 100px;
  background-color: ${COLOR.bg_light_blue};
  background-image: url(${Wave1});
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: contain;
  > img {
    width: 200px;
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
  @media screen and (min-width: ${SIZE.tablet}) {
    background-image: url(${Wave2});
    background-size: cover;
    height: 100vh;
    > img {
      width: 400px;
      right: 30px;
      bottom: 200px;
    }
  }
`;

const IntroduceContainer = styled.div`
  z-index: 10;
  position: absolute;
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  font-size: 24px;
  font-weight: 600;
  animation: slide-up 1s linear 0s 1;

  @keyframes slide-up {
    0% {
      bottom: -100px;
      opacity: 0;
    }
    100% {
      bottom: 150px;
      opacity: 1;
    }
  }
  @keyframes slide-in {
    0% {
      left: -100px;
      opacity: 0;
    }
    60% {
      left: 40px;
      opacity: 1;
    }
    100% {
      left: 0px;
      opacity: 1;
    }
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
    > h1 {
      color: ${COLOR.main_dark_blue};
      font-size: 38px;
      font-weight: 700;
    }
    > span {
      color: ${COLOR.main_dark_blue};
      font-size: 20px;
      font-weight: 600;
      padding-top: 10px;
      margin-left: 5px;
    }
  }
  p {
    color: ${COLOR.main_dark_blue};
  }
  > button {
    width: 180px;
    height: 48px;
    margin-top: 26px;
    border: none;
    border-radius: 25px;
    background-color: ${COLOR.main_dark_blue};
    color: #fff;
    font-size: 16px;
    :hover {
      background-color: ${COLOR.main_dark_blue_hover};
    }
  }
  @media screen and (min-width: ${SIZE.tablet}) {
    margin-top: 60px;
    margin-left: 140px;
    font-size: 30px;
    font-weight: 600;
    position: absolute;
    animation: slide-in 1.4s ease-out 0s 1;
    > div {
      > h1 {
        font-size: 60px;
      }
      > span {
        font-size: 28px;
        padding-top: 20px;
      }
    }
    > button {
      margin-top: 50px;
      width: 240px;
      height: 58px;
      font-size: 22px;
    }
  }
`;

const Landing = () => {
  const nav = useNavigate();

  return (
    <LandingContainer>
      <SoomoContainer>
        <IntroduceContainer>
          <div>
            <h1>SooMo</h1>
            <span>: 수모</span>
          </div>
          <p>나의 데일리 수영 기록 플랫폼</p>
          <button onClick={() => nav('/signup')}>SooMo 시작하기</button>
        </IntroduceContainer>
        <img src={SwimmingPool} alt="수영장" />
      </SoomoContainer>
    </LandingContainer>
  );
};

export default Landing;
