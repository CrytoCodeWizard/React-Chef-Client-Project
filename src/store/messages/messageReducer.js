import { MODAL_SWITCH } from "./messageActions";

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

    default:
      return state;
  }
};

export default userLoginReducer;
