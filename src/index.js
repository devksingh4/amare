import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home/Home';
import NotFound from './NotFound/NotFound';
import reportWebVitals from './reportWebVitals';
import {
  HashRouter as Router,
  Route,
  Switch
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
            <Router>
            <Switch>
                <Route path="/" exact     component={ Home } />
                <Route path="/home" exact     component={ Home } />
                <Route component={NotFound} />
            </Switch>
        </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
