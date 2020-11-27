import { axios } from "../../config/constants";

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

    dispatch(switchModal());
  } catch (e) {
    console.log(e.message);
  }
};
