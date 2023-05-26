import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';

import { COLOR } from '../../style/theme';
import LogoImage from '../../assets/image/logo2.png';
import EditProfileTitle from '../../assets/image/edit_profile_title.png';
import ProfileImage from '../../assets/image/headalee.png';
import Button from '../../component/common/Button';
import { useEffect, useState } from 'react';
import Input from '../../component/common/Input';
import { useNavigate } from 'react-router';

import { userAPI } from '../../assets/api';
import { WarningToast } from '../../component/common/WarningToast';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.img`
  width: 150px;
  margin: 2rem 0;
`;

const Form = styled.form`
  width: 90%;
  height: 80%;
  border: 1px solid ${COLOR.main_blue};
  border-radius: 10px;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  border: 1px solid ${COLOR.main_blue};
`;

const Email = styled.span`
  color: ${COLOR.main_blue};
  font-weight: 300;
  margin: 1rem 0;
`;

const DeleteProfileLink = styled.span`
  margin: 1rem 0;
  width: 90%;
  text-align: end;
  color: ${COLOR.main_blue};
  cursor: pointer;
  &:hover {
    color: ${COLOR.main_blue_hover};
  }
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${COLOR.bg_dark};
  position: fixed;
  top: 0;
  left: 0;
`;

const Modal = styled.div`
  width: 20rem;
  height: 20rem;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const Logo = styled.img`
  margin: 2rem 0;
  width: 10rem;
`;

const P = styled.p`
  text-align: center;
  line-height: 1.5;
  margin-bottom: 2rem;
`;

const Buttons = styled.div`
  display: flex;
  button:first-child {
    margin-right: 1rem;
    background-color: white;
    color: ${COLOR.main_blue};
    border: 1px solid ${COLOR.main_blue};
    &:hover {
      color: ${COLOR.main_blue_hover};
      border: 1px solid ${COLOR.main_blue_hover};
    }
  }
`;

const EditUser = ({ loginUser, setLoginUser }) => {
  const { handleSubmit, control, getValues } = useForm();
  const navigate = useNavigate();

  const [isModal, setIsModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const nicknameOptions = {
    minLength: {
      value: 2,
      message: '닉네임은 두글자 이상이어야 합니다.',
    },
  };

  const passwordOptions = {
    pattern: {
      value:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      message:
        '비밀번호는 8자 이상으로 하나 이상의 대문자, 소문자, 숫자, 특수문자를 포함해주세요.',
    },
  };
  const passwordCheckOptions = {
    validate: {
      check: (val) => {
        if (getValues('newPassword') !== val) {
          return '새 비밀번호와 일치하지 않습니다.';
        }
      },
    },
  };

  const onSubmit = async ({ nickname, newPassword }) => {
    if (nickname && newPassword) {
      const response = await userAPI.editProfile(nickname, newPassword);
      if (response.status === 409) {
        setVisible(true);
        setMessage('이미 사용중인 닉네임 입니다.');
      } else if (response.status === 200) {
        setVisible(true);
        setMessage('회원정보가 변경되었습니다.');
      }
    } else if (nickname) {
      if (nickname !== loginUser.nickname) {
        const nicknameResponse = await userAPI.editProfile(nickname, null);
        if (nicknameResponse.status === 409) {
          setVisible(true);
          setMessage('이미 사용중인 닉네임 입니다.');
        } else if (nicknameResponse.status === 200) {
          setVisible(true);
          setMessage('닉네임이 변경되었습니다.');
        }
      }
    } else if (newPassword) {
      const passwordResponse = await userAPI.editProfile(null, newPassword);
      if (passwordResponse.status === 200) {
        setVisible(true);
        setMessage('비밀번호가 변경되었습니다.');
      }
    }
  };

  const onError = (error) => console.log(error);

  const handleDeleteUser = async () => {
    await userAPI.deleteUser();
    setLoginUser(null);
    navigate('/');
  };

  useEffect(() => {
    if (!loginUser) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      {loginUser && (
        <>
          {visible ? (
            <WarningToast
              text={message}
              setWarning={setVisible}
              visible={visible}
            />
          ) : null}
          <Container>
            <Title src={EditProfileTitle} alt="타이틀" />
            <Form onSubmit={handleSubmit(onSubmit, onError)}>
              <Image src={ProfileImage} alt="프로필사진" />
              <Email>{loginUser.email}</Email>
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
                    style={{ marginTop: '10px' }}
                  />
                )}
              />
              <Controller
                name={'newPassword'}
                control={control}
                rules={passwordOptions}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    id="newPassword"
                    label="새 비밀번호"
                    type="password"
                    errorMessage={error?.message}
                    onChange={field.onChange}
                    value={field.value || ''}
                    style={{ marginTop: '10px' }}
                  />
                )}
              />
              <Controller
                name={'newPasswordCheck'}
                control={control}
                rules={passwordCheckOptions}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    id="newPasswordCheck"
                    label="새 비밀번호 확인"
                    type="password"
                    errorMessage={error?.message}
                    onChange={field.onChange}
                    value={field.value || ''}
                    style={{ marginTop: '10px' }}
                  />
                )}
              />
              <Button text={'적용'} style={{ marginTop: '10px' }} />
            </Form>
            <DeleteProfileLink
              onClick={() => {
                setIsModal(true);
              }}
            >
              회원 탈퇴하기
            </DeleteProfileLink>
          </Container>
        </>
      )}
      {isModal && (
        <>
          <Overlay
            onClick={() => {
              setIsModal(false);
            }}
          />
          <Modal>
            <Logo src={LogoImage} alt="logo" />
            <P>
              탈퇴시 모든 정보와 기록이 삭제됩니다.
              <br /> 그래도 진행하시겠습니까?
            </P>
            <Buttons>
              <Button
                width={'8rem'}
                height={'3rem'}
                text={'네'}
                handleClick={handleDeleteUser}
              />
              <Button
                width={'8rem'}
                height={'3rem'}
                text={'아니요'}
                handleClick={() => {
                  setIsModal(false);
                }}
              />
            </Buttons>
          </Modal>
        </>
      )}
    </>
  );
};

export default EditUser;
