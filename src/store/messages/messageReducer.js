import { MODAL_SWITCH, SAVE_BOOKING_DATE, SAVE_USER_MESSAGES } from "./messageActions";

const initialState = {
  modal: false,
  all: [],
  bookingDate: "",
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_SWITCH:
      return {
        ...state,
        modal: !state.modal,
      };

    case SAVE_USER_MESSAGES:
      console.log("DOM: inside SAVE_USER_MESSAGES", action.payload);
      return {
        ...state,
        all: [...action.payload],
      };

    case SAVE_BOOKING_DATE:
      return {
        ...state,
        bookingDate: { ...action.payload },
      };

    default:
      return state;
  }
};

export default messageReducer;
