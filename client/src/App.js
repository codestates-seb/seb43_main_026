//리액트 모듈
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
//레이아웃
import Header from './layout/Header';
// import Footer from './layout/Footer';
import Nav from './layout/Nav';
// import MyCalendar from './pages/Calendar';
// import Board from './pages/Board';

// 페이지
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
        <Nav nav={nav} />
        {/* <Routes>
          <Route path="/" element={<MyCalendar />} />
          <Route path="/board" element={<Board />} />
        </Routes>
        <Footer /> */}
        <SignUp />
      </BrowserRouter>
    </div>
  );
}

export default App;
