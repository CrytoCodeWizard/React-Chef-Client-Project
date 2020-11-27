import { combineReducers } from "redux";
import appState from "./appState/appStateReducer";
import appData from "./appData/appDataReducer";
import userLogin from "./userLogin/userLoginReducer";
import users from "./users/userReducer";
import messages from "./messages/messageReducer";

export default combineReducers({
  appState,
  appData,
  userLogin,
  users,
  messages,
});
