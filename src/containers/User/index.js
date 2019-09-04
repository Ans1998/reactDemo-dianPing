import React, {Component} from 'react'
import './index.css'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {actions as userAction, getCurrentTab, getOrders} from "../../redux/modules/ui/user";
import {actions as loginAction} from "../../redux/modules/ui/login";

import UserMain from "./containers/UserMain"
import UserHeader from "./components/UserHeader"

class User extends  Component{
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
        const {orders, currentTab} = this.props
        return (
            <div>
                <UserHeader onBack={this.handleBack} onLogout={this.handleLogout} />
                <UserMain data={orders} />
            </div>
        )
    }
    handleBack = () => {
        // todo
        this.props.history.push('/')
    }

    handleLogout = () => {
        // todo
        this.props.loginAction.logout()
    }
    componentDidMount() {
        this.props.userAction.loadOrders()
    }
    // 卸载函数
    componentWillUnmount() {
    }
}

const mapStateToProps = (state, props) => {
    return {
        orders: getOrders(state),
        currentTab: getCurrentTab(state)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        userAction: bindActionCreators(userAction, dispatch),
        loginAction: bindActionCreators(loginAction, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(User)
// export default User
