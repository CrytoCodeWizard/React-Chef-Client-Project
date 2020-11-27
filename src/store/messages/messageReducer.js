import { MODAL_SWITCH, SAVE_USER_MESSAGES } from "./messageActions";

const initialState = {
  modal: false,
  messages: [],
};

const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_SWITCH:
      return {
        ...state,
        modal: !state.modal,
      };

    case SAVE_USER_MESSAGES:
      return {
        ...state,
        messages: [...action.payload],
      };

    default:
      return state;
  }
};

export default userLoginReducer;
