//리액트 모듈
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//레이아웃
import Header from './layout/Header';
import Footer from './layout/Footer';
import Nav from './layout/Nav';

// 페이지
import MyCalendar from './pages/calendarPage/Calendar';
import CalendarAdd from './pages/calendarPage/CalendarAdd';
import CalendarDetail from './pages/calendarPage/CalendarDetail';
import Board from './pages/Board/Board';
import BoardAdd from './pages/Board/BoardAdd';
import BoardDetail from './pages/Board/BoardDetail';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UserInfo from './pages/UserInfo';
import ScrollToTop from './component/common/ScrollToTop';
import Login from './pages/User/Login';
import SignUp from './pages/User/SignUp';
import User from './pages/User/User';
import EditUser from './pages/User/EditUser';


function App() {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Header handleNav={handleNav} />
        <Nav nav={nav} setNav={setNav} handleNav={handleNav} />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MyCalendar />} />
          <Route path="/calendar/add" element={<CalendarAdd />} />
          <Route path="/calendar/:calendarid" element={<CalendarDetail />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/add" element={<BoardAdd />} />
          <Route path="/board/detail" element={<BoardDetail />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/edit/profile" element={<EditUser />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
