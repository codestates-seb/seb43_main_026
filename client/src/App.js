// eslint-disable-next-line import/no-unresolved
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import Header from './layout/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </div>
  );
}

export default App;
