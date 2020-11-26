import { SAVE_ALL_USERS, SAVE_USER } from "./userActions";

const initialState = {
  all: [],
  single: { profile: { availableDates: [], specializationTags: [] } },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ALL_USERS: {
      return {
        ...state,
        all: [...action.payload],
      };
    }

    case SAVE_USER: {
      return {
        ...state,
        single: { ...action.payload },
      };
    }

    default:
      return state;
  }
};

export default userReducer;
