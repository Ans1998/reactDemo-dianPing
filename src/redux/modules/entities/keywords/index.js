import creactReducer from '../../../../utils/creactReducer'
export const schema = {
    name: 'keywords',
    id: 'id'
}

const reducer = creactReducer(schema.name)

export default reducer

// selectors
export const getKeywordsById = (state, id) => {
    return state.entities.keywords[id]
}
