import styled from 'styled-components';
import Headalee from '../../assets/image/headalee.png';

const LoadingContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  > img {
    width: 230px;
    position: absolute;
    padding-right: 10px;
    padding-bottom: 20px;
  }
`;
const LoadingSpinner = styled.div`
  width: 220px;
  height: 220px;
  display: inline-block;
  overflow: hidden;

  @keyframes loading {
    0% {
      opacity: 1;
      backface-visibility: hidden;
      transform: translateZ(0) scale(1.5, 1.5);
    }
    100% {
      opacity: 0;
      backface-visibility: hidden;
      transform: translateZ(0) scale(1, 1);
    }
  }
  section div > div {
    position: absolute;
    width: 19.7px;
    height: 19.7px;
    border-radius: 50%;
    background: #85b6ff;
    animation: loading 1.639344262295082s linear infinite;
  }
  section div:nth-child(1) > div {
    left: 169.5px;
    top: 88.5px;
    animation-delay: -1.4344262295081966s;
  }
  section > div:nth-child(1) {
    transform: rotate(0deg);
    transform-origin: 179.35px 98.35px;
  }
  section div:nth-child(2) > div {
    left: 145.5px;
    top: 145.5px;
    animation-delay: -1.2295081967213115s;
  }
  section > div:nth-child(2) {
    transform: rotate(45deg);
    transform-origin: 155.35px 155.35px;
  }
  section div:nth-child(3) > div {
    left: 88.5px;
    top: 169.5px;
    animation-delay: -1.0245901639344261s;
  }
  section > div:nth-child(3) {
    transform: rotate(90deg);
    transform-origin: 98.35px 179.35px;
  }
  section div:nth-child(4) > div {
    left: 31.5px;
    top: 145.5px;
    animation-delay: -0.819672131147541s;
  }
  section > div:nth-child(4) {
    transform: rotate(135deg);
    transform-origin: 41.349999999999994px 155.35px;
  }
  section div:nth-child(5) > div {
    left: 7.5px;
    top: 88.5px;
    animation-delay: -0.6147540983606558s;
  }
  section > div:nth-child(5) {
    transform: rotate(180deg);
    transform-origin: 17.349999999999994px 98.35px;
  }
  section div:nth-child(6) > div {
    left: 31.5px;
    top: 31.5px;
    animation-delay: -0.4098360655737705s;
  }
  section > div:nth-child(6) {
    transform: rotate(225deg);
    transform-origin: 41.349999999999994px 41.349999999999994px;
  }
  section div:nth-child(7) > div {
    left: 88.5px;
    top: 7.5px;
    animation-delay: -0.20491803278688525s;
  }
  section > div:nth-child(7) {
    transform: rotate(270deg);
    transform-origin: 98.35px 17.349999999999994px;
  }
  section div:nth-child(8) > div {
    left: 145.5px;
    top: 31.5px;
    animation-delay: 0s;
  }
  section > div:nth-child(8) {
    transform: rotate(315deg);
    transform-origin: 155.35px 41.349999999999994px;
  }

  section {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */
  }
  section div {
    box-sizing: content-box;
  }
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <img src={Headalee} alt="해달이" />
      <LoadingSpinner>
        <section>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
        </section>
      </LoadingSpinner>
    </LoadingContainer>
  );
};

export default Loading;
