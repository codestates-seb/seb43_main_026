// 모듈
import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';

const Container = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
`;

const SlideItem = styled.img`
  width: 100%;
  height: 350px;
  border-radius: 5px;
  animation: ${(props) => (props.animate ? fadeIn : '')} 0.5s ease-in-out;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Move = styled.div``;

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  const images = [
    { src: 'image1.jpg', alt: 'Image 1' },
    { src: 'image2.jpg', alt: 'Image 2' },
    { src: 'image3.jpg', alt: 'Image 3' },
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
        <button onClick={goToPreviousSlide}>Previous</button>
        <button onClick={goToNextSlide}>Next</button>
      </Move>
    </Container>
  );
};

export default Carousel;
