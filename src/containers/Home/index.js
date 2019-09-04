import React, {Component} from 'react'
import './index.css'

import Category from  './components/Category'
import Headeline from './components/Headeline'
import Discount from './components/Discount'
import LikeList from './components/LikeList/index'
import HomeHeader from './components/HomeHeader/index'
import Footer from '../../components/Footer'
import Banner from './components/Banner'
import Activity from './components/Activity'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {actions as homeActions, getLikes, getDiscounts, getPageCountOfLikes} from "../../redux/modules/ui/home";


class Home extends  Component{
    render() {
        const {likes, discounts, pageCount} = this.props
        return (
            <div>
                {/*头部导航栏*/}
                <HomeHeader></HomeHeader>
                {/*轮播图*/}
                <Banner></Banner>
                {/*功能导航栏*/}
                <Category></Category>
                {/*头条新闻*/}
                <Headeline></Headeline>
                {/*活动*/}
                <Activity></Activity>
                {/*超值特惠*/}
                <Discount data={discounts}></Discount>
                {/*猜你喜欢*/}
                <LikeList data={likes} pageCount={pageCount} fetchData={this.fetchMoreLikes}></LikeList>
                {/*底部*/}
                <Footer></Footer>
            </div>
        )
    }
    componentDidMount() {
        this.props.homeActions.loadDiscounts()
    }

    fetchMoreLikes = () => {
        this.props.homeActions.loadLikes()
    }
}

const mapStateToProps = (state, props) => {
    return {
        likes: getLikes(state),
        discounts: getDiscounts(state),
        pageCount: getPageCountOfLikes(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        homeActions: bindActionCreators(homeActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
