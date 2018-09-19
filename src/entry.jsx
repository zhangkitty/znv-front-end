import 'classnames';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import hashHistory from 'shein-lib/history';
import store from './createStore';
import RootView from './component/root';

const root = (
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <RootView history={hashHistory} innerStore={store} />
    </LocaleProvider>
  </Provider>
);

render(
  root,
  document.getElementById('container'),
);
