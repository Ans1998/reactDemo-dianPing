import React, {Component} from 'react'
import './index.css'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ErrorToast from '../../components/ErrorToast'
import {action as appActions, getError} from "../../redux/modules/ui/app"

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Home from '../Home'
import ProductDetail from '../ProductDetail'
import Search from '../Search'
import SearchResult from '../SearchResult'
import Login from '../Login'
import User from '../User'
import Purchase from '../Purchase'
import PriveateRoute from '../PriveateRoute'

class App extends  Component{
    render() {
        const {error, appActions: {clearError}} = this.props
        return (
            <div className='App'>
                <Router>
                    <Switch>
                        <Route path="/login" component={Login} />

                        <PriveateRoute path="/user" component={User}></PriveateRoute>

                        <Route path="/product/detail/:id" component={ProductDetail}></Route>

                        <Purchase path="/purchase/:id" component={Purchase}></Purchase>

                        <Route path="/search/result" component={SearchResult}></Route>
                        <Route path="/search" component={Search} />
                        <Route path="/" component={Home}></Route>
                    </Switch>
                </Router>
                { error ? <ErrorToast msg={error} clearError={clearError}></ErrorToast> : null}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        error: getError(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appActions: bindActionCreators(appActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
