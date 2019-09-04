import React, { Component } from "react";
import "./index.css";

import {Link} from 'react-router-dom'
class ProductOverview extends Component {
    render() {
        const data = this.props.data
        return (
            <div className="productOverview">
                <div className="productOverview__header">
                    <div className="productOverview__imgContainer">
                        <img
                            alt=""
                            className="productOverview__img"
                            src={data.picture}
                        />
                    </div>
                    <div className="productOverview__baseInfo">
                        <div className="productOverview__title">{data.shop}</div>
                        <div className="productOverview__content">
                            {data.description}
                        </div>
                    </div>
                </div>
                <div className="productOverview__purchase">
                    <span className="productOverview__symbol">¥</span>
                    <span className="productOverview__price">{data.currentPrice}</span>
                    <span className="productOverview__price--old">¥{data.oldPrice}</span>
                    <Link to={`/purchase/${data.id}`} className="productOverview__btn">立即购买</Link>
                </div>
                <ul className="productOverview__remark">
                    <li className="productOverview__remarkItem">
                        <i className="productOverview__sign1" />
                        <span className="productOverview__desc">随时可退</span>
                    </li>
                    <li className="productOverview__remarkItem">
                        <i className="productOverview__sign2" />
                        <span className="productOverview__desc">过期自动退</span>
                    </li>
                </ul>
            </div>
        );
    }
}

export default ProductOverview;
