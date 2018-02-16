import { USERS_EMAILS } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case USERS_EMAILS:
      return action.payload

    default:
      return state;
  }
}
