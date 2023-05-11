import styled from 'styled-components';
import LogoImg from '../assets/image/logo2.png';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import GoogleLogin from '../component/oAuth/GoogleLogin';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const SignUp = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

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
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <label htmlFor="nickname">닉네임</label>
          <Input
            id="nickname"
            type="text"
            aria-invalid={errors.username ? '#ff0000' : '#dadada'}
            {...register('nickname', {
              required: true,
              minLength: {
                value: 2,
                message: '닉네임은 두글자 이상이어야 합니다.',
              },
            })}
          />
          {errors.nickname && errors.nickname.type === 'required' && (
            <AlertMessage>닉네임을 입력하세요.</AlertMessage>
          )}
          {errors.nickname && errors.nickname.type === 'minLength' && (
            <AlertMessage>{errors.nickname.message}</AlertMessage>
          )}

          <label htmlFor="email">이메일</label>
          <Input
            id="email"
            type="text"
            aria-invalid={errors.email ? '#ff0000' : '#dadada'}
            {...register('email', { required: true, pattern: /@/ })}
          />
          {errors.email && errors.email?.type === 'required' && (
            <AlertMessage>이메일을 입력하세요.</AlertMessage>
          )}
          {errors.email && errors.email?.type === 'pattern' && (
            <AlertMessage>@를 포함한 주소를 적어주세요.</AlertMessage>
          )}

          <label htmlFor="password">비밀번호</label>
          <Input
            id="password"
            type="password"
            aria-invalid={errors.password ? '#ff0000' : '#dadada'}
            {...register('password', {
              required: true,
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            })}
          />
          {errors.password && errors.password?.type === 'required' && (
            <AlertMessage>패스워드를 입력하세요.</AlertMessage>
          )}
          {errors.password && errors.password?.type === 'pattern' && (
            <AlertMessage>
              비밀번호는 8자 이상으로 하나 이상의 숫자와 문자,특수문자를
              포함해주세요.
            </AlertMessage>
          )}

          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <Input
            id="passwordCheck"
            type="password"
            aria-invalid={errors.passwordCheck ? '#ff0000' : '#dadada'}
            {...register('passwordCheck', {
              required: true,
              validate: (value) => value === watch('password'),
            })}
          />
          {errors.passwordCheck &&
            errors.passwordCheck?.type === 'required' && (
              <AlertMessage>패스워드를 재입력하세요.</AlertMessage>
            )}
          {errors.passwordCheck &&
            errors.passwordCheck?.type === 'validate' && (
              <AlertMessage>입력한 패스워드와 다릅니다.</AlertMessage>
            )}
          <button type="submit">회원가입</button>
          <OAuthContainer>
            <GoogleLogin />
          </OAuthContainer>
        </form>
      </div>
    </Container>
  );
};
export default SignUp;

const Container = styled.div`
  width: 100vw;
  height: 100%;
  padding-top: 50px;
  background-color: ${(props) => props.theme.color.bg_light_blue};
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
      border: 1px solid ${(props) => props.theme.color.main_blue};
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
        background-color: ${(props) => props.theme.color.main_blue};
        color: white;
        font-weight: 300;
        border-radius: 5px;
        cursor: pointer;
        &:hover {
          background-color: ${(props) => props.theme.color.main_blue_hover};
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
  border: 1px solid ${(props) => props.theme.color.input_border};
  padding: 0 0.5rem;
`;

const AlertMessage = styled.span`
  color: red;
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
