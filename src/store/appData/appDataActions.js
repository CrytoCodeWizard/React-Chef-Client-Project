import { axios } from "../../config/constants";

export const SAVE_ALL_TAGS = "SAVE_ALL_TAGS";

export const saveAllTags = (tags) => {
  return {
    type: SAVE_ALL_TAGS,
    payload: [...tags],
  };
};

export const fetchAllTags = () => async (dispatch, getState) => {
  try {
    const response = axios.get("/tags");

    dispatch(saveAllTags(response.data));
  } catch (e) {
    console.log(e.message);
  }
};
