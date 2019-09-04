import {get} from '../../utils/request'

// 经过中间件处理的action所具有的标识
export const FETCH_DATA = 'FETCH DATA'

export default store => next => action => {
    const callAPI = action[FETCH_DATA]

    console.log(callAPI)

    if (typeof callAPI === 'undefined') {
        return next(action)
    }
    const {endpoint, schema, types} = callAPI
    if (typeof endpoint !== 'string') {
        throw new Error('endpoint必须为字符串类型的URL')
    }
    if (!schema) {
        throw new Error('必须指定领域实体的schema')
    }
    if (!Array.isArray(types) && types.length !== 3) {
        throw new Error('需要指定一个包含3个action type的数组')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('action type 必须为字符串类型')
    }

    const actionWith = data => {
        const finalAction = {...action, ...data}
        delete finalAction[FETCH_DATA]
        return finalAction
    }
    const [requestType, successType, failureType] = types

    next(actionWith({type: requestType}))

    return fetchData(endpoint, schema).then(res => next(actionWith({
        type: successType,
        res
    })),
        error => next(actionWith({
            type: failureType,
            error: error.msg || '获取数据失败'
        }))
    )
}

// 执行网络请求
const fetchData = (endpoint, schema) => {
    return get(endpoint).then(res => {
        // console.log(res)
        return normalizeData(res, schema)
    })
}
// 根据schema,将获取的数据扁平化处理
const normalizeData = (res, schema) => {
    const {id, name} = schema
    let kvObj = {}
    let ids = []
    if (Array.isArray(res)) {
        res.forEach(item => {
            kvObj[item[id]] = item
            ids.push(item[id])
        })
    } else{
        kvObj[res[id]] = res
        ids.push(res[id])
    }
    return  {
        [name]: kvObj,
        ids
    }
}
