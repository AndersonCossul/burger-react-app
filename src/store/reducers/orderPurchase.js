import * as actions from '../actions/actions'

const initialState = {
  loading: false,
  purchased: false,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PURCHASE_INIT:
      return purchaseInit(state)
    case actions.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state)
    case actions.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action)
    case actions.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action)
    default:
      return state
  }
}

const purchaseInit = state => {
  return {
    ...state,
    purchased: false
  }
}

const purchaseBurgerStart = state => {
  return {
    ...state,
    loading: true
  }
}

const purchaseBurgerSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    purchased: true
  }
}

const purchaseBurgerFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  }
}

export default reducer