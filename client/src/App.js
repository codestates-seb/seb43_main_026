//리액트 모듈
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

//레이아웃
import Header from './layout/Header';
import Footer from './layout/Footer';
import Nav from './layout/Nav';

// 페이지
import Landing from './pages/Landing';

import MyCalendar from './pages/Calendar/Calendar';
import CalendarAdd from './pages/Calendar/CalendarAdd';
import CalendarDetail from './pages/Calendar/CalendarDetail';
import CalendarEdit from './pages/Calendar/CalendarEdit';

import Board from './pages/Board/Board';
import BoardAdd from './pages/Board/BoardAdd';
import BoardDetail from './pages/Board/BoardDetail';
import BoardEdit from './pages/Board/BoardEdit';

import Login from './pages/User/Login';
import SignUp from './pages/User/SignUp';
import User from './pages/User/User';
import EditUser from './pages/User/EditUser';

import ScrollToTop from './component/common/ScrollToTop';
import { userAPI } from './assets/api';

function App() {
  const navigate = useNavigate();

  const [nav, setNav] = useState(false);
  const [loginUser, setLoginUser] = useState();
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  const checkLoginStatus = async () => {
    const expires = localStorage.getItem('expires');
    const currentTime = new Date();
    if (expires && new Date(expires) <= currentTime) {
      await userAPI
        .refresh()
        .then(async (res) => {
          if (res.status === 201) {
            localStorage.setItem('accessToken', res.headers.authorization);
            localStorage.setItem('expires', res.headers.authexpiration);
            const user = await userAPI.isLogin();
            setLoginUser(user);
          } else {
            userAPI.logout();
            navigate('/login');
          }
        })
        .catch((err) => console.log(err));
    } else if (expires) {
      await userAPI.isLogin().then((res) => {
        setLoginUser(res);
      });
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <div className="App">
      <ScrollToTop />
      <Header handleNav={handleNav} />
      <Nav
        nav={nav}
        setNav={setNav}
        handleNav={handleNav}
        loginUser={loginUser}
        setLoginUser={setLoginUser}
      />
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/calendar"
          element={
            <MyCalendar
              loginUser={loginUser}
              isLoginSuccess={isLoginSuccess}
              setIsLoginSuccess={setIsLoginSuccess}
            />
          }
        />
        <Route path="/calendar/add" element={<CalendarAdd />} />
        <Route path="/calendar/:scheduleid" element={<CalendarDetail />} />
        <Route path="/calendar/:scheduleid/edit" element={<CalendarEdit />} />

        <Route path="/board" element={<Board />} />
        <Route path="/board/add" element={<BoardAdd />} />
        <Route path="/board/:boardId" element={<BoardDetail />} />
        <Route path="/board/:boardId/edit" element={<BoardEdit />} />

        <Route
          path="/signup"
          element={
            <SignUp
              loginUser={loginUser}
              setIsSignupSuccess={setIsSignupSuccess}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              loginUser={loginUser}
              isSignupSuccess={isSignupSuccess}
              setIsLoginSuccess={setIsLoginSuccess}
              setLoginUser={setLoginUser}
            />
          }
        />
        <Route path="/users/:id" element={<User loginUser={loginUser} />} />
        <Route
          path="/edit/profile"
          element={
            <EditUser loginUser={loginUser} setLoginUser={setLoginUser} />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
