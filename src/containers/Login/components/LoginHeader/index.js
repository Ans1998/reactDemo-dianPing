
import React, { Component } from 'react';
import {Link} from "react-router-dom"
import "./index.css"

class LoginHeader extends Component {
    render() {
        return (
            <div className="loginHeader">
                <Link to='/' className="loginHeader__back"></Link>
                <div className="loginHeader__title">账号秘密登录</div>
            </div>
        );
    }
}

export default LoginHeader;
