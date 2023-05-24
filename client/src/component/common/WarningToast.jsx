import styled from 'styled-components';
import { COLOR } from '../../style/theme';
import { useEffect } from 'react';

const WarningToastContainer = styled.div`
  position: absolute;
  z-index: 99;
  width: 260px;
  height: 70px;
  top: 80px;
  left: 50%;
  transform: translate(-50%, 0%);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${COLOR.warning_border};
  border-radius: 10px;
  background-color: #fff;

  > p {
    font-size: 16px;
    font-weight: 600;
    color: ${COLOR.main_dark_blue};
  }
`;

export const WarningToast = ({ setWarning, text, visible }) => {
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setWarning(false);
      }, 1500);
    }
  }, [setWarning, visible]);

  return visible ? (
    <WarningToastContainer>
      <p>{text}</p>
    </WarningToastContainer>
  ) : null;
};
