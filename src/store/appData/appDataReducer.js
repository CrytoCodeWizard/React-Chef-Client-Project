const { SAVE_ALL_TAGS } = require("./appDataActions");

const initialState = {
  tags: [],
};

const appDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ALL_TAGS: {
      return {
        ...state,
        tags: [...action.payload],
      };
    }
    default:
      return state;
  }
};

export default appDataReducer;
