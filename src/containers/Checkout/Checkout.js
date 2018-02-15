import React, { Component } from 'react'
import { connect } from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  componentDidMount() {
    let atLeastOne = false
    for (let ingredient in this.props.ingredients) {
      atLeastOne = this.props.ingredients[ingredient] > 0
    }

    if (!atLeastOne) {
      this.props.history.goBack()
    }
  }

  onCheckoutCanceled = () => {
    this.props.history.goBack()
  }

  onCheckoutContinued = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    return (
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
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

export default connect(mapStateToProps)(Checkout)
