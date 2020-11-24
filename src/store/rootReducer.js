import { combineReducers } from "redux";
import appState from "./appState/appStateReducer";
import userLogin from "./userLogin/userLoginReducer";
import users from "./users/userReducer";

export default combineReducers({
  appState,
  userLogin,
  users,
});
