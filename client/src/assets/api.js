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
    api
      .post('/login', {
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
        return res.status.code;
      })
      .catch((error) => {
        return error;
      }),

  //일반 회원가입
  signup: (formData) =>
    api
      .post('/members/signup', {
        email: formData.email,
        nickname: formData.nickname,
        password: formData.password,
      })
      .then((res) => console.log(res))
      .catch((error) => {
        if (error.response.status === 409) {
          console.log(error.response.data.message);
        }
      }),

  // 로그인 유무 확인
  isLogin: (memberId) =>
    api
      .get(`/members/${memberId}`, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => console.log(error)),

  //전체 로그아웃
  logout: () =>
    api.get(`user/allLogOut`, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      },
    }),

  //카카오 로그인
  kakaoLogIn: (code) => api.get(`/auth/kakao/callback?code=${code}`),

  //google 로그인
  googleLogIn: (code) => api.get(`/auth/google/callback?code=${code}`),

  //프로필 수정
  editProfile: (formData) =>
    api.post(`/user/update/profile`, formData, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      },
    }),

  //회원탈퇴
  deleteUser: (memberId) =>
    api
      .delete(`/members/${memberId}`, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      .then(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('memberId');
      })
      .catch((error) => console.log(error)),
};
