import { useForm } from 'react-hook-form';
import LogoImg from '../assets/image/logo2.png';
import styled from 'styled-components';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { COLOR } from '../style/theme';
import Input from '../component/common/Input';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

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

  const emailOptions = {
    required: '이메일을 입력해주세요.',
  };

  const passwordOptions = {
    required: '비밀번호를 입력해주세요.',
  };

  return (
    <Container>
      <div>
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
          <button type="submit">로그인</button>
          <FcGoogle size="30" />
        </Form>
      </div>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 50px;
  background-color: ${COLOR.bg_light_blue};
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    button {
      margin-top: 3rem;
      height: 5vh;
      border: none;
      background-color: ${COLOR.main_blue};
      color: white;
      font-weight: 300;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: ${COLOR.main_blue_hover};
      }
    }
  }
`;

const Logo = styled.img`
  width: 10rem;
`;

const Title = styled.h1``;

const Form = styled.form`
  margin-top: 4rem;
  width: 100%;
  height: 100%;
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
  background-color: white;
  border: 1px solid ${COLOR.main_blue};
  display: flex;
  flex-direction: column;
  padding: 6rem 2rem;
`;
