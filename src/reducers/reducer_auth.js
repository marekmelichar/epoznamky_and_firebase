import {
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
} from "../actions";

let INIT_STATE = {
  email: '',
  password: '',
  user: null,
  error: ''
}

export default function(state = INIT_STATE, action) {
  switch (action.type) {
    case SIGNUP_USER_SUCCESS:
      return { ...state, user: action.payload }

    case SIGNUP_USER_FAIL:
      return { ...state, error: action.payload }

    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload }

    case LOGIN_USER_FAIL:
      return { ...state, error: action.payload }

    default:
      return state;
  }
}
