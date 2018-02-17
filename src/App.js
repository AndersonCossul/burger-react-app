import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'
import Layout from './hoc/Layout/Layout'
import asyncComponent from './hoc/asyncComponent/asyncComponent'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

// lazy load
const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})

const asyncLogout = asyncComponent(() => {
  return import('./containers/Auth/Logout/Logout')
})

class App extends Component {
  componentDidMount() {
    this.props.tryAutoLogin()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/login" component={asyncAuth} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={asyncLogout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <BrowserRouter>
        <Layout>
          {routes}
        </Layout>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tryAutoLogin: () => dispatch(actions.tryAutoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
