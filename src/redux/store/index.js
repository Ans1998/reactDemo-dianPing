import {createStore, applyMiddleware} from 'redux' // 处理中间件要用applyMiddleware
import thunk from 'redux-thunk' // 处理异步(redux中间件)
import rootReducer from '../modules/index'
import api from '../middleware/api'

let store;

// 测试环境 && redux-tools有安装
if (process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, api)))
} else {
    store = createStore(rootReducer, applyMiddleware(thunk, api)) // 将中间件传入
}

export default store
