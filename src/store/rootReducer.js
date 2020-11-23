import { combineReducers } from "redux";
import appState from "./appState/appStateReducer";
import userLogin from "./userLogin/userLoginReducer";

export default combineReducers({
  appState,
  userLogin,
});
