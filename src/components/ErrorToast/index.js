import React, {Component} from 'react'
import './index.css'
class ErrorToast extends  Component{
    render() {
        const {msg} = this.props
        return (
            <div className="errorToast">
                <div className="errorToast_text">
                    {msg}
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.props.clearError()
        }, 3000)
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
    }
}
export default ErrorToast
