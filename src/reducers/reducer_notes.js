import { FETCH_NOTES_SUCCESS } from "../actions";

let INIT_STATE = {

}

export default function(state = INIT_STATE, action) {
  switch (action.type) {
    case FETCH_NOTES_SUCCESS:
    // {...state, [id]: action.payload}
    return action.payload // it is object already

    default:
      return state;
  }
}
