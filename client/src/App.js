//리액트 모듈
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

function App() {
  const [nav, setNav] = useState(false);
  const [loginUser, setLoginUser] = useState();
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="App">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
