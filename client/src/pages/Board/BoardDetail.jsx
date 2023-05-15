//모듈
import styled from 'styled-components';

//공통 스타일
import { COLOR } from '../../style/theme';

//공통 컴포넌트
import BackButton from '../../component/common/BackButton';

const Container = styled.main`
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  max-width: 1200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
  width: 100%;
  height: fit-content;
  width: 100%;
  height: fit-content;
`;

//상단바
const GobackAndModify = styled.section`
  width: 100%;
  height: 40px;
  background-color: ${COLOR.main_gray};
  padding: 0px 15px 0px 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

const Goback = styled.button`
  margin-top: 5px;
`;

//제목과 작성자
const TitleAndWriter = styled.section`
  width: 100%;
  display: flex;
  height: 60px;
  flex-direction: column;
  justify-content: center;
  padding: 0 15px;
  border-bottom: 1px solid ${COLOR.main_blue};
`;
const Writer = styled.span``;
const Title = styled.span``;

const BoardDetail = () => {
  return (
    <Container>
      <GobackAndModify>
        <Goback>
          <BackButton />
        </Goback>
      </GobackAndModify>
      <TitleAndWriter>
        <Title>제목</Title>
        <Writer>작성자</Writer>
      </TitleAndWriter>
    </Container>
  );
};

export default BoardDetail;
