import React, { Component } from 'react'
import classes from './Orders.css'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token)
  }

  onDeleteOrder = (orderId) => {
    this.props.deleteOrder(orderId, this.props.token)
  }

  render() {
    let orders = null

    if (this.props.error) {
      orders = <p>{this.props.error}</p>
    }

    if (this.props.orders) {
      if (!this.props.orders.length) {
        orders = <p style={{ textAlign: 'center' }}>No orders found.</p>
      } else {
        orders = this.props.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
            deleted={() => this.onDeleteOrder(order.id)}
            loading={this.props.loading} />
        ))
      }
    }

    if (this.props.loading) {
      orders = <Spinner />
    }

    return (
      <div>
        <div className={classes.RefreshBlock}>
          <button>
            <img src="https://png.icons8.com/metro/26/000000/recurring-appointment.png" alt="Refresh"/>
          </button>
        </div>
          {orders}
        </div>
        )
      }
    }
    
const mapStateToProps = state => {
  return {
          orders: state.order.orders,
        loading: state.order.loading,
        error: state.order.error,
        token: state.auth.token
      }
    }
    
const mapDispatchToProps = dispatch => {
  return {
          fetchOrders: (token) => dispatch(actions.fetchOrders(token)),
        deleteOrder: (orderId, token) => dispatch(actions.deleteOrder(orderId, token))
      }
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
