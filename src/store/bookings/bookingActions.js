import { axios } from "../../config/constants";
import { fetchUserMessages } from "../messages/messageActions";

export const SAVE_ALL_BOOKINGS = "SAVE_ALL_BOOKINGS";

export const updateBooking = (id) => async (dispatch, getState) => {
  const userId = getState().userLogin.id;
  console.log("USERID", userId);

  try {
    const response = await axios.put("/bookings", { id });
    console.log(response);
    if (response) {
      dispatch(fetchUserMessages(userId));
    }
  } catch (e) {
    console.log(e.message);
  }
};
