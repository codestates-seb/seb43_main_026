import styled from 'styled-components';
import LogoImg from '../assets/image/logo2.png';
import { useForm } from 'react-hook-form';
import axios from 'axios';
// import GoogleLogin from '../component/oAuth/GoogleLogin';
import { COLOR } from '../style/theme';
import Input from '../component/common/Input';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Container = styled.div`
  width: 100vw;
  height: 100%;
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

const SignUp = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const nicknameOptions = {
    required: '닉네임을 입력해주세요.',
    minLength: {
      value: 2,
      message: '닉네임은 두글자 이상이어야 합니다.',
    },
  };
  const emailOptions = {
    required: '이메일을 입력해주세요.',
    pattern: {
      value: /@/,
      message: '@를 포함한 주소를 적어주세요.',
    },
  };
  const passwordOptions = {
    required: '비밀번호를 입력해주세요.',
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      message:
        '비밀번호는 8자 이상으로 하나 이상의 숫자와 문자,특수문자를 포함해주세요.',
    },
  };
  const passwordCheckOptions = {
    required: '비밀번호를 재입력해주세요.',
    validate: (value) =>
      value === watch('password') || '입력된 비밀번호와 일치하지 않습니다.',
  };

  // 회원가입 완료 시
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`${SERVER_URL}/members/signup`, { data })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  // 에러 발생 시
  const onError = (error) => console.log(error);
  return (
    <Container>
      <div>
        <Logo src={LogoImg} alt="logo" />
        <Title>회원가입</Title>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <Input
            id="nickname"
            label="닉네임"
            type="text"
            options={nicknameOptions}
            register={register}
            errors={errors.nickname}
          />

          <Input
            id="email"
            label="이메일"
            type="text"
            options={emailOptions}
            register={register}
            errors={errors.email}
          />

          <Input
            id="password"
            label="비밀번호"
            type="password"
            options={passwordOptions}
            register={register}
            errors={errors.password}
          />

          <Input
            id="passwordCheck"
            label="비밀번호 확인"
            type="password"
            options={passwordCheckOptions}
            register={register}
            errors={errors.passwordCheck}
          />

          <button type="submit">회원가입</button>
          <OAuthContainer>{/* <GoogleLogin /> */}</OAuthContainer>
        </Form>
      </div>
    </Container>
  );
};
export default SignUp;
