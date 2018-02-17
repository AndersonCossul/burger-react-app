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
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)

        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem('expirationDate', expirationDate)
        localStorage.setItem('userId', userId)
        
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
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('userId')

  return dispatch => {
    dispatch(resetBurger())
    dispatch(logoutAction())
  }
}

export const logoutAction = () => {
  return {
    type: actions.AUTH_LOGOUT
  }
}

export const setAuthRedirectPath = path => {
  return {
    type: actions.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const resetBurger = () => {
  return {
    type: actions.RESET_BURGER
  }
}

export const tryAutoLogin = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token, userId))
        const newExpirationDate = (expirationDate.getTime() - new Date().getTime()) / 1000
        dispatch(checkAuthTimeout(newExpirationDate))
      } else {
        dispatch(logout())
      }
    }
  }
}