import React, {Component} from 'react'
import './index.css'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class Test extends  Component{
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
            <div>

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

const mapStateToProps = (state, props) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}
// export default connect(mapStateToProps, mapDispatchToProps)(Home)
export default Test
