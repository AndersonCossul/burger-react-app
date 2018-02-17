import * as actions from '../actions'
import axios from 'axios'

export const authStart = () => {
  return {
    type: actions.AUTH_START
  }
}

export const auth = (email, password, isLoginForm) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    let apiURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyALSX-3oHI0mOBFSz0o2KmFlUJEYRakRpE'
    if (isLoginForm) {
      apiURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyALSX-3oHI0mOBFSz0o2KmFlUJEYRakRpE'
    }

    axios.post(apiURL, authData)
      .then(response => {
        const idToken = response.data.idToken
        const userId = response.data.localId
        dispatch(authSuccess(idToken, userId))
        dispatch(checkAuthTimeout(response.data.expiresIn))
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error))
      })
  }
}

export const authSuccess = (idToken, userId) => {
  return {
    type: actions.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId
  }
}

export const authFail = (error) => {
  return {
    type: actions.AUTH_FAIL,
    error: error
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}

export const logout = () => {
  return {
    type: actions.AUTH_LOGOUT
  }
}