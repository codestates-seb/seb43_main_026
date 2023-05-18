import styled from 'styled-components';

const WarningModalContainer = styled.div`
  width: 260px;
  height: 50px;
  top: 100px;
  text-align: center;
  left: 100px;
  border: 2px solid darkblue;
`;

const WarningModal = () => {
  return (
    <WarningModalContainer>
      <p>경고창</p>
    </WarningModalContainer>
  );
};
export default WarningModal;
