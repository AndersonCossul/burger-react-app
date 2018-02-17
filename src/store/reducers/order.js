import * as actions from '../actions/actions'

const initialState = {
  orders: [],
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

export default reducer