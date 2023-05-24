import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useState } from 'react';

import SignupTitle from '../../assets/image/signup_title.png';
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

const SignUp = ({ setIsSignupSuccess }) => {
  const { handleSubmit, control, getValues } = useForm();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);

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

  const onSubmit = async (data) => {
    const response = await userAPI.signup(data);
    if (response.status === 409) {
      setVisible(true);
      setErrorMessage(response.data.message);
    } else if (response.status === 201) {
      setIsSignupSuccess(true);
      navigate('/login');
    }
  };

  const onError = (error) => console.log(error);

  return (
    <>
      {visible ? (
        <WarningToast
          text={errorMessage}
          setWarning={setVisible}
          visible={visible}
        />
      ) : null}
      <Container>
        <Title src={SignupTitle} alt="타이틀" />
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
              />
            )}
          />

          <Button
            text={'회원가입'}
            width={'100%'}
            height={'5vh'}
            style={{ marginTop: '20px' }}
          />
        </Form>
      </Container>
    </>
  );
};
export default SignUp;
