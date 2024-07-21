import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppBar from './components/AppBar/AppBar';
import store from './redux/store';
import './styles/index.scss';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppBar />
      </BrowserRouter>
    </Provider>
  );
};

export default App;