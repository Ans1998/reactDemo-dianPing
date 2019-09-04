import React, {Component} from 'react'
import './index.css'

import {Link} from 'react-router-dom'
class HomeHeader extends  Component{
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
        return (
            <div className="homeHeader">
                <header className="homeHeader__wrapper">
                    <a href="javascipt:;" className="homeHeader__city">北京</a>
                    <Link to="/search" className="homeHeader__search">输入商户名、地点</Link>
                    <Link to="/user" className="homeHeader__self">
                        <div className="homeHeader__portrait"/>
                    </Link>
                </header>
            </div>
        )
    }
    // 页面加载完
    componentDidMount() {
    }
    // 卸载函数
    componentWillUnmount() {
    }
}
export default HomeHeader
