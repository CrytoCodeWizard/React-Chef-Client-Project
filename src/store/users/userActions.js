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
  try {
    const response = await axios.get(`/users/${id}`);

    dispatch(saveUser(response.data));
  } catch (e) {
    console.log(e.message);
  }
};

export const updateUserProfile = (updatedProfile, userId, profileId) => async (
  dispatch,
  getState
) => {
  try {
    const response = await axios.put(`/users/profile`, { ...updatedProfile, userId, profileId });

    dispatch(fetchUser(userId));

    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

export const uploadProfileImage = (base64EncodedImage) => async (dispatch, getState) => {
  const userId = getState().userLogin.id;

  try {
    const response = await axios.post("/users/profile/upload", { data: base64EncodedImage });

    dispatch(fetchUser(userId));

    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

export const addUserTag = (tagName, profileId) => async (dispatch, getState) => {
  console.log("TAGNAME AND PROFILEID", tagName, profileId);

  try {
    const response = await axios.post(`/tags/user`, {
      tagName,
      profileId,
    });

    if (response) {
      dispatch(fetchUser(profileId));
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteUserTag = (userTagId, userId) => async (dispatch, getState) => {
  try {
    const response = await axios.delete(`/tags/user`, {
      headers: { userTagId },
    });

    if (response) {
      dispatch(fetchUser(userId));
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const addAvailableDate = (availableDate) => async (dispatch, getState) => {
  const profileId = getState().users.single.id;

  try {
    // eslint-disable-next-line no-unused-vars
    const response = await axios.post(`/users/profile/availability`, { availableDate, profileId });

    dispatch(fetchUser(profileId));
  } catch (e) {
    console.log(e.message);
  }
};

export const removeAvailableDate = (availableDate) => async (dispatch, getState) => {
  const profileId = getState().users.single.id;

  try {
    // eslint-disable-next-line no-unused-vars
    const response = await axios.delete(`/users/profile/availability`, {
      headers: {
        availableDate,
        profileId,
      },
    });

    dispatch(fetchUser(profileId));
  } catch (e) {
    console.log(e.message);
  }
};
