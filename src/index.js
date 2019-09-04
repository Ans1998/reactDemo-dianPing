import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/index';

import {Provider} from 'react-redux'
import store from './redux/store/index'
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
