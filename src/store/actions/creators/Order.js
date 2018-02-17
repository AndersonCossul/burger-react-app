import * as actions from '../actions'
import axios from '../../../axios-orders'

export const fetchOrdersStart = () => {
  return {
    type: actions.FETCH_ORDERS_START
  }
}

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
    axios.get('/orders.json' + queryParams)
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

export const deleteOrderStart = () => {
  return {
    type: actions.DELETE_ORDER_START
  }
}

export const deleteOrder = (orderId, token) => {
  return dispatch => {
    dispatch(deleteOrderStart())
    axios.delete('/orders/' + orderId + '.json?auth=' + token)
      .then(response => {
        dispatch(deleteOrderSuccess(orderId))
      })
      .catch(error => {
        dispatch(deleteOrderFail(error))
      })
  }
}

export const deleteOrderSuccess = (orderId) => {
  return {
    type: actions.DELETE_ORDER_SUCCESS,
    orderId: orderId
  }
}

export const deleteOrderFail = (error) => {
  return {
    type: actions.DELETE_ORDER_FAIL,
    error: error
  }
}