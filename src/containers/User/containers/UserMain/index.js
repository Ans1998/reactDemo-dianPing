import React, { Component } from "react";
import OrderItem from "../../components/OrderItem"

import Confirm from  '../../../../components/Confirm'

import "./index.css"

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {actions as userAction, getCurrentTab, getDeletingOrderId, getCurrentOrderComment, getCurrentOrderStars, getCommentingOrderId} from "../../../../redux/modules/ui/user";


// const data = [
//     {
//         id: "o-2",
//         statusText: "已消费",
//         orderPicUrl:
//             "https://p1.meituan.net/deal/95e79382c20a78da3068c4207ab7a9b4329494.jpg.webp@700w_700h_1e_1c_1l|watermark=1&&r=1&p=9&x=20&y=20",
//         channel: "团购",
//         title: "华莱士：华莱士单人套餐",
//         text: ["1张 | 总价：￥11.99", "有效期至2018-09-17"],
//         type: 1
//     }
// ];

const tabTitles = ["全部订单", "待付款", "可使用", "退款/售后"];

class UserMain extends Component {
    render() {
        const { currentTab, data, deletingOrderId } = this.props;
        return (
            <div className="userMain">
                <div className="userMain__menu">
                    {tabTitles.map((item, index) => {
                        return (
                            <div key={index} className="userMain__tab" onClick={this.handleClickTab.bind(this, index)}>
                <span
                    className={
                        currentTab === index
                            ? "userMain__title userMain__title--active"
                            : "userMain__title"
                    }
                >
                  {item}
                </span>
                            </div>
                        );
                    })}
                </div>
                <div className="userMain__content">
                    {data && data.length > 0
                        ? this.renderOrderList(data)
                        : this.renderEmpty()}
                </div>
                {
                    deletingOrderId ? this.renderConfirmDialog() : null
                }
            </div>
        );
    }
    renderConfirmDialog = () => {
        const {
            userAction: { hideDeleteDialog, removeOrder }
        } = this.props;
        return (
            <Confirm
            content="确认删除该订单吗？"
            cancelText="取消"
            confirmText="确定"
            onCancel={hideDeleteDialog}
            onConfirm={removeOrder}
            ></Confirm>
        )
    }
    renderOrderList = data => {
        const {commentingOrderId, orderStars, orderComment} = this.props
        return data.map(item => {
            return (
                <OrderItem key={item.id} data={item}
                           isCommenting={item.id === commentingOrderId}
                           comment={item.id === commentingOrderId ? orderComment : ''}
                           stars={item.id === commentingOrderId ? orderStars : 0}
                           onCommentChange={this.handleCommentChange}
                           onStarsChange={this.handleStarsChange}
                           onComment={this.handleComment.bind(this, item.id)}
                           onSubmitComment={this.handleSubmitComment}
                           onCancelComment={this.handleCancelComment}
                           noRemove={this.handleRemove.bind(this, item.id)}/>
            )
        })
    }
    // 提交评价
    handleSubmitComment = () => {
        const {userAction: {submitComment}} = this.props
        submitComment()
    }
    // 取消提交
    handleCancelComment = () => {
        const {userAction: {hideCommentArea}} = this.props
        hideCommentArea()
    }
    // 评价内容变化
    handleCommentChange = (comment) => {
        const {userAction: {setComment}} = this.props
        setComment(comment)
    }
    // 打分变化
    handleStarsChange = (stars) => {
        const {userAction: {setStars}} = this.props
        setStars(stars)
    }
    // 选中当前要评价的订单
    handleComment = (orderId) => {
        const {userAction: {showCommentArea}} = this.props
        showCommentArea(orderId)
    }
    renderEmpty = () => {
        return (
            <div className="userMain__empty">
                <div className="userMain__emptyIcon"/>
                <div className="userMain__emptyText1">您还没有相关订单</div>
                <div className="userMain__emptyText2">去逛逛看有哪些想买的</div>
            </div>
        )
    }

    handleClickTab = (index) => {
        this.props.userAction.setCurrentTab(index)
    }
    // 删除订单
    handleRemove = (orderId) => {
        this.props.userAction.showDeleteDialog(orderId)
    }
}

const mapStateToProps = (state, props) => {
    return {
        currentTab: getCurrentTab(state),
        deletingOrderId: getDeletingOrderId(state),
        commentingOrderId: getCommentingOrderId(state),
        orderStars: getCurrentOrderStars(state),
        orderComment: getCurrentOrderComment(state)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        userAction: bindActionCreators(userAction, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserMain)

