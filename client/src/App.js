//리액트 모듈
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

//레이아웃
import Header from './layout/Header';
import Nav from './layout/Nav';
import Footer from './layout/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Nav />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
