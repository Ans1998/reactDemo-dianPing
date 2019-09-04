import creactReducer from '../../../../utils/creactReducer'


export const schema = {
    id: 'id',
    name: 'orders'
}

export const USED_TYPE = 1; // 已消费
export const TO_PAY_TYPE = 2; //待付款
export const AVAILABLE_TYPE = 3; //可使用
export const REFUND_TYPE = 4; //退款

export const types = {
    // 删除订单
    DELETE_ORDERS: 'ORDERS/DELETE_ORDERS',
    // 新增评价
    ADD_COMMENT: 'ORDERS/ADD_COMMENT'
}

export const actions = {
    // 删除订单
    deleteOrder: (orderId) => ({
        type: types.DELETE_ORDERS,
        orderId
    }),
    // 新增评价
    addComment: (orderId, commentId) => ({
        type: types.ADD_COMMENT,
        orderId,
        commentId
    })
}



const normalReducer = creactReducer(schema.name)
const reducer = (state = {}, action) => {
    if (action.type === types.ADD_COMMENT) {
        return {
            ...state,
            [action.orderId]: {
                ...state[action.orderId],
                commentId: action.commentId
            }
        }
    } else if (action.type === types.DELETE_ORDERS) {
        const { [action.orderId] : deleteOrder, ...restOrders } = state
        return restOrders
    } else {
        return normalReducer(state, action)
    }
}


export default reducer

// selectors
export const getOrderById = (state, id) => {
    return state.entities.orders[id]
}
