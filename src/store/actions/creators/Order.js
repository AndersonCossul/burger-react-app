import * as actions from '../actions'
import axios from '../../../axios-orders'

export const purchaseBurgerStart = (order) => {
  return dispatch => {
    axios.post('/orders.json', order)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data, order))
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error))
      })
  }
}

export const purchaseBurgerSuccess = (id, order) => {
  return {
    type: actions.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    order: order
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actions.PURCHASE_BURGER_FAIL,
    error: error
  }
}