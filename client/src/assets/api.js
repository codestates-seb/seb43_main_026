import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_URL;

const api = axios.create(
  {
    baseURL: SERVER_URL,
  },
  { withCredentials: true }
);

// 액세스 토큰이 만료되었는지 확인하는 함수
// const isAccessTokenExpired = () => {
//   const expiresUTC = localStorage.getItem('expires');
//   if (!expiresUTC) {
//     // 만료 기한 정보가 없을 경우, accessToken이 만료되었다고 가정합니다.
//     return true;
//   }
//   const expires = new Date(expiresUTC);
//   const currentUTC = new Date();

//   // 현재 UTC 시간과 만료 기한을 비교하여 accessToken이 만료되었는지 확인합니다.
//   return expires <= currentUTC;
// };

// // Request 인터셉터: 모든 요청 전에 실행됩니다.
// api.interceptors.request.use(async (config) => {
//   if (isAccessTokenExpired()) {
//     // accessToken이 만료되었을 경우, 적절한 처리를 수행합니다.
//     console.log('accessToken이 만료되었습니다.');
//     const refreshToken = localStorage.getItem('refreshToken');
//     if (refreshToken) {
//       try {
//         // refreshToken을 사용하여 새로운 accessToken을 요청합니다.
//         const response = await api.post('/refresh-token', { refreshToken });
//         const newAccessToken = response.data.accessToken;

//         // 발급받은 새로운 accessToken으로 헤더를 업데이트합니다.
//         config.headers.Authorization = newAccessToken;
//         axios.defaults.headers.common['Authorization'] = newAccessToken;
//         localStorage.setItem('accessToken', newAccessToken);
//         console.log('새로운 accessToken을 발급받았습니다.');
//       } catch (error) {
//         console.log('새로운 accessToken 발급에 실패했습니다.');
//         // refreshToken을 사용하여 accessToken 갱신에 실패한 경우, 로그아웃 등 적절한 처리를 수행할 수 있습니다.
//       }
//     } else {
//       console.log('refreshToken이 없습니다.');
//       // refreshToken이 없는 경우, 로그아웃 등 적절한 처리를 수행할 수 있습니다.
//     }
//   } else {
//     // accessToken이 유효한 경우
//     console.log('accessToken이 유효합니다.');
//   }
//   return config;
// });

// // Response 인터셉터: 모든 응답 후에 실행됩니다.
// api.interceptors.response.use(
//   (response) => {
//     console.log('인터셉터', response);
//     return response;
//   },
//   (error) => {
//     // 응답 에러 처리를 수행할 수 있습니다.
//     console.log('응답 인터셉터', error);
//     return Promise.reject(error);
//   }
// );

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
        console.log(error);
      });
  },

  //google 로그인
  googleLogIn: (code) => api.get(`/auth/google/callback?code=${code}`),

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
