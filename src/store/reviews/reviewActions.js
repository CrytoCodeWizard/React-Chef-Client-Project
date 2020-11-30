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

export const postReview = (review, profileId) => async (dispatch, getState) => {
  console.log("WHAT IS IN REVIEW", review);
  try {
    const response = await axios.post(`/users/${profileId}/profile/reviews`, { ...review });

    if (response) {
      dispatch(fetchProfileReviews(profileId));
    }
  } catch (e) {
    console.log(e);
  }
};
