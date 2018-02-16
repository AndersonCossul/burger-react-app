import React, { Component } from 'react'
import { connect } from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  onCheckoutCanceled = () => {
    this.props.history.goBack()
  }

  onCheckoutContinued = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    let summary = <Redirect to="/" />

    if (this.props.ingredients) {
      summary =
        <div>
          <CheckoutSummary
            ingredients={this.props.ingredients}
            price={this.props.totalPrice}
            onCheckoutCanceled={this.onCheckoutCanceled}
            onCheckoutContinued={this.onCheckoutContinued} />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData} />
        </div>
    }

    return summary
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

export default connect(mapStateToProps)(Checkout)
