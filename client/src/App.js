//리액트 모듈
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
//레이아웃
import Header from './layout/Header';
import Footer from './layout/Footer';
import Nav from './layout/Nav';
import ImageUpload from './component/common/ImageUpload';

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
        <Footer />
        <div>
          <ImageUpload />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
