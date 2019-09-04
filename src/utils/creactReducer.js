const createReducer = (name) => {
    return (state = {}, action) => {
        if (action.res && action.res[name]) {
            return {...state, ...action.res[name]}
        }
        return state
    }
}

export default createReducer
