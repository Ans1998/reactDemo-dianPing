import React, {Component} from 'react'
import './index.css'

import ProductOverview from "./components/ProductOverview"
import ShopInfo from './components/ShopInfo'
import Detail from './components/Detail'
import Remark from './components/Remark'
import BuyButton from './components/BuyButton'

import Header from '../../components/Header'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {actions as productActions, getProduct, getRelatedShop} from '../../redux/modules/ui/productDetail'

class ProductDetail extends  Component{
    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    // 挂载函数
    componentWillMount() {
    }
    render() {
        const {product, relatedShop} = this.props
        return (
            <div>
                <Header title="团购详情" onBack={this.handleBack} grey></Header>
                {
                    product && <ProductOverview data={product}></ProductOverview>
                }
                {
                    relatedShop && (<ShopInfo data={relatedShop} total={product.shopIds.length}></ShopInfo>)
                }
                {
                    product &&  (
                        <div>
                            <Detail data={product}></Detail>
                            <Remark data={product}></Remark>
                            <BuyButton productId={product.id}></BuyButton>
                        </div>
                       )
                }
            </div>
        )
    }
    handleBack = () => {
        this.props.history.goBack()
    }
    componentDidMount() {
        const { product } = this.props;
        if (!product) {
            const productId = this.props.match.params.id;
            this.props.productActions.loadProductDetail(productId);
        } else if (!this.props.relatedShop) {
            this.props.productActions.loadShopById(product.nearestShop);
        }
    }

    componentDidUpdate(preProps) {
        // 第一次获取到产品详情时，需要继续获取关联的店铺信息
        if (!preProps.product && this.props.product) {
            this.props.productActions.loadShopById(this.props.product.nearestShop);
        }
    }
    // 卸载函数
    componentWillUnmount() {
    }
}

const mapStateToProps = (state, props) => {
    console.log(state)
    const productId = props.match.params.id
    return {
        product: getProduct(state, productId),
        relatedShop: getRelatedShop(state, productId)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        productActions: bindActionCreators(productActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
