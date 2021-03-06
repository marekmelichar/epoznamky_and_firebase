import { combineReducers } from "redux";
// import { reducer as formReducer } from "redux-form";
import Auth from "./reducer_auth";
import Notes from "./reducer_notes";
import Notification from './reducer_notification'
import UsersEmails from './reducer_users_emails'

const rootReducer = combineReducers({
  auth: Auth,
  notes: Notes,
  notification: Notification,
  users: UsersEmails
});

export default rootReducer;
