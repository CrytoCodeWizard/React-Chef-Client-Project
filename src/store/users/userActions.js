import { axios } from "../../config/constants";
import { appDoneLoading, appLoading } from "../appState/appStateActions";

export const SAVE_ALL_USERS = "SAVE_ALL_USERS";

export const saveAllUsers = (users) => {
  return {
    type: "SAVE_ALL_USERS",
    payload: [...users],
  };
};

export const fetchAllUsers = () => async (dispatch, getState) => {
  dispatch(appLoading());
  try {
    const response = await axios.get("/users");

    dispatch(saveAllUsers(response.data));
    dispatch(appDoneLoading());
  } catch (e) {
    console.log(e);
  }
};
