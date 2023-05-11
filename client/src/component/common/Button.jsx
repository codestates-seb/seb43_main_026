import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { IoArrowBack } from 'react-icons/io5';
import { COLOR } from '../../style/theme';
// 뒤로가기 버튼
const BackButtonContainer = styled.button`
  border: none;
  background-color: inherit;
  cursor: pointer;
  color: ${COLOR.main_blue};
`;

const BackButton = () => {
  // 이전 페이지로 이동하기
  const navigate = useNavigate();
  const handleBackBtn = () => {
    navigate(-1);
  };
  return (
    <BackButtonContainer onClick={handleBackBtn}>
      <IoArrowBack size={30} />
    </BackButtonContainer>
  );
};

export default BackButton;
