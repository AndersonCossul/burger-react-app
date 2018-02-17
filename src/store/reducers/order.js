import * as actions from '../actions/actions'

const initialState = {
  orders: null,
  loading: false,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_ORDERS_START:
      return fetchOrdersStart(state)
    case actions.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action)
    case actions.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action)
    case actions.DELETE_ORDER_START:
      return deleteOrderStart(state)
    case actions.DELETE_ORDER_SUCCESS:
      return deleteOrderSuccess(state, action)
    case actions.DELETE_ORDER_FAIL:
      return deleteOrderFail(state, action)
    default:
      return state
  }
}

const fetchOrdersStart = state => {
  return {
    ...state,
    loading: true
  }
}

const fetchOrdersSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    orders: action.orders
  }
}

const fetchOrdersFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  }
}

const deleteOrderStart = (state) => {
  return {
    ...state,
    loading: true
  }
}

const deleteOrderSuccess = (state, action) => {
  return {
    ...state,
    orders: state.orders.filter(order => order.id !== action.orderId),
    loading: false
  }
}

const deleteOrderFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }
}

export default reducer