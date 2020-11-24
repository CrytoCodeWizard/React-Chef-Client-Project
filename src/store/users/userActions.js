import { axios } from "../../config/constants";
import { appDoneLoading, appLoading } from "../appState/appStateActions";

export const SAVE_ALL_USERS = "SAVE_ALL_USERS";

export const saveAllUser = (users) => {
  return {
    type: "SAVE_ALL_USERS",
    payload: [...users],
  };
};

export const fetchAllUser = () => (dispatch, getState) => {
  dispatch(appLoading());
  try {
    const response = axios.get("/users");

    console.log("RESPONSE DATA", response.data);
    dispatch(appDoneLoading);
  } catch (e) {
    console.log(e);
  }
};
