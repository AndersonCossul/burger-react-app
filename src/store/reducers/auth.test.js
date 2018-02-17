import reducer from './auth'
import * as actions from '../actions/actions'

describe('auth reducer', () => {
  const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    redirectWhenLoggedPath: '/'
  }

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should store the token upon login', () => {
    const expectedState = {
      ...initialState,
      token: 'some-token',
      userId: 'some-user-id'
    }
    expect(reducer(initialState, {
      type: actions.AUTH_SUCCESS,
      idToken: 'some-token',
      userId: 'some-user-id'
    })).toEqual(expectedState)
  })
})