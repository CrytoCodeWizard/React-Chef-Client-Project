import { axios } from "../../config/constants";
import { selectToken } from "../userLogin/userLoginSelectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/appStateActions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => {
  return {
    type: TOKEN_STILL_VALID,
    payload: userWithoutToken,
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};

export const login = ({ email, password }) => async (dispatch, getState) => {
  dispatch(appLoading());

  console.log("EMAIL / PASSWORD", email, password);

  try {
    const response = await axios.post("/login", { email, password });

    dispatch(loginSuccess(response.data));
    dispatch(
      showMessageWithTimeout(
        "success",
        false,
        `Welcome back! ${getState().userLogin.firstName}`,
        1500
      )
    );
    dispatch(appDoneLoading());
  } catch (e) {
    if (e.response) {
      console.log(e.response.data.message);
      dispatch(setMessage("danger", true, e.response.data.message));
    } else {
      console.log(e.message);
      dispatch(setMessage("danger", true, e.message));
    }
    dispatch(appDoneLoading());
  }
};

export const getUserWithStoredToken = () => async (dispatch, getState) => {
  // get token from the state
  const token = selectToken(getState());

  // if we have no token, stop
  if (token === null) return;

  dispatch(appLoading());
  try {
    // if we do have a token,
    // check wether it is still valid or if it is expired
    const response = await axios.get(`/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("ME RESPONSE", response.data);

    // token is still valid
    dispatch(tokenStillValid(response.data));
    dispatch(appDoneLoading());
  } catch (error) {
    if (error.response) {
      console.log(error.response.message);
    } else {
      console.log(error);
    }
    // if we get a 4xx or 5xx response,
    // get rid of the token by logging out
    dispatch(logOut());
    dispatch(appDoneLoading());
  }
};
