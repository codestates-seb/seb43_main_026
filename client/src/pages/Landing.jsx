import styled from 'styled-components';
import Swimming from '../assets/image/swimming.png';
import Wave1 from '../assets/image/wave.png';
import Wave2 from '../assets/image/wave2.png';
import { COLOR, SIZE } from '../style/theme';
import { useNavigate } from 'react-router';
import Iphone from '../assets/image/calendarEX.png';
import Alert from '../assets/image/alert.png';

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
      width: 460px;
      margin: 240px 60px 0;
    }
  }

  @media screen and (min-width: ${SIZE.desktop}) {
    > img {
      width: 620px;
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
    animation: slide-in 1.8s ease-out 0s 1;
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
  align-items: center;
  background-color: #fffff7e0;
  > img {
    position: absolute;
    width: 200px;
    right: 10px;
    top: 50px;
  }
  @media screen and (min-width: ${SIZE.tablet}) {
    height: 100vh;
    padding: 0 30px;
    flex-direction: row;
    justify-content: space-between;
    > img {
      width: 340px;
      right: 60px;
      top: 140px;
    }
  }
`;

const SecondTextContainer = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: ${SIZE.tablet}) {
    margin-left: 60px;
    justify-content: center;
  }
`;

const CalendarExample = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 100px auto 0 30px;

  z-index: 10;
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
  }

  @media screen and (min-width: ${SIZE.tablet}) {
    flex-direction: column;
    justify-content: center;
    margin-bottom: 180px;
    > h2 {
      font-size: 67px;
      letter-spacing: 5px;
    }
    > span {
      font-size: 28px;
    }
  }
`;

const SecondTitle = styled.div`
  /* width: 100%; */
  font-size: 24px;
  font-weight: 700;
  margin: 40px 0 30px 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

    > p {
      text-align: left;
      :first-of-type {
        margin-bottom: 30px;
      }
    }
  }
`;

const ThirdContainer = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff0fd;
  img {
    width: 420px;
    margin-right: 5rem;
  }
`;

const ThirdTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  h2 {
    color: #6a2c9b;
    font-size: 50px;
    font-weight: 600;
    margin-bottom: 60px;
    white-space: nowrap;
    letter-spacing: 3px;
    background-color: rgba(203, 140, 255, 0.4);
    padding: 0.5rem 1rem;
  }
  p {
    margin: 0.5rem 0;
    color: #6a2c9b;
    font-size: 30px;
    font-weight: 600;
    white-space: nowrap;
    text-align: center;
    span {
      color: #b865f9;
    }
  }
`;

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
          <button onClick={() => nav('/login')}>SooMo 시작하기</button>
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
            <p>매일 나의 캘린더에 기록해보세요!</p>
          </SecondTitle>
        </SecondTextContainer>
        <img src={Iphone} alt="캘린더예시" />
      </SecondContainer>
      <ThirdContainer>
        <img src={Alert} alt="캘린더등록알림창" />
        <ThirdTextContainer>
          <p>매달 25일부터 시작하는</p>
          <h2>캘린더 자랑 ✨</h2>
          <p>내 캘린더도 자랑하고</p>
          <p>
            다른 사람 캘린더 구경 <span>#가보자고</span>
          </p>
        </ThirdTextContainer>
      </ThirdContainer>
    </LandingContainer>
  );
};

export default Landing;
