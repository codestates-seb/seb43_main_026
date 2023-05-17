import styled from 'styled-components';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { COLOR } from '../../style/theme';
import LogoImage from '../../assets/image/logo2.png';
import Button from '../../component/common/Button';

const SERVER_URL = process.env.REACT_APP_API_URL;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  width: 90%;
  height: 70vh;
  border: 1px solid ${COLOR.main_blue};
  border-radius: 10px;
`;

const DeleteProfileLink = styled.span`
  margin-top: 1rem;
  width: 90%;
  text-align: end;
  color: ${COLOR.main_blue};
  cursor: pointer;
  &:hover {
    color: ${COLOR.main_blue_hover};
  }
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${COLOR.bg_dark};
  position: fixed;
  top: 0;
  left: 0;
`;

const Modal = styled.div`
  width: 60%;
  height: 30vh;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
`;

const Logo = styled.img`
  margin: 2rem 0;
  width: 10rem;
`;

const P = styled.p`
  text-align: center;
  line-height: 1.5;
  margin-bottom: 2rem;
`;

const Buttons = styled.div`
  display: flex;
  button:first-child {
    margin-right: 1rem;
    background-color: white;
    color: ${COLOR.main_blue};
    border: 1px solid ${COLOR.main_blue};
    &:hover {
      color: ${COLOR.main_blue_hover};
      border: 1px solid ${COLOR.main_blue_hover};
    }
  }
`;

const EditUser = () => {
  const { handleSubmit } = useForm();

  const [isModal, setIsModal] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  const onError = (error) => {
    console.log(error);
  };

  const deleteUser = () => {};

  useEffect(() => {
    axios.get(`${SERVER_URL}/members/`);
  }, []);
  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit, onError)}></Form>
        <DeleteProfileLink
          onClick={() => {
            setIsModal(true);
          }}
        >
          회원 탈퇴하기
        </DeleteProfileLink>
      </Container>
      {isModal && (
        <>
          <Overlay
            onClick={() => {
              setIsModal(false);
            }}
          />
          <Modal>
            <Logo src={LogoImage} alt="logo" />
            <P>
              탈퇴시 모든 정보와 기록이 삭제됩니다.
              <br /> 그래도 진행하시겠습니까?
            </P>
            <Buttons>
              <Button
                width={'8rem'}
                height={'3rem'}
                text={'네'}
                handleClick={deleteUser}
              />
              <Button
                width={'8rem'}
                height={'3rem'}
                text={'아니요'}
                handleClick={() => {
                  setIsModal(false);
                }}
              />
            </Buttons>
          </Modal>
        </>
      )}
    </>
  );
};

export default EditUser;
