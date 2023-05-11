import { useForm } from 'react-hook-form';
import LogoImg from '../assets/image/logo2.png';
import styled from 'styled-components';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { COLOR } from '../style/theme';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

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
    form {
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
      label {
        margin-top: 2rem;
        margin-bottom: 0.7rem;
        font-weight: 300;
      }
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
  }
`;

const Logo = styled.img`
  width: 10rem;
`;

const Input = styled.input`
  margin-bottom: 0.5rem;
  height: 4.5vh;
  border-radius: 10px;
  border: 1px solid ${COLOR.input_border};
  padding: 0 0.5rem;
`;

const AlertMessage = styled.span`
  color: red;
`;

const Login = () => {
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

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  return (
    <Container>
      <div>
        <Logo src={LogoImg} alt="logo" />
        <h1>로그인</h1>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <label htmlFor="email">이메일</label>
          <Input
            id="email"
            type="text"
            aria-invalid={errors.email ? '#ff0000' : '#dadada'}
            {...register('email', { required: true })}
          />
          {errors.email && errors.email?.type === 'required' && (
            <AlertMessage>이메일을 입력해주세요.</AlertMessage>
          )}

          <label htmlFor="password">비밀번호</label>
          <Input
            id="password"
            type="password"
            aria-invalid={errors.password ? '#ff0000' : '#dadada'}
            {...register('password', {
              required: true,
            })}
          />
          {errors.password && errors.password?.type === 'required' && (
            <AlertMessage>비밀번호를 입력해주세요.</AlertMessage>
          )}

          <button type="submit">로그인</button>
          <FcGoogle size="30" />
        </form>
      </div>
    </Container>
  );
};

export default Login;
