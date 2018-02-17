import * as actions from '../actions'
import axios from 'axios'

export const authStart = () => {
  return {
    type: actions.AUTH_START
  }
}

export const auth = (email, password, isRegisterForm) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    let apiURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyALSX-3oHI0mOBFSz0o2KmFlUJEYRakRpE'
    if (!isRegisterForm) {
      apiURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyALSX-3oHI0mOBFSz0o2KmFlUJEYRakRpE'
    }

    axios.post(apiURL, authData)
      .then(response => {
        console.log(response)
        dispatch(authSuccess(response.data))
      })
      .catch(error => {
        console.log(error)
        dispatch(authFail(error))
      })
  }
}

export const authSuccess = (authData) => {
  return {
    type: actions.AUTH_SUCCESS,
    authData: authData
  }
}

export const authFail = (error) => {
  return {
    type: actions.AUTH_FAIL,
    error: error
  }
}