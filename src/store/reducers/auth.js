import * as actions from '../actions/actions'

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_START:
      return authStart(state)
    case actions.AUTH_SUCCESS:
      return authSuccess(state, action)
    case actions.AUTH_FAIL:
    return authFail(state, action)
    default:
      return state
  }
}

const authStart = state => {
  return {
    ...state,
    loading: true
  }
}

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
  }
}

const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }
}

export default reducer