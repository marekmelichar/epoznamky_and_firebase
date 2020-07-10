import { ADD_NOTIFICATION } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return Object.assign({}, state, {
        message: action.message,
        level: action.level
      });

    default:
      console.debug('notification reducer :: hit default', action.type);
      return state;
  }
}
