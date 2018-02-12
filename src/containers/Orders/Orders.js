import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount () {
    axios.get('/order.json')
      .then(response => {
        // here we'll get json objects but we want an array, so that's why it's being formatted
        const formattedOrders = []
        for (let key in response.data) {
          formattedOrders.push({
            id: key,
            ...response.data[key]
          })
        }
        this.setState({orders: formattedOrders, loading: false})
      })
      .catch(error => {
        this.setState({loading: false})
      })
  }

  render () {
    return (
      <div>
        <Order />
        <Order />
      </div>
    )
  }
}

export default withErrorHandler(Orders, axios)
