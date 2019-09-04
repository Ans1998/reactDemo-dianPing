import React, { Component } from 'react';
import './index.css'
import {Link} from 'react-router-dom'
class BuyButton extends Component {
    render() {
        const {productId} = this.props
        return (
            <Link to={`/purchase/${productId}`} className="buyButton">
                立即购买
            </Link>
        );
    }
}

export default BuyButton;
