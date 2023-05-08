// eslint-disable-next-line import/no-unresolved
import { BrowserRouter } from 'react-router-dom';

// eslint-disable-next-line import/no-unresolved
import Header from './layout/Header';

import Footer from './layout/Footer.jsx';


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
