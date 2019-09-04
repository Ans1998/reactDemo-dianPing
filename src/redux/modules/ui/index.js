import {combineReducers} from 'redux'
import app from './app/index'
import detail from './productDetail/index'
import home from './home/index'
import search from './search/index'
import login from './login/index'
import user from './user/index'
import purchase from './purchase/index'
// 合并领域状态
const rootUiReducer = combineReducers({
    app,
    detail,
    home,
    search,
    login,
    user,
    purchase
})

export default rootUiReducer
