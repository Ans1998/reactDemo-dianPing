import React, { Component } from 'react';
import SearchBox from './components/SearchBox'
import PopularSearch from './components/PopularSearch'
import SearchHistory from './components/SearchHistory'
import './index.css'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {actions as searchActions,
    getRelatedKeywords, getInputText,
    getHistoryKeywords, getPopularKeywords}
    from "../../redux/modules/ui/search";


class Search extends Component {
    render() {
        const {inputText, relatedKeywords, popularKeywords, historyKeywords} = this.props
        return (
            <div>
                <SearchBox inputText={inputText} relatedKeywords={relatedKeywords}
                           onChange={this.handleChangeInput}
                           onClickItem={this.handleClickItem}
                           onClear={this.handleClear}
                           onCancel={this.handleCancel}
                />
                <PopularSearch data={popularKeywords} onClickItem={this.handleClickItem}/>
                <SearchHistory data={historyKeywords}
                               onClickItem={this.handleClickItem}
                               onClear={this.handleClearHistory}
                />
            </div>
        );
    }
    // 清除历史记录
    handleClearHistory = () => {
        const {clearHistoryKeywords} = this.props.searchActions
        clearHistoryKeywords()
    }
    // 搜索框
    handleChangeInput = (text) => {
        const { setInputText, loadRelatedKeywords } = this.props.searchActions
        setInputText(text)
        loadRelatedKeywords(text)
    }
    // 点击关键词
    handleClickItem = (item) => {
        const { setInputText, addHistoryKeywords, loadRelatedShops } = this.props.searchActions
        setInputText(item.keyword)
        addHistoryKeywords(item.id)
        loadRelatedShops(item.id)
        // 跳转搜索页
        this.props.history.push('/search/result')
    }
    // 清除搜索文本框
    handleClear = () => {
        const { clearInputText } = this.props.searchActions
        clearInputText()
    }
    // 取消搜索
    handleCancel = () => {
        this.handleClear()
        this.props.history.goBack()
    }

    componentDidMount() {
        const { loadPopularKeywords } = this.props.searchActions
        loadPopularKeywords()
    }

    componentWillUnmount() {
        const {clearInputText} = this.props.searchActions
        clearInputText()
    }
}


const mapStateToProps = (state, props) => {
    console.log(state)
    return {
        relatedKeywords: getRelatedKeywords(state),
        inputText: getInputText(state),
        popularKeywords: getPopularKeywords(state),
        historyKeywords: getHistoryKeywords(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchActions: bindActionCreators(searchActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search)
