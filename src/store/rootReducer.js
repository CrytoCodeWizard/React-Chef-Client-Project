import { combineReducers } from "redux";
import appState from "./appState/appStateReducer";
import appData from "./appData/appDataReducer";
import userLogin from "./userLogin/userLoginReducer";
import users from "./users/userReducer";
import messages from "./messages/messageReducer";
import bookings from "./bookings/bookingReducer";

export default combineReducers({
  appState,
  appData,
  userLogin,
  users,
  messages,
  bookings,
});
