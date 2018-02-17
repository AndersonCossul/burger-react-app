import * as actions from '../actions'
import axios from '../../../axios-orders'

export const purchaseInit = () => {
  return {
    type: actions.PURCHASE_INIT
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actions.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (order, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart()) // will dispatch action to start the proccess and set loading to true
    axios.post('/orders.json?auth=' + token, order)
      .then(response => {
        dispatch(resetBurger())
        dispatch(purchaseBurgerSuccess(response.data.name, order))
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error))
      })
  }
}

export const purchaseBurgerSuccess = (id, order) => {
  return {
    type: actions.PURCHASE_BURGER_SUCCESS,
    id: id,
    order: order
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actions.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const resetBurger = () => {
  return {
    type: actions.RESET_BURGER
  }
}