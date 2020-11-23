import { DEFAULT_MESSAGE_TIMEOUT } from "../../config/constants";

export const APP_LOADING = "APP_LOADING";
export const APP_DONE_LOADING = "APP_DONE_LOADING";
export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export const appLoading = () => ({ type: APP_LOADING });
export const appDoneLoading = () => ({ type: APP_DONE_LOADING });
export const clearMessage = () => ({ type: CLEAR_MESSAGE });
export const setCurrentDate = (date) => ({ type: "SET_CURRENT_DATE", payload: date });
export const setSelectedDate = (date) => ({ type: "SET_SELECTED_DATE", payload: date });

// REFERENCE 02- DATE MECHANICS REFERENCED FROM STACK OVERFLOW
export const createDate = () => (dispatch, getState) => {
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate());
  let dateNow = currentDate.toISOString().substr(0, 10);

  dispatch(setCurrentDate(dateNow));
};

export const setMessage = (variant, dismissable, text) => {
  return {
    type: SET_MESSAGE,
    payload: {
      variant,
      dismissable,
      text,
    },
  };
};

export const showMessageWithTimeout = (variant, dismissable, text, timeOutMilliSeconds) => {
  return (dispatch) => {
    dispatch(setMessage(variant, dismissable, text));

    const timeout = timeOutMilliSeconds || DEFAULT_MESSAGE_TIMEOUT;

    setTimeout(() => dispatch(clearMessage()), timeout);
  };
};
