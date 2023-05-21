//모듈
import styled from 'styled-components';

//컴포넌트
import Carousel from '../component/common/Carousel';

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  width: 100%;
  max-width: 1200px;
  max-height: fit-content;
  min-height: 100vh;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0px;
`;

const Home = () => {
  return (
    <Container>
      <Carousel />
      <div>안녕</div>
    </Container>
  );
};

export default Home;
