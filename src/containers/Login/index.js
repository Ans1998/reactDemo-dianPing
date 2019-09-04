import React, { Component } from 'react';
import LoginHeader from "./components/LoginHeader"
import LoginForm from "./components/LoginForm"

import {getPassword, getUserName, isLogin, actions as loginAction} from  '../../redux/modules/ui/login'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {Redirect} from 'react-router-dom'

class Login extends Component {
    render() {
        const {userName, password, login, location: {state}} = this.props
        if (login) {
            if (state && state.from) {
                return <Redirect to={state.from} ></Redirect>
            }
            return <Redirect to='/user'></Redirect>
        }
        return (
            <div>
                <LoginHeader/>
                <LoginForm userName={userName} password={password}
                        onChanges={this.handelChange}
                        onSubmit={this.handelSubmit}
                />
            </div>
        );
    }
    handelChange = (e) => {
        if (e.target.name === 'username') {
            this.props.loginAction.setUserName(e.target.value)
        } else if (e.target.name === 'password') {
            this.props.loginAction.setPassword(e.target.value)
        }
    }
    handelSubmit = () => {
        this.props.loginAction.login()
    }
}
const mapStateToProps = (state, props) => {
    return {
        userName: getUserName(state),
        password: getPassword(state),
        login: isLogin(state)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loginAction: bindActionCreators(loginAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
