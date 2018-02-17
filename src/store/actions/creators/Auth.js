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
        const idToken = response.data.idToken
        const userId = response.data.localId
        dispatch(authSuccess(idToken, userId))
      })
      .catch(error => {
        dispatch(authFail(error))
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