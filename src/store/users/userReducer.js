import { SAVE_ALL_USERS } from "./userActions";

const initialState = {
  all: [],
};

const userReducer = (state = initialState, action) => {
  console.log("WHAT's IN THE PAYLOAD??", action.payload);
  switch (action.type) {
    case SAVE_ALL_USERS: {
      return {
        ...state,
        all: [...action.payload],
      };
    }
    default:
      return state;
  }
};

export default userReducer;
