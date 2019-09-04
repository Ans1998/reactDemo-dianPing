import creactReducer from '../../../../utils/creactReducer'
export const schema = {
    id: 'id',
    name: 'products'
}

const reducer = creactReducer(schema.name)

export default reducer


// selectors
export const getProductDetailCache = (state, id) => {
    const product = state.entities.products[id]
    return product && product.detail && product.purchaseNotes  ?  product : null
}

export const getProductById = (state, id) => {
    return state.entities.products[id]
}
