import { axios } from "../../config/constants";

export const SAVE_ALL_REVIEWS = "SAVE_ALL_REVIEWS";

const saveAllReviews = (reviews) => {
  return {
    type: SAVE_ALL_REVIEWS,
    payload: [...reviews],
  };
};

export const fetchProfileReviews = (userId) => async (dispatch, getState) => {
  console.log("USERID", userId);

  try {
    const response = await axios.get(`/users/${userId}/profile/reviews`);

    if (response) {
      dispatch(saveAllReviews(response.data));
    }
  } catch (e) {
    console.log(e);
  }
};
