import { axios } from "../../config/constants";
import { showMessageWithTimeout } from "../appState/appStateActions";

export const MODAL_SWITCH = "MODAL_SWITCH";
export const SAVE_USER_MESSAGES = "SAVE_USER_MESSAGES";
export const SAVE_BOOKING_DATE = "SAVE_BOOKING_DATE";

export const switchModal = () => ({ type: MODAL_SWITCH });

export const saveUserMessages = (messages) => {
  return {
    type: SAVE_USER_MESSAGES,
    payload: [...messages],
  };
};

export const saveBookingDate = (day) => {
  return {
    type: SAVE_BOOKING_DATE,
    payload: { ...day },
  };
};

export const sendMessage = (message) => async (dispatch, getState) => {
  console.log("MESSAFE IN SENDMESSAGE ACTION", message);
  const { userId, recipientUserId, title, content, date } = message;
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await axios.post(`/users/${userId}/profile/message`, {
      userId,
      recipientUserId,
      title,
      content,
      date,
    });

    if (response) {
      dispatch(switchModal());
      dispatch(showMessageWithTimeout("success", false, `Booking request sent`, 1500));
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchUserMessages = (id) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`/users/${id}/profile/message`);

    dispatch(saveUserMessages(response.data));
  } catch (e) {
    console.log(e.message);
  }
};
