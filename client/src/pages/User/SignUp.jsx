// 라이브러리
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';

import LogoImg from '../../assets/image/logo2.png';
import { COLOR } from '../../style/theme';

// 컴포넌트
import GoogleLogin from '../../component/oAuth/GoogleLogin';
import Input from '../../component/common/Input';
import Button from '../../component/common/Button';

import { userAPI } from '../../assets/api';

const Container = styled.div`
  width: 100vw;
  height: 100%;
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
  width: 100%;
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

const SignUp = () => {
  const { handleSubmit, control, getValues } = useForm();

  const nicknameOptions = {
    required: '닉네임을 입력해주세요.',
    minLength: {
      value: 2,
      message: '닉네임은 두글자 이상이어야 합니다.',
    },
    validate: {
      check: () => {}, // 닉네임 중복 체크 API 필요
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
    validate: {
      check: (val) => {
        if (getValues('password') !== val) {
          return '비밀번호가 일치하지 않습니다.';
        }
      },
    },
  };

  // 회원가입 완료 시
  const onSubmit = (data) => {
    console.log(data);
    userAPI.signup(data);
    // axios
    //   .post(`${SERVER_URL}/members/signup`, { data })
    //   .then((res) => console.log(res))
    //   .catch((error) => console.log(error));
  };

  // 에러 발생 시
  const onError = (error) => console.log(error);

  return (
    <Container>
      <Logo src={LogoImg} alt="logo" />
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Controller
          name={'email'}
          control={control}
          rules={emailOptions}
          render={({ field, fieldState: { error } }) => (
            <Input
              id="email"
              label="이메일"
              type="text"
              errorMessage={error?.message}
              onChange={field.onChange}
              value={field.value || ''}
            />
          )}
        />
        <Controller
          name={'nickname'}
          control={control}
          rules={nicknameOptions}
          render={({ field, fieldState: { error } }) => (
            <Input
              id="nickname"
              label="닉네임"
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
              id="password"
              label="비밀번호"
              type="password"
              errorMessage={error?.message}
              onChange={field.onChange}
              value={field.value || ''}
              autocomplete="off"
            />
          )}
        />
        <Controller
          name={'passwordCheck'}
          control={control}
          rules={passwordCheckOptions}
          render={({ field, fieldState: { error } }) => (
            <Input
              id="passwordCheck"
              label="비밀번호 확인"
              type="password"
              errorMessage={error?.message}
              onChange={field.onChange}
              value={field.value || ''}
              autocomplete="off"
            />
          )}
        />

        <Button
          text={'회원가입'}
          width={'100%'}
          height={'5vh'}
          style={{ marginTop: '20px' }}
        />
        <OAuthContainer>
          <GoogleLogin />
        </OAuthContainer>
      </Form>
    </Container>
  );
};
export default SignUp;
