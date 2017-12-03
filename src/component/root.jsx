import React from 'react';
import Proptypes from 'prop-types';
import { Route, Router } from 'react-router';
import { Spin } from 'antd';
import Nav from './nav/view';
import Login from './login/view';
import './root.css';

import reducers from './index';

let store;
const Loading = () => <Spin />;

const Routes = ({ history, innerStore }) => {
  store = innerStore;
  return (
    <Router history={history}>
      <Route path="/login" component={Login} />
      <Route path="/" component={Nav}>
        __ROOT_ROUTE__
      </Route>
    </Router>
  );
};

Routes.propTypes = {
  history: Proptypes.shape(),
  innerStore: Proptypes.shape(),
};

export default Routes;
