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

// import { userAPI } from '../../assets/api';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_URL;

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

const Login = ({ loginUser, setLoginUser }) => {
  setLoginUser;
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();
  console.log(loginUser);

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

  // 로그인 완료 시
  const onFormSubmit = async ({ username, password }) => {
    axios
      .post(`${SERVER_URL}/login`, {
        username,
        password,
      })
      .then((res) => {
        const accessToken = res.headers.get('Authorization');
        const refreshToken = res.headers.get('refresh');
        const memberId = res.headers.get('memberid');
        axios.defaults.headers.common['Authorization'] = accessToken;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('memberId', memberId);
        if (accessToken) {
          axios
            .get(`${SERVER_URL}/members/${memberId}`, {
              headers: {
                Authorization: `${localStorage.getItem('accessToken')}`,
              },
            })
            .then((res) => {
              setLoginUser(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        navigate('/calendar');
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log(error.response.data.message);
        }
        if (error.response.status === 500) {
          console.log(error.response.data.message);
        }
      });
  };

  // 폼 작성시 에러
  const onFormError = (error) => {
    console.log(error, '에러');
  };

  return (
    <Container>
      <Logo src={LogoImg} alt="logo" />
      <Title>로그인</Title>
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
        <OAuthContainer>
          <GoogleLogin />
        </OAuthContainer>
      </Form>
    </Container>
  );
};

export default Login;
