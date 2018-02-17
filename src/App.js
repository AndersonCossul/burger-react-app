import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from './store/actions/index'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {
  componentDidMount() {
    this.props.tryAutoLogin()
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/login" exact component={Auth} />
          <Route path="/logout" exact component={Logout} />
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tryAutoLogin: () => dispatch(actions.tryAutoLogin())
  }
}

export default connect(null, mapDispatchToProps)(App);
