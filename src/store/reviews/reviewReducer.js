import { SAVE_ALL_REVIEWS } from "./reviewActions";

const initialState = {
  all: [],
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ALL_REVIEWS: {
      return {
        ...state,
        all: [...action.payload],
      };
    }

    default:
      return state;
  }
};

export default reviewReducer;
