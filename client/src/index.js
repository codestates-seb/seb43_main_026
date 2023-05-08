// import React from "react";
// eslint-disable-next-line import/no-unresolved
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line import/no-unresolved
import App from './App';
// eslint-disable-next-line import/no-unresolved
import GlobalStyle from './style/GlobalStyle';

// eslint-disable-next-line import/no-unresolved
import { ThemeProvider } from 'styled-components';
// eslint-disable-next-line import/no-unresolved

import { ThemeProvider } from 'styled-components';

import theme from './style/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </>
);
