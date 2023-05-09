import styled from 'styled-components';
import LogoImg from '../assets/image/logo.png';
// import { useForm } from 'react-hook-form';

const SignUp = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();
  // const onSubmit = () => {};
  // const onError = () => {};
  return (
    <Container>
      <div>
        <Logo src={LogoImg} alt="logo" />
        <h1>로그인</h1>
        {/* <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Input
            type="text"
            {...register('nickname', {
              required: true,
              minLength: {
                value: 2,
                message: '닉네임은 2글자 이상이어야 합니다.',
              },
            })}
          />
        </form> */}
      </div>
    </Container>
  );
};
export default SignUp;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 50px;
  background-color: ${(props) => props.theme.color.bg_light_blue};
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    form {
      margin-top: 4rem;
      width: 100vw;
      height: 100%;
      border-top-right-radius: 40px;
      border-top-left-radius: 40px;
      background-color: white;
      border: 1px solid ${(props) => props.theme.color.main_blue};
    }
  }
`;

const Logo = styled.img`
  width: 10rem;
`;

// const Input = styled.input``;
