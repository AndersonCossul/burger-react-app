import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrdersStart()
    this.props.onFetchOrders()
  }

  render() {
    let orders = <Spinner />

    if (this.props.error) {
      orders = <p>Couldn't fetch the orders!</p>
    }

    if (this.props.orders) {
      if (!this.props.orders.length) {
        orders = <p style={{textAlign: 'center'}}>No orders found.</p>
      } else {
        orders =
          <div>
            {
              this.props.orders.map(order => (
                <Order
                  key={order.id}
                  ingredients={order.ingredients}
                  price={order.price} />
              ))
            }
          </div>
      }
    }

    return orders
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.order.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrdersStart: () => dispatch(actions.fetchOrdersStart()),
    onFetchOrders: () => dispatch(actions.fetchOrders()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
