//리액트 모듈
// import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';

//레이아웃

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
