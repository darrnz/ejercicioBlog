import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BlogContextProvider} from './context/articles/provider'
import AddEditBtnProvider from './context/addEditBtn/provider'

ReactDOM.render(
  <React.StrictMode>
    <AddEditBtnProvider>
    <BlogContextProvider>
    
      <App />
    
    </BlogContextProvider>
    </AddEditBtnProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
