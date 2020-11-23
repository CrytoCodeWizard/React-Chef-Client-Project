import { combineReducers } from "redux";
import appState from "./appState/appStateReducer";
import userLoginReducer from "./userLogin/userLoginReducer";

export default combineReducers({
  appState,
  userLoginReducer,
});
