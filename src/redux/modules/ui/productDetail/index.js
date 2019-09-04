import url from '../../../../utils/url'

import {FETCH_DATA} from "../../../middleware/api";

import {schema as shopSchema, getShopByIdCache} from '../../entities/shops'
import {schema as productSchema, getProductDetailCache, getProductById} from  '../../entities/products'

import {combineReducers} from 'redux'

export const types = { // 请求操作状态
    // 获取产品详情
    FETCH_PRODUCT_DETAIL_REQUEST: 'PRODUCT/FETCH_PRODUCT_DETAIL_REQUEST',
    FETCH_PRODUCT_DETAIL_SUCCESS: 'PRODUCT/FETCH_PRODUCT_DETAIL_SUCCESS',
    FETCH_PRODUCT_DETAIL_FAILURE: 'PRODUCT/FETCH_PRODUCT_DETAIL_FAILURE',
    // 获取关联店铺信息
    FETCH_SHOP_REQUEST: 'PRODUCT/FETCH_SHOP_REQUEST',
    FETCH_SHOP_SUCCESS: 'PRODUCT/FETCH_SHOP_SUCCESS',
    FETCH_SHOP_FAILURE: 'PRODUCT/FETCH_SHOP_FAILURE',
}

const initialState = { // 初始化数据
    product: {
        isFetching: false,
        id: null
    },
    relatedShop: {
        isFetching: false,
        id: null
    }
}

// 商品详情reducer
const product = (state = initialState.product, action) => {
    switch (action.type) {
        case types.FETCH_PRODUCT_DETAIL_REQUEST:
            return {...state, isFetching: true}
        case types.FETCH_PRODUCT_DETAIL_SUCCESS:
            return {...state, id: action.id, isFetching: false}
        case types.FETCH_PRODUCT_DETAIL_FAILURE:
            return {...state, isFetching: false, id: null}
        default:
            return state
    }
}
// 店铺的reducer
const relatedShop = (state = initialState.relatedShop, action) => {
    switch (action.type) {
        case types.FETCH_SHOP_REQUEST:
            return {...state, isFetching: true}
        case types.FETCH_SHOP_SUCCESS:
            return {...state, id: action.id, isFetching: false}
        case types.FETCH_SHOP_FAILURE:
            return {...state, isFetching: false, id: null}
        default:
            return state
    }
}

const reducer = combineReducers({
    product,
    relatedShop
})
export default reducer

// 动作
export const actions = {
    // 获取商品详情
    loadProductDetail: id => {
        return (dispatch, getState) => {
            // 数据缓存
            let state = getState()
            const product = getProductDetailCache(state, id)
            if (product) {
                return dispatch(fetchProductDetailSuccess(id))
            }
            // 发送网络请求
            const endpoint = url.getProductDetail(id) // 得到URL
            console.log(endpoint)
            // console.log(fetchProductDetail(endpoint, id))
            return dispatch(fetchProductDetail(endpoint, id)) // 发送异步actions
        }
    },
    // 获取店铺信息
    loadShopById: id => {
        return (dispatch, getState) => {
            let state = getState()
            // 数据缓存
            const shop = getShopByIdCache(state, id)
            if (shop) {
                return dispatch(fetchShopSuccess(id))
            }
            // 发送网络请求
            const endpoint = url.getShopById(id) // 得到URL
            console.log(endpoint)
            return dispatch(fetchShopById(endpoint, id)) // 发送异步actions
        }
    }
}
// 商品
const fetchProductDetail = (endpoint, id) => ({
    [FETCH_DATA]: {
        types: [
            types.FETCH_PRODUCT_DETAIL_REQUEST,
            types.FETCH_PRODUCT_DETAIL_SUCCESS,
            types.FETCH_PRODUCT_DETAIL_FAILURE
        ],
        endpoint,
        schema: productSchema
    },
    id
})

const fetchProductDetailSuccess = (id) => ({
    type: types.FETCH_PRODUCT_DETAIL_SUCCESS,
    id
})
// 店铺
const fetchShopById = (endpoint, id) =>  ({
    [FETCH_DATA]: {
        types: [
            types.FETCH_SHOP_REQUEST,
            types.FETCH_SHOP_SUCCESS,
            types.FETCH_SHOP_FAILURE
        ],
        endpoint,
        schema: shopSchema
    },
    id
})
const fetchShopSuccess = (id) => ({
    type: types.FETCH_SHOP_SUCCESS,
    id
})



// selectors

// 获取商品详情
export const getProduct = (state, id) => {
    return getProductDetailCache(state, id)
}

// 获取管理的店铺信息
export const getRelatedShop = (state, productId) => {
    const product = getProductById(state, productId)
    let shopId = product ? product.nearestShop : null
    if (shopId) {
        return getShopByIdCache(state, shopId)
    }
    return null
}
