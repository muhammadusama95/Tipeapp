import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Action from './components/Action';
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/resetpassword" component={Action} />
  </Router>,
  document.getElementById('root')
);
