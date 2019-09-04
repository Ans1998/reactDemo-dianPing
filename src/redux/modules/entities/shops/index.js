import creactReducer from '../../../../utils/creactReducer'
export const schema = {
    name: 'shops',
    id: 'id'
}

const reducer = creactReducer(schema.name)

export default reducer

// selectors
export const getShopByIdCache = (state, id) => {
    const shop = state.entities.shops[id]
    return shop
}
