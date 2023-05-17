// 라이브러리
import styled from 'styled-components';
// import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import LogoImg from '../../assets/image/logo2.png';
import { COLOR } from '../../style/theme';

// 컴포넌트
import GoogleLogin from '../../component/oAuth/GoogleLogin';
import Input from '../../component/common/Input';
import Button from '../../component/common/Button';

import { userAPI } from '../../assets/api';

// const SERVER_URL = process.env.REACT_APP_API_URL;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 50px;
  background-color: ${COLOR.bg_light_blue};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  width: 10rem;
`;

const Title = styled.h1``;

const Form = styled.form`
  margin-top: 4rem;
  min-width: 70vw;
  height: 100%;
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
  background-color: white;
  border: 1px solid ${COLOR.main_blue};
  padding: 6rem 2rem;
`;

const OAuthContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    cursor: pointer;
  }
`;

const Login = () => {
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();

  const emailOptions = {
    required: '이메일을 입력해주세요.',
  };

  const passwordOptions = {
    required: '비밀번호를 입력해주세요.',
  };

  // 로그인 완료 시
  const onSubmit = ({ username, password }) => {
    userAPI.login(username, password);
  };

  // 에러 발생 시
  // 401 에러 코드 -> 로그인 실패
  // 500 에러 코드 -> 형식 잘못됨
  const onError = (error) => {
    console.log(error, '에러');
  };

  return (
    <Container>
      <Logo src={LogoImg} alt="logo" />
      <Title>로그인</Title>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
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
        <OAuthContainer>
          <GoogleLogin />
        </OAuthContainer>
      </Form>
    </Container>
  );
};

export default Login;
