import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import LogInPage from './components/LogInPage/LogInPage';
import MainPage from './components/MainPage/MainPage';

const App = () => (
  <BrowserRouter>
    <Route exact path="/" component={LogInPage} />
    <Route exact path="/app" component={MainPage} />
  </BrowserRouter>
);

export default App;
