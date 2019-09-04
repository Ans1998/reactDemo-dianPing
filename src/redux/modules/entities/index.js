import {combineReducers} from 'redux'

import products from './products/index'
import shops from './shops/index'
import comments from './comments/index'
import orders from './orders/index'
import keywords from './keywords/index'

// 合并领域状态
const rootEntitiesReducer = combineReducers({
    products,
    shops,
    comments,
    orders,
    keywords
})
export default rootEntitiesReducer
