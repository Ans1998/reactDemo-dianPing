import url from '../../../../utils/url'
import {FETCH_DATA} from "../../../middleware/api";
import {schema} from "../../entities/products";

import {combineReducers} from 'redux'

// 请求参数使用到的常量对象
export const params = {
    PATH_LIKES: 'likes',
    PATH_DISCOUNTS: 'discounts',
    PAGE_SIZE_LIKES: 5,
    PAG_SIZE_DISCOUNTS: 3
}

export const types = {
    FETCH_LIKES_REQUEST: 'HOME/FETCH_LIKES_REQUEST', // 获取猜你喜欢请求
    FETCH_LIKES_SUCCESS: 'HOME/FETCH_LIKES_SUCCESS', // 获取猜你喜欢请求成功
    FETCH_LIKES_FAILURE: 'HOME/FETCH_LIKES_FAILURE', // 获取猜你喜欢请求失败

    FETCH_DISCOUNTS_REQUEST: 'HOME/FETCH_DISCOUNTS_REQUEST', // 获取超值特惠请求
    FETCH_DISCOUNTS_SUCCESS: 'HOME/FETCH_DISCOUNTS_SUCCESS', // 获取超值特惠请求成功
    FETCH_DISCOUNTS_FAILURE: 'HOME/FETCH_DISCOUNTS_FAILURE', // 获取超值特惠请求失败
}

const initialState = {
    likes: {
        isFetching: false,
        pageCount: 0,
        ids: []
    },
    discounts: {
        isFetching: false,
        ids: []
    }
}

export const actions = {
    // 加载猜你喜欢的数据
    loadLikes: () => {
        return (dispatch, getState) => {
            const {pageCount} = getState().ui.home.likes
            const rowIndex = pageCount * params.PAGE_SIZE_LIKES
            const endpoint = url.getProductList(params.PATH_LIKES, rowIndex, params.PAGE_SIZE_LIKES)
            return dispatch(fetchLikes(endpoint))
        }
    },
    // 加载特惠商品
    loadDiscounts: () => {
        return (dispatch, getState) => {

            const {ids} = getState().ui.home.discounts
            if (ids.length > 0) { // 不请求接口
                return null
            }
            const endpoint = url.getProductList(params.PATH_DISCOUNTS, 0, params.PAG_SIZE_DISCOUNTS)
            return dispatch(fetchDiscounts(endpoint))
        }
    }
}

const fetchLikes = endpoint => ({
    [FETCH_DATA]: {
       types: [
           types.FETCH_LIKES_REQUEST,
           types.FETCH_LIKES_SUCCESS,
           types.FETCH_LIKES_FAILURE
       ],
        endpoint,
        schema
    }
})

const fetchDiscounts = endpoint => ({
    [FETCH_DATA]: {
        types: [
            types.FETCH_DISCOUNTS_REQUEST,
            types.FETCH_DISCOUNTS_SUCCESS,
            types.FETCH_DISCOUNTS_FAILURE
        ],
        endpoint,
        schema
    }
});

// 猜你喜欢的reducer
const likes = (state = initialState.likes, action) => {
    switch (action.type) {
        case types.FETCH_LIKES_REQUEST:
            // 请求发出
            return {...state, isFetching: true};
        case types.FETCH_LIKES_SUCCESS:
            // 请求成功
            return {...state, isFetching: false, pageCount: state.pageCount+1, ids: state.ids.concat(action.res.ids)};
        case types.FETCH_LIKES_FAILURE:
            // 请求失败
            return {...state, isFetching: false};
        default:
            return state;
    }
}

// 特惠商品的reducer
const discounts = (state = initialState.discounts, action) => {
    switch (action.type) {
        case types.FETCH_DISCOUNTS_REQUEST:
            // 请求发出
            return {...state, isFetching: true};
        case types.FETCH_DISCOUNTS_SUCCESS:
            // 请求成功
            return {...state, isFetching: false, ids: state.ids.concat(action.res.ids)};
        case types.FETCH_DISCOUNTS_FAILURE:
            // 请求失败
            return {...state, isFetching: false};
        default:
            return state;
    }
}

const reducer = combineReducers({
    discounts,
    likes
})


export default reducer


// selectors

// 猜你喜欢state
export const getLikes = state => {
    return state.ui.home.likes.ids.map(id => {
        return state.entities.products[id]
    })
}
// 猜你喜欢当前页码
export const getPageCountOfLikes = state => {
    return state.ui.home.likes.pageCount
}

// 超值特惠state
export const getDiscounts = state => {
    return state.ui.home.discounts.ids.map(id => {
        return state.entities.products[id]
    })
}


