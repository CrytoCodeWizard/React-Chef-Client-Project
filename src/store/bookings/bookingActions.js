import { axios } from "../../config/constants";

export const SAVE_ALL_BOOKINGS = "SAVE_ALL_BOOKINGS";

export const createBooking = (date) => async (dispatch, getState) => {
  console.log(date);

  try {
    const response = await axios.post("/bookings", { date });

    console.log(response);
  } catch (e) {
    console.log(e.message);
  }
};
