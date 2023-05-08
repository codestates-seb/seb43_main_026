//리액트 모듈
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";

//레이아웃
import Nav from "./layout/Nav";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    </div>
  );
}

export default App;
