import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { IoArrowBack } from 'react-icons/io5';
import { COLOR } from '../../style/theme';
import { useLocation } from 'react-router-dom';

const Container = styled.button`
  border: none;
  background-color: inherit;
  cursor: pointer;
  color: ${COLOR.main_blue};
`;

const NavToDetail = ({ scheduleId }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackButton = () => {
    if (location.pathname.includes('edit')) {
      // 이전 페이지로 돌아가는 대신 상세 페이지로 남아 있도록 처리
      navigate(`/calendar/${scheduleId}`, { replace: true });
    } else {
      navigate(`/calendar`);
    }
  };

  return (
    <Container onClick={handleBackButton}>
      <IoArrowBack size={30} />
    </Container>
  );
};

export default NavToDetail;
