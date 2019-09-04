import url from '../../../../utils/url'
import {FETCH_DATA} from "../../../middleware/api";
import {schema as keywordsSchema, getKeywordsById} from "../../entities/keywords";
import {schema as shopSchema, getShopByIdCache} from "../../entities/shops";

import {combineReducers} from 'redux'
export const types = {
    // 获取热门关键词
    FETCH_POPULAR_KEYWORDS_REQUEST: 'SEARCH/FETCH_POPULAR_KEYWORDS_REQUEST',
    FETCH_POPULAR_KEYWORDS_SUCCESS: 'SEARCH/FETCH_POPULAR_KEYWORDS_SUCCESS',
    FETCH_POPULAR_KEYWORDS_FAILURE: 'SEARCH/FETCH_POPULAR_KEYWORDS_FAILURE',
    // 根据输入的文本获取相关关键词
    FETCH_RELATED_KEYWORDS_REQUEST: 'SEARCH/FETCH_RELATED_KEYWORDS_REQUEST',
    FETCH_RELATED_KEYWORDS_SUCCESS: 'SEARCH/FETCH_RELATED_KEYWORDS_SUCCESS',
    FETCH_RELATED_KEYWORDS_FAILURE: 'SEARCH/FETCH_RELATED_KEYWORDS_FAILURE',
    // 设置当前输入
    SET_INPUT_TEXT: 'SEARCH/SET_INPUT_TEXT',
    CLEAR_INPUT_TEXT: 'SEARCH/CLEAR_INPUT_TEXT',
    // 历史查询记录
    ADD_HISTORY_KEYWORDS: 'SEARCH/ADD_HISTORY_KEYWORDS',
    CLEAR_HISTORY_KEYWORDS: 'SEARCH/CLEAR_HISTORY_KEYWORDS',
    // 查询
    FETCH_SHOPS_REQUEST: 'SEARCH/FETCH_SHOPS_REQUEST',
    FETCH_SHOPS_SUCCESS: 'SEARCH/FETCH_SHOPS_SUCCESS',
    FETCH_SHOPS_FAILURE: 'SEARCH/FETCH_SHOPS_FAILURE',
}

const initialState = {
    inputText: '',
    popularKeywords: {
        isFetching: false,
        ids: []
    },
    /***
     * relatedKeywords
     * {
     *     '火锅': {
     *         isFetching: false,
     *         ids: []
     *     }
     * }
     */
    relatedKeywords: {

    },
    historyKeywords: [], // 保存关键词id
    /***
     * searchedShopsByKeywords
     * {
     *     'keywordId': {
     *         isFetching: false,
     *         ids: []
     *     }
     * }
     */
    searchedShopsByKeywords: {
    }

};

export const actions = {
    // 获取热门关键词
    loadPopularKeywords: () => {
        return(dispatch, getState) => {
            const { ids } = getState().ui.search.popularKeywords
            if (ids.length > 0) {
                return null
            }
            const endpoint = url.getPopularKeywords()
            return dispatch(fetchPopularKeywords(endpoint))
        }
    },
    // 根据输入获取相关关键词
    loadRelatedKeywords: (text) => {
        return (dispatch, getState) => {
            const {relatedKeywords} = getState().ui.search
            if (relatedKeywords[text]) {
                return null
            }
            const endpoint = url.getRelatedKeywords(text)
            return dispatch(fetchRelatedKeywords(text, endpoint))
        }
    },
    // 获取查询到的店铺列表
    loadRelatedShops: keywordId => {
        return (dispatch, getState) => {
            const { searchedShopsByKeyword } = getState().ui.search
            if (searchedShopsByKeyword[keywordId]) {
                return null
            }
            const endpoint = url.getRelatedShops(keywordId)
            return dispatch(fetchRelatedShops(endpoint, keywordId))
        }
    },
    // 搜索框输入文本相关action
    setInputText: (text) => ({
        type: types.SET_INPUT_TEXT,
        text
    }),
    clearInputText: () => ({
        type: types.CLEAR_INPUT_TEXT
    }),
    // 历史查询记录相关action
    addHistoryKeywords: (keywordId) => ({
        type: types.ADD_HISTORY_KEYWORDS,
        text: keywordId
    }),
    clearHistoryKeywords: () => ({
        type: types.CLEAR_HISTORY_KEYWORDS
    })
}
// 搜索店铺结果页面 网络请求
const fetchRelatedShops = (endpoint, text) => ({
    [FETCH_DATA]: {
        types: [
            types.FETCH_SHOPS_REQUEST,
            types.FETCH_SHOPS_SUCCESS,
            types.FETCH_SHOPS_FAILURE
        ],
        endpoint,
        schema: shopSchema
    },
    text
})

const fetchPopularKeywords = (endpoint) => ({
    [FETCH_DATA]: {
       types: [
           types.FETCH_POPULAR_KEYWORDS_REQUEST,
           types.FETCH_POPULAR_KEYWORDS_SUCCESS,
           types.FETCH_POPULAR_KEYWORDS_FAILURE
       ],
        endpoint,
        schema: keywordsSchema
    }

})

const fetchRelatedKeywords = (text, endpoint) => ({
    [FETCH_DATA]: {
        types: [
            types.FETCH_RELATED_KEYWORDS_REQUEST,
            types.FETCH_RELATED_KEYWORDS_SUCCESS,
            types.FETCH_RELATED_KEYWORDS_FAILURE
        ],
        endpoint,
        schema: keywordsSchema
    },
    text
})


// reduers
const popularKeywords = (state = initialState.popularKeywords, action) => {
    switch (action.type) {
        case types.FETCH_POPULAR_KEYWORDS_REQUEST:
            return {...state, isFetching: true}
        case types.FETCH_POPULAR_KEYWORDS_SUCCESS:
            return {...state, isFetching: false, ids: state.ids.concat(action.res.ids)}
        case types.FETCH_POPULAR_KEYWORDS_FAILURE:
            return {...state, isFetching: false}
        default:
            return state
    }
}

const relatedKeywords = (state = initialState.relatedKeywords, action) => {
    switch (action.type) {
        case types.FETCH_RELATED_KEYWORDS_REQUEST:
        case types.FETCH_RELATED_KEYWORDS_SUCCESS:
        case types.FETCH_RELATED_KEYWORDS_FAILURE:
            return {
                ...state,
                [action.text]: relatedKeywordsByText(state[action.text], action)
            }
        default:
            return state
    }
}

const relatedKeywordsByText = (state = {isFetching: false, ids: []}, action) => {
    switch (action.type) {
        case types.FETCH_RELATED_KEYWORDS_REQUEST:
            return {...state, isFetching: true}
        case types.FETCH_RELATED_KEYWORDS_SUCCESS:
            return {...state, isFetching: false, ids: state.ids.concat(action.res.ids)}
        case types.FETCH_RELATED_KEYWORDS_FAILURE:
            return {...state, isFetching: false}
        default:
            return state
    }
}

const inputText = (state = initialState.inputText, action) => {
    switch (action.type) {
        case types.SET_INPUT_TEXT:
            return action.text
        case types.CLEAR_INPUT_TEXT:
            return ''
        default:
            return state
    }
}

const historyKeywords = (state = initialState.historyKeywords, action) => {
    switch (action.type) {
        case types.ADD_HISTORY_KEYWORDS:
            const data = state.filter(item => {
                if (item !== action.text) {
                    return true
                }
                return false
            })
            return [action.text, ...data]
        case types.CLEAR_HISTORY_KEYWORDS:
            return []
        default:
            return state
    }
}

// 搜索店铺
const searchedShopsByKeyword = (state = initialState.searchedShopsByKeywords, action) => {
    switch (action.type) {
        case types.FETCH_SHOPS_REQUEST:
        case types.FETCH_SHOPS_SUCCESS:
        case types.FETCH_SHOPS_FAILURE:
            return {
                ...state,
                [action.text]: searchedShops(state[action.text], action)
            }
        default:
            return state
    }
}

const searchedShops = (state = {isFetching: false, ids: []}, action) => {
    switch (action.type) {
        case types.FETCH_SHOPS_REQUEST:
            return {...state, isFetching: true}
        case types.FETCH_SHOPS_SUCCESS:
            return {...state, isFetching: false, ids: state.ids.concat(action.res.ids)}
        case types.FETCH_SHOPS_FAILURE:
            return {...state, isFetching: false}
        default:
            return state
    }
}


const reducer = combineReducers({
    popularKeywords,
    relatedKeywords,
    inputText,
    historyKeywords,
    searchedShopsByKeyword
})

export default reducer


// selectors
export const getPopularKeywords = state => {
    return state.ui.search.popularKeywords.ids.map(id => {
        return getKeywordsById(state, id)
    })
}

export const getRelatedKeywords = state => {
    const text = state.ui.search.inputText
    if (!text || text.trim().length === 0) {
        return []
    }
    const relatedKeywords = state.ui.search.relatedKeywords[text]
    if (!relatedKeywords) {
        return []
    }
    return relatedKeywords.ids.map(id => {
        return getKeywordsById(state, id)
    })
}

export const getInputText = state => {
    return state.ui.search.inputText
}

export const getHistoryKeywords = state => {
    return state.ui.search.historyKeywords.map(id => {
        return getKeywordsById(state, id)
    })
}
// 查询店铺列表
export const getSearchedShops = (state) => {
    const keywordId = state.ui.search.historyKeywords[0]
    if (!keywordId) {
        return []
    }
    const shops = state.ui.search.searchedShopsByKeyword[keywordId]
    return shops.ids.map(id => {
        return getShopByIdCache(state, id)
    })
}
// 获取当前关键词
export const getCurrentKeyword = (state) => {
    const keywordId = state.ui.search.historyKeywords[0]
    if (!keywordId) {
        return ''
    }
    return getKeywordsById(state, keywordId).keywords
}
