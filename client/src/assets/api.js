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

  // 로그아웃
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('memberId');
    localStorage.removeItem('expires');
  },

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

  refresh: () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return api
      .get(`/members/refresh`, {
        headers: {
          Authorization: accessToken,
          Refresh: refreshToken,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  },

  // 로그인 유무 확인
  isLogin: () => {
    const memberId = localStorage.getItem('memberId');
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
        return error;
      });
  },

  //프로필 수정
  editProfile: (nickname, newPassword) => {
    const memberId = localStorage.getItem('memberId');
    if (memberId) {
      return api
        .patch(
          `/members/${memberId}`,
          {
            nickname,
            password: newPassword,
          },
          {
            headers: {
              Authorization: `${localStorage.getItem('accessToken')}`,
            },
          }
        )
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return error.response;
        });
    }
  },

  //회원탈퇴
  deleteUser: () => {
    const memberId = localStorage.getItem('memberId');
    api
      .delete(`/members/${memberId}`, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      .then(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expires');
        localStorage.removeItem('memberId');
      })
      .catch((error) => console.log(error));
  },
};
