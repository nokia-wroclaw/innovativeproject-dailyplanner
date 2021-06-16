import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import LogInPage from './components/LogInPage/LogInPage';
import MainPage from './components/MainPage/MainPage';
import ProtectedRoute from './components/AuthCheck/ProtectedRoute';
import { EmailProvider } from './components/EmailContext/EmailContext';

const App = () => (
  <EmailProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LogInPage} />
        <ProtectedRoute exact path="/app" component={MainPage} />
        <Route path="*" component={() => '404 Not Found'} />
      </Switch>
    </BrowserRouter>
  </EmailProvider>
);

export default App;
