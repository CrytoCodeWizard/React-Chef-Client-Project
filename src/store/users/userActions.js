import { axios } from "../../config/constants";
import { appDoneLoading, appLoading } from "../appState/appStateActions";

export const SAVE_ALL_USERS = "SAVE_ALL_USERS";
export const SAVE_USER = "SAVE_USER";

export const saveAllUsers = (users) => {
  return {
    type: SAVE_ALL_USERS,
    payload: [...users],
  };
};

export const saveUser = (user) => {
  return {
    type: SAVE_USER,
    payload: { ...user },
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

export const fetchUser = (id) => async (dispatch, getState) => {
  dispatch(appLoading());

  try {
    const response = await axios.get(`/users/${id}`);

    dispatch(saveUser(response.data));
    dispatch(appDoneLoading());
  } catch (e) {
    console.log(e);
  }
};

export const deleteUserTag = (tagId, userId) => async (dispatch, getState) => {
  try {
    const response = await axios.delete(`/tags/user`, {
      headers: { tagId },
    });

    dispatch(fetchUser(userId));

    console.log(response);
  } catch (e) {
    console.log(e);
  }
};
