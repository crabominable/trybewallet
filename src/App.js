import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './App.css';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route
          path="/carteira"
          render={ () => (
            <Wallet />
          ) }
        />
        <Route
          exact
          path="/"
          render={ () => (
            <Login />
          ) }
        />
      </Switch>
      </Router>
  );
}

export default App;
