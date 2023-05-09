//리액트 모듈
// import { useState } from "react";
import { BrowserRouter } from 'react-router-dom';

//레이아웃
import Header from './layout/Header';
import Footer from './layout/Footer';
import Nav from './layout/Nav';

// 페이지
import SignUp from './pages/SignUp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Nav />
        <Footer />
        <SignUp />
      </BrowserRouter>
    </div>
  );
}

export default App;
