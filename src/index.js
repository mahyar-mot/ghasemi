import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import '../node_modules/antd/dist/antd.compact.min.css'
import './assets/scss/style.scss';
import App from './App';
import {StateProvider} from "./context/store";
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
      <ConfigProvider direction="rtl">
        <App />
      </ConfigProvider>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
