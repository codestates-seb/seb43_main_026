// 라이브러리
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import LogoImg from '../../assets/image/logo2.png';
import { COLOR } from '../../style/theme';

// 컴포넌트
import GoogleLogin from '../../component/oAuth/GoogleLogin';
import Input from '../../component/common/Input';
import Button from '../../component/common/Button';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

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
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const emailOptions = {
    required: '이메일을 입력해주세요.',
  };

  const passwordOptions = {
    required: '비밀번호를 입력해주세요.',
  };

  // 로그인 완료 시
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`${SERVER_URL}/login`, { data })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  // 에러 발생 시
  const onError = (error) => console.log(error);

  return (
    <Container>
      <Logo src={LogoImg} alt="logo" />
      <Title>로그인</Title>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Input
          id="email"
          label="이메일"
          type="text"
          options={emailOptions}
          errors={errors.email}
          register={register}
        />
        <Input
          id="password"
          label="비밀번호"
          type="password"
          options={passwordOptions}
          errors={errors.password}
          register={register}
        />
        <Button text={'로그인'} width={'100%'} height={'5vh'} />
        <OAuthContainer>
          <GoogleLogin />
        </OAuthContainer>
      </Form>
    </Container>
  );
};

export default Login;
