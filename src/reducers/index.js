import { combineReducers } from "redux";
// import { reducer as formReducer } from "redux-form";
import Auth from "./reducer_auth";
import Notes from "./reducer_notes";

const rootReducer = combineReducers({
  auth: Auth,
  notes: Notes
});

export default rootReducer;
