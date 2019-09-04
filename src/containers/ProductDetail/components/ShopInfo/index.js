import React, { Component } from 'react';
import "./index.css"

class ShopInfo extends Component {
    render() {
        const data = this.props.data
        const total = this.props.total
        return (
            <div className="shopInfo">
                <div className="shopInfo__header">
                    使用商户（{total}）
                    <span className="shopInfo__arrow"></span>
                </div>
                <div className="shopInfo__middle">
                    <div className="shopInfo__middleLeft">
                        <div className="shopInfo__shopName">
                            {data.shop}
                        </div>
                        <div className="shopInfo__starsWrapper">
              <span className="shopInfo__stars">
              <i className="shopInfo__stars--red" style={{"width": 2*data.star+"%"}}></i>
              </span>
                            <span className="shopInfo__distance">>100km</span>
                        </div>
                    </div>
                    <div className="shopInfo__middleRight">
                        <a href={`tel://${data.phone}`}>
                            <i className="shopInfo__phoneIcon"></i>
                        </a>
                    </div>
                </div>
                <div className="shopInfo__bottom">
                    <i className="shopInfo__locationIcon"></i>{data.address}
                </div>
            </div>
        );
    }
}

export default ShopInfo;
