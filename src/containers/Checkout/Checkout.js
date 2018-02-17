import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
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

    if (this.props.ingredients && !this.props.purchased) {
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
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased: state.orderPurchase.purchased
  }
}


export default connect(mapStateToProps)(Checkout)
