import { combineReducers } from "redux";
// import { reducer as formReducer } from "redux-form";
import Auth from "./reducer_auth";
import Notes from "./reducer_notes";
import Notification from './reducer_notification'

const rootReducer = combineReducers({
  auth: Auth,
  notes: Notes,
  notification: Notification
});

export default rootReducer;
