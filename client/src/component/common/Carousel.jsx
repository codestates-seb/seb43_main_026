// 모듈
import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';

//공통 스타일
import { COLOR, SIZE } from '../../style/theme';

//이미지
import Slide1 from '../../assets/image/slide1.png';
import Slide2 from '../../assets/image/slide2.png';
import Slide3 from '../../assets/image/slide3.png';

const Container = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin-top: 25px;

  @media screen and (max-width: ${SIZE.mobileMax}) {
    display: none;
  }
`;

const SlideItem = styled.img`
  width: 100%;
  object-fit: cover;
  height: auto;
  max-height: 350px;
  overflow: hidden;
  animation: ${(props) => (props.animate ? fadeIn : '')} 0.5s ease-in-out;

  @media screen and (min-width: ${SIZE.mobileMax}) {
    border-radius: 10px;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Move = styled.div`
  position: sticky;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  div {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  button {
    width: 45px;
    border: none;
    background-color: transparent;
    font-size: 28px;
    font-weight: 600;
    color: ${COLOR.main_dark_blue};
  }
`;

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  const images = [
    { src: Slide1, alt: 'Image 1' },
    { src: Slide2, alt: 'Image 2' },
    { src: Slide3, alt: 'Image 3' },
  ];

  const goToPreviousSlide = () => {
    const index = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
    setAnimate(true);
  };

  const goToNextSlide = () => {
    const index = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(index);
    setAnimate(true);
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  const handleAnimationEnd = () => {
    setAnimate(false);
  };

  return (
    <Container>
      <SlideItem
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        animate={animate}
        onAnimationEnd={handleAnimationEnd}
      />
      <Move>
        <div>
          <button onClick={goToPreviousSlide}>{`<`}</button>
          <button onClick={goToNextSlide}>{`>`}</button>
        </div>
      </Move>
    </Container>
  );
};

export default Carousel;
