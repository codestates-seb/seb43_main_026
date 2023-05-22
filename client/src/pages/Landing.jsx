import styled from 'styled-components';
import SwimmingPool from '../assets/image/swimmingpool.png';
import Wave from '../assets/image/wave.svg';
import { COLOR } from '../style/theme';

const LandingContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SoomoContainer = styled.section`
  width: 100%;
  /* height: 400px; */
  padding-top: 100px;
  background-color: ${COLOR.bg_light_blue};
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  background-image: url(${Wave});
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: initial;
  > img {
    width: 200px;
    align-self: flex-end;
    margin-right: 30px;
  }
`;

const IntroduceContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  font-size: 20px;
  font-weight: 600;
  > div {
    display: flex;
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;
    margin-bottom: 30px;
    h1 {
      color: ${COLOR.main_dark_blue};
      font-size: 26px;
      font-weight: 700;
    }
    span {
      color: ${COLOR.main_dark_blue};
      font-size: 16px;
      font-weight: 600;
      padding-top: 4px;
      margin-left: 5px;
    }
  }
  p {
    color: ${COLOR.main_dark_blue};
  }
`;

const Landing = () => {
  return (
    <LandingContainer>
      <SoomoContainer>
        <IntroduceContainer>
          <div>
            <h1>SooMo</h1>
            <span>: 수모</span>
          </div>
          <p>나의 데일리 수영 기록 플랫폼</p>
        </IntroduceContainer>
        <img src={SwimmingPool} alt="수영장" />
      </SoomoContainer>
    </LandingContainer>
  );
};

export default Landing;
