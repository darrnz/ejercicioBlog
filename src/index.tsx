import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BlogContextProvider} from './context/articles/provider'
ReactDOM.render(
  <React.StrictMode>
    <BlogContextProvider>
    <App />
    </BlogContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
