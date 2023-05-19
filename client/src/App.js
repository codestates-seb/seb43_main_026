//리액트 모듈
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//레이아웃
import Header from './layout/Header';
import Footer from './layout/Footer';
import Nav from './layout/Nav';

// 페이지
import MyCalendar from './pages/Calendar/Calendar';
import CalendarAdd from './pages/Calendar/CalendarAdd';
import CalendarDetail from './pages/Calendar/CalendarDetail';
import CalendarEdit from './pages/Calendar/CalendarEdit';

import Board from './pages/Board/Board';
import BoardAdd from './pages/Board/BoardAdd';
import BoardDetail from './pages/Board/BoardDetail';

import Login from './pages/User/Login';
import SignUp from './pages/User/SignUp';
import User from './pages/User/User';
import EditUser from './pages/User/EditUser';

import ScrollToTop from './component/common/ScrollToTop';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_URL;

function App() {
  const token = localStorage.getItem('accessToken');
  const memberId = localStorage.getItem('memberId');
  const [nav, setNav] = useState(false);
  const [loginUser, setLoginUser] = useState();

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    if (token) {
      axios
        .get(`${SERVER_URL}/members/${memberId}`, {
          headers: {
            Authorization: `${localStorage.getItem('accessToken')}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          console.log('hello');
          setLoginUser(res.data);
        });
    }
  }, []);

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
        />
        <Routes>
          <Route path="/" element={<MyCalendar />} />
          <Route path="/calendar/add" element={<CalendarAdd />} />
          <Route path="/calendar/:calendarid" element={<CalendarDetail />} />
          <Route path="/calendar/:calendarid/edit" element={<CalendarEdit />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/add" element={<BoardAdd />} />
          <Route path="/board/detail" element={<BoardDetail />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/login"
            element={
              <Login loginUser={loginUser} setLoginUser={setLoginUser} />
            }
          />
          <Route path="/users/:id" element={<User />} />
          <Route path="/edit/profile" element={<EditUser />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
