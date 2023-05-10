//리액트 모듈
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//레이아웃
import Header from './layout/Header';
import Footer from './layout/Footer';
import Nav from './layout/Nav';
import MyCalendar from './pages/Calendar';

// 페이지
import Board from './pages/Board';
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
          <Route path="/board" element={<Board />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
