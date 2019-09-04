import creactReducer from '../../../../utils/creactReducer'


export const schema = {
    id: 'id',
    name: 'comments'
}

export const types = {
    ADD_COMMENT: 'COMMENT/ADD_COMMENT'
}

export const actions = {
    addComment: (comment) => ({
        type: types.ADD_COMMENT,
        comment
    })
}

const normalReducer = creactReducer(schema.name)

const reducer = (state = {}, action) => {
    if (action.type === types.ADD_COMMENT) {
        return {...state, [action.comment.id]: action.comment}
    } else {
        return normalReducer(state, action)
    }
}

export default reducer
