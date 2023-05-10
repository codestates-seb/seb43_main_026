//리액트 모듈
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//레이아웃
import Header from './layout/Header';
import Footer from './layout/Footer';
// import Nav from './layout/Nav';

// 페이지
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import MyCalendar from './pages/Calendar';
import Board from './pages/Board';

function App() {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Header handleNav={handleNav} />
        {/* <Nav nav={nav} /> */}
        <Routes>
          <Route path="/" element={<MyCalendar />} />
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
