const { SAVE_ALL_BOOKINGS } = require("./bookingActions");

const initialState = {
  all: [],
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ALL_BOOKINGS: {
      return {
        ...state,
        all: [...action.payload],
      };
    }

    default:
      return state;
  }
};

export default bookingReducer;
