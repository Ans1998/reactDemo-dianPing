import React, { Component } from "react";
import "./index.css";

class Remark extends Component {
    render() {
        const data = this.props.data
        return (
            <div className="remark">
                <div className="remark__header">
                    购买须知
                    <i className="remark__icon" />
                </div>
                <div className="remark__list">
                    <dl className="remark__item">
                        <dt className="remark__itemTitle">有效期</dt>
                        <dd className="remark__itemDesc">{data.validityPeriod}</dd>
                    </dl>
                    {
                        data.purchaseNotes.map((item, index) => {
                           return (
                               <dl key={index} className="remark__item">
                                   <dt className="remark__itemTitle">{item.title}</dt>
                                   <dd className="remark__itemDesc">{item.content}</dd>
                               </dl>
                           )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Remark;
