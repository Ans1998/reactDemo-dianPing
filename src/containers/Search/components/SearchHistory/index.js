import React, { Component } from 'react';
import "./index.css"

class SearchHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: ["烤鸭", "火锅", "面条"]
        }
    }

    render() {
        const {data} = this.props
        return (
            <div className="searchHistory">
                <div className="searchHistory__header">搜索记录</div>
                <ul className="searchHistory__list">
                    {
                        data.map((item, index) =>{
                            return <li key={item.id} onClick={this.handleClick.bind(this, item)}className="searchHistory__item">
                                {item.keyword}
                            </li>
                        })
                    }
                </ul>
                <div className="searchHistory__clear" onClick={this.handleClear}>清除搜索记录</div>
            </div>
        );
    }

    handleClick = (item) => {
        this.props.onClickItem(item)
    }

    handleClear = () => {
        this.props.onClear()
    }

}

export default SearchHistory;
