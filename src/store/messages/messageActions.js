import { axios } from "../../config/constants";
import { showMessageWithTimeout } from "../appState/appStateActions";

export const MODAL_SWITCH = "MODAL_SWITCH";

export const switchModal = () => ({ type: MODAL_SWITCH });

export const sendMessage = (message) => async (dispatch, getState) => {
  const { userId, recipientUserId, title, content } = message;
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await axios.post(`/users/${userId}/profile/message`, {
      recipientUserId,
      title,
      content,
    });

    if (response) {
      dispatch(switchModal());
      dispatch(showMessageWithTimeout("success", false, `Booking request sent`, 1500));
    }
  } catch (e) {
    console.log(e.message);
  }
};
