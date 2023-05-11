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
import Board from './pages/Board';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

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
        <Routes>
          <Route path="/" element={<MyCalendar />} />
          <Route path="/calendar/add" element={<CalendarAdd />} />
          <Route path="/board" element={<Board />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
