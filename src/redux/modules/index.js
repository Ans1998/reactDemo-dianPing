import {combineReducers} from 'redux'

import entities from './entities/index'
import ui from './ui/index'


// 合并成根reducer
const rootReducer = combineReducers({
    entities,
    ui
})

export default rootReducer
