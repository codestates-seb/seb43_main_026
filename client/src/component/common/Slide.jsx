import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const slides = [
  // 슬라이드 컨텐츠 배열
  {
    /* 첫 번째 슬라이드 컨텐츠 */
  },
  {
    /* 두 번째 슬라이드 컨텐츠 */
  },
  {
    /* 세 번째 슬라이드 컨텐츠 */
  },
];

const SlideContainer = styled.div`
  width: 1200px;
  height: 350px;
  overflow: hidden;
`;

const SlideItem = styled.div`
  width: 1200px;
  height: 350px;
  float: left;
  animation: ${slideAnimation} 3s infinite;
`;

const slideAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-3600px);
  }
`;

const Slide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // 다음 슬라이드로 이동
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentSlide]);

  return (
    <SlideContainer>
      {slides.map((slide, index) => (
        <SlideItem
          key={index}
          style={{
            animationDelay: `${index * 3}s`,
            transform: `translateX(${(index - currentSlide) * 1200}px)`,
          }}
        >
          {slide}
        </SlideItem>
      ))}
    </SlideContainer>
  );
};

export default Slide;
