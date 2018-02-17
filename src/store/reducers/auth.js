import * as actions from '../actions/actions'

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  redirectWhenLoggedPath: '/'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_START:
      return authStart(state)
    case actions.AUTH_SUCCESS:
      return authSuccess(state, action)
    case actions.AUTH_FAIL:
      return authFail(state, action)
    case actions.AUTH_LOGOUT:
      return authLogout(state)
    case actions.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action)
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
  let message = null

  switch (action.error.message) {
    case 'EMAIL_EXISTS':
      message = 'The email address is already in use by another account.'
      break
    case 'OPERATION_NOT_ALLOWED':
      message = 'Password sign-in is disabled for this project.'
      break
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      message = 'We have blocked all requests from this device due to unusual activity. Try again later.'
      break
    case 'EMAIL_NOT_FOUND':
      message = 'There is no user record corresponding to this identifier. The user may have been deleted.'
      break
    case 'INVALID_EMAIL':
      message = 'The email is invalid.'
      break
    case 'MISSING_PASSWORD':
      message = 'The password is required.'
      break
    case 'WEAK_PASSWORD : Password should be at least 6 characters':
      message = 'The password needs to have at least 6 characters'
      break 
    case 'INVALID_PASSWORD':
      message = 'The password is invalid.'
      break
    case 'USER_DISABLED':
      message = 'The user account has been disabled by an administrator.'
      break
    default:
      message = 'Unkown Error'
  }

  const updatedError = {
    ...action.error,
    message: message
  }

  return {
    ...state,
    error: updatedError,
    loading: false
  }
}

const authLogout = (state) => {
  return {
    ...state,
    token: null,
    userId: null
  }
}

const setAuthRedirectPath = (state, action) => {
  return {
    ...state,
    redirectWhenLoggedPath: action.path
  }
}

export default reducer