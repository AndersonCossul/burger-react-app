import * as actions from '../actions'
import axios from '../../../axios-orders'

export const fetchOrdersStart = () => {
  return {
    type: actions.FETCH_ORDERS_START
  }
}

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    axios.get('/orders.json')
      .then(response => {
        const formattedOrders = []
        if (response) {
          for (let key in response.data) {
            formattedOrders.push({
              id: key,
              ...response.data[key]
            })
          }
        }
        dispatch(fetchOrdersSuccess(formattedOrders))
      })
      .catch(error => {
        dispatch(fetchOrdersFail(error))
      })
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actions.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actions.FETCH_ORDERS_FAIL,
    error: error
  }
}