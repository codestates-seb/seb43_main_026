import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_URL;

const api = axios.create(
  {
    baseURL: SERVER_URL,
  },
  { withCredentials: true }
);

// 유저정보 관련 API
export const userAPI = {
  //일반 로그인
  login: (username, password) =>
    api.post('/login', {
      username: username,
      password: password,
    }),

  //일반 회원가입
  signup: (formData) =>
    api.post('/members/signup', {
      email: formData.email,
      nickname: formData.nickname,
      password: formData.password,
    }),

  //이메일 인증
  emailValidation: (token, email) =>
    api.get(`/auth/check-email-token?token=${token}&email=${email}`),

  //카카오 로그인
  kakaoLogIn: (code) => api.get(`/auth/kakao/callback?code=${code}`),

  //google 로그인
  googleLogIn: (code) => api.get(`/auth/google/callback?code=${code}`),

  //isLogin
  isLogin: () =>
    api.get(`/user/isLogIn`, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      },
    }),

  //userEmail 중복확인
  userEmailCheck: (username) => api.post(`/auth/emailCheck`, { username }),

  //nickname 중복확인
  nicknameCheck: (nickname) => api.post(`/auth/nicknameCheck`, { nickname }),

  //전체 로그아웃
  logOut: () =>
    api.get(`user/allLogOut`, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      },
    }),

  //프로필 수정
  editProfile: (formData) =>
    api.post(`/user/update/profile`, formData, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      },
    }),

  //회원탈퇴
  deactivateUser: () =>
    api.put(
      `/user/update/accountStatus`,
      {},
      {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      }
    ),

  // 비밀번호 찾기
  findPwd: (email) =>
    api.post('/auth/password-reset-email', {
      email,
    }), //비밀번호 변경
  changePwd: (password) =>
    api.patch(
      '/user/update/password',
      { password: password },
      {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      }
    ),

  //비밀번호 변경
  changeNewPwd: (token, email, newPassword) =>
    api.post(
      `/auth/password-reset-email/callback?token=${token}&email=${email}&newPassword=${newPassword}`,
      {}
    ),
};
