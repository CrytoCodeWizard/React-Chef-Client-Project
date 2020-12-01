import { axios } from "../../config/constants";
import { fetchUserMessages } from "../messages/messageActions";

export const SAVE_ALL_BOOKINGS = "SAVE_ALL_BOOKINGS";

export const saveAllBookings = (bookings) => {
  return {
    type: SAVE_ALL_BOOKINGS,
    payload: [...bookings],
  };
};

export const fetchBookings = (userId) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`/bookings/${userId}`);

    if (response) {
      dispatch(saveAllBookings(response.data));
    }
  } catch (e) {
    console.log(e);
  }
};

export const updateBooking = (id) => async (dispatch, getState) => {
  const userId = getState().userLogin.id;

  try {
    const response = await axios.put("/bookings", { id });

    if (response) {
      dispatch(fetchUserMessages(userId));
      dispatch(fetchBookings(userId));
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteBooking = (id) => async (dispatch, getState) => {
  const userId = getState().userLogin.id;
  console.log(userId);

  try {
    const response = await axios.delete(`/bookings/${id}`);

    if (response) {
      dispatch(fetchBookings(userId));
    }
  } catch (e) {
    console.log(e);
  }
};
