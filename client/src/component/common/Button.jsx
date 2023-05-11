import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { IoArrowBack } from 'react-icons/io5';

// 뒤로가기 버튼
const BackBtnCon = styled.button`
  border: none;
  background-color: inherit;
  cursor: pointer;
  color: ${(props) => props.theme.color.main_blue};
`;

const BackBtn = () => {
  // 이전 페이지로 이동하기
  const navigate = useNavigate();
  const handleBackBtn = () => {
    navigate(-1);
  };
  return (
    <BackBtnCon onClick={handleBackBtn}>
      <IoArrowBack size={30} />
    </BackBtnCon>
  );
};

export default BackBtn;
