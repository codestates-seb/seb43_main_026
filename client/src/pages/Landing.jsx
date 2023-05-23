import styled from 'styled-components';
// import SwimmingPool from '../assets/image/swimmingpool.png';
import Swimming from '../assets/image/swimming.png';
import Wave1 from '../assets/image/wave.png';
import Wave2 from '../assets/image/wave2.png';
import { COLOR, SIZE } from '../style/theme';
import { useNavigate } from 'react-router';
import Iphone from '../assets/image/calendarEX.png';
// import CalendarExampleImage from '../assets/image/calendarImage.png';

const LandingContainer = styled.main`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const FirstContainer = styled.section`
  position: relative;
  width: 100%;
  height: 400px;
  padding-top: 100px;
  background-color: ${COLOR.bg_light_blue};
  background-image: url(${Wave1});
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: contain;
  display: flex;
  flex-direction: column;
  > img {
    width: 220px;
    align-self: flex-end;
    margin: 140px 30px 0px;
  }
  @media screen and (min-width: ${SIZE.tablet}) {
    background-image: url(${Wave2});
    background-size: cover;
    height: 100vh;
    > img {
      width: 500px;
      margin: 240px 60px 0;
    }
  }

  @media screen and (min-width: ${SIZE.desktop}) {
    > img {
      width: 680px;
      margin: 180px 100px 0;
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
      left: -180px;
      opacity: 0;
    }
    50% {
      left: 100px;
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
    margin-left: 180px;
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

const SecondContainer = styled.section`
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fffff7e0;
  > img {
    width: 120px;
    position: absolute;
  }
  @media screen and (min-width: ${SIZE.tablet}) {
    height: 100vh;
    padding: 0 30px;
    flex-direction: row;

    > img {
      width: 200px;
    }
  }
`;

const SecondTextContainer = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: ${SIZE.tablet}) {
    margin-right: 100px;
  }
`;

const CalendarExample = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > h2 {
    color: #1b4f13;
    font-size: 38px;
    font-weight: 600;
    margin-bottom: 20px;
    white-space: nowrap;
    letter-spacing: 3px;
  }
  > span {
    color: #1b4f13;
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;
    text-align: center;
  }

  @media screen and (min-width: ${SIZE.tablet}) {
    flex-direction: column;
    margin-bottom: 80px;
    margin-right: 120px;
    > h2 {
      font-size: 60px;
      letter-spacing: 5px;
    }
    > span {
      font-size: 28px;
    }
  }
`;

const SecondTitle = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  padding-left: 4px;
  > p {
    color: #0c3505;
    text-align: center;
    white-space: nowrap;
    :first-of-type {
      margin-bottom: 10px;
    }
  }
  @media screen and (min-width: ${SIZE.tablet}) {
    width: 100%;
    font-size: 32px;
    /* margin-left: 120px; */
    > p {
      text-align: left;
      :first-of-type {
        margin-bottom: 30px;
      }
    }
  }
`;

// const ExampleImage = styled.img``;

const Landing = () => {
  const nav = useNavigate();

  return (
    <LandingContainer>
      <FirstContainer>
        <IntroduceContainer>
          <div>
            <h1>SooMo</h1>
            <span>: 수모</span>
          </div>
          <p>나의 데일리 수영 기록 플랫폼</p>
          <button onClick={() => nav('/signup')}>SooMo 시작하기</button>
        </IntroduceContainer>
        <img src={Swimming} alt="수영장" />
      </FirstContainer>
      <SecondContainer>
        <SecondTextContainer>
          <CalendarExample>
            <h2>#오수완🔥</h2>
            <span>오늘도 수영한 나, 칭찬해</span>
          </CalendarExample>
          <SecondTitle>
            <p>오늘 수영 완료하셨나요?</p>
            <p>매일 나의 캘린더에 기록해보세요</p>
          </SecondTitle>
        </SecondTextContainer>
        {/* <ExampleImage src={CalendarExampleImage} alt="캘린더이미지예시" /> */}
        <img src={Iphone} alt="캘린더예시" />
      </SecondContainer>
    </LandingContainer>
  );
};

export default Landing;
