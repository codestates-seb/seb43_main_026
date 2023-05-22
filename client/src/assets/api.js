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
        const accessToken = res.headers.get('Authorization'); // 액세스 토큰
        const expires = res.headers.get('authexpiration'); // 액세스 토큰 만료기한
        const refreshToken = res.headers.get('refresh'); // 리프래시 토큰
        const memberId = res.headers.get('memberid');

        axios.defaults.headers.common['Authorization'] = accessToken;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('memberId', memberId);
        localStorage.setItem('expires', expires);

        return res;
      })
      .catch((error) => {
        return error.response;
      }),

  //일반 회원가입
  signup: (formData) =>
    api
      .post('/members/signup', {
        email: formData.email,
        nickname: formData.nickname,
        password: formData.password,
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error.response;
      }),

  // 로그인 유무 확인
  isLogin: (memberId) => {
    return api
      .get(`/members/${memberId}`, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

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
