
import React, { Component } from 'react';
import "./index.css"

class Header extends Component {
    render() {
        const { grey, title, onBack } = this.props;
        const backgroundColor = grey ?'#f0f0f0': '#fff';
        return (
            <header className="header" style={{'backgroundColor':backgroundColor }}>
                <div className="header__back" onClick={onBack}>
                    返回
                </div>
                <div className="header__title">{title}</div>
            </header>
        );
    }
}

export default Header;
