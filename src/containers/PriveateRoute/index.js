
import React, {Component} from 'react'
import './index.css'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {Route, Redirect} from 'react-router-dom'

import {isLogin} from "../../redux/modules/ui/login";

class PriveateRoute extends  Component{
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
        const {component: Component, login, ...rest} = this.props
        return (
                <Route
                    {...rest}
                    render={
                    (props) => {
                        return login ? (<Component {...props} />) : (
                            // 跳转登录并保存当前页面
                            <Redirect to={{
                                pathname: '/login',
                                state: {from: props.location}
                            }}></Redirect>
                        )
                    }
                }>

                </Route>
        )
    }
    // 页面加载完
    componentDidMount() {
    }
    // 卸载函数
    componentWillUnmount() {
    }
}

const mapStateToProps = (state, props) => {
    return {
        login: isLogin(state)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PriveateRoute)
// export default PriveateRoute
