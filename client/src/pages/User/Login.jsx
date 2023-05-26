import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

import LoginTitle from '../../assets/image/login_title.png';
import { COLOR, SIZE } from '../../style/theme';
import { userAPI } from '../../assets/api';

import Input from '../../component/common/Input';
import Button from '../../component/common/Button';
import { WarningToast } from '../../component/common/WarningToast';

const Container = styled.div`
  width: 100%;
  height: 80vh;
  background-color: ${COLOR.bg_light_blue};
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: ${SIZE.mobileMax}) {
    height: 100vh;
  }
`;

const Title = styled.img`
  width: 130px;
  margin-top: 3rem;
`;

const Form = styled.form`
  margin-top: 2.5rem;
  width: 50%;
  height: inherit;
  overflow-y: hidden;
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
  background-color: white;
  border: 1px solid ${COLOR.main_blue};
  border-bottom: none;
  padding: 5rem 2rem;
  box-shadow: rgba(133, 182, 255, 0.2) 0px 8px 24px;

  @media screen and (max-width: ${SIZE.mobileMax}) {
    width: 100vw;
  }
`;

const Login = ({
  loginUser,
  setLoginUser,
  isSignupSuccess,
  setIsLoginSuccess,
}) => {
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(isSignupSuccess);
  const [message, setMessage] = useState('');

  const emailOptions = {
    required: '이메일을 입력해주세요.',
    pattern: {
      value:
        /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
      message: '@를 포함한 이메일 주소를 적어주세요.',
    },
  };
  const passwordOptions = {
    required: '비밀번호를 입력해주세요.',
    pattern: {
      value:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      message:
        '비밀번호는 8자 이상으로 하나 이상의 대문자, 소문자, 숫자, 특수문자를 포함해주세요.',
    },
  };

  const onFormSubmit = async ({ username, password }) => {
    const response = await userAPI.login(username, password);
    if (response.status === 401) {
      setVisible(true);
      setMessage('이메일과 비밀번호를 확인해주세요.');
    } else if (response.status === 500) {
      setVisible(true);
      setMessage('서버와 통신에 실패했습니다.');
    } else {
      const user = await userAPI.isLogin();
      setLoginUser(user);
      setIsLoginSuccess(true);
      navigate('/calendar');
    }
  };

  const onFormError = (error) => console.log(error);

  useEffect(() => {
    if (loginUser) {
      navigate('/calendar');
    }
  }, [loginUser]);
  useEffect(() => {
    if (isSignupSuccess) {
      setVisible(true);
      setMessage('회원가입에 성공하였습니다.');
    }
  }, [isSignupSuccess]);
  return (
    <>
      {visible ? (
        <WarningToast
          text={message}
          setWarning={setVisible}
          visible={visible}
        />
      ) : null}
      <Container>
        <Title src={LoginTitle} alt="타이틀" />
        <Form onSubmit={handleSubmit(onFormSubmit, onFormError)}>
          <Controller
            name={'username'}
            control={control}
            rules={emailOptions}
            render={({ field, fieldState: { error } }) => (
              <Input
                id="username"
                label="이메일"
                type="text"
                errorMessage={error?.message}
                onChange={field.onChange}
                value={field.value || ''}
              />
            )}
          />
          <Controller
            name={'password'}
            control={control}
            rules={passwordOptions}
            render={({ field, fieldState: { error } }) => (
              <Input
                label="비밀번호"
                type="password"
                errorMessage={error?.message}
                onChange={field.onChange}
                value={field.value || ''}
              />
            )}
          />
          <Button
            text={'로그인'}
            width={'100%'}
            height={'5vh'}
            style={{ marginTop: '20px' }}
          />
          <Button
            text={'회원가입'}
            width={'100%'}
            height={'5vh'}
            style={{ marginTop: '20px' }}
            handleClick={() => {
              navigate('/signup');
            }}
          />
        </Form>
      </Container>
    </>
  );
};

export default Login;
