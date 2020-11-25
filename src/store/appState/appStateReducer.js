import {
  APP_LOADING,
  APP_DONE_LOADING,
  SET_MESSAGE,
  CLEAR_MESSAGE,
  SET_CURRENT_DATE,
  SET_SELECTED_DATE,
} from "./appStateActions";

const initialState = {
  loading: false,
  message: null,
  currentDate: "",
  selectedDate: "",
};

const appStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_LOADING:
      return { ...state, loading: true };

    case APP_DONE_LOADING:
      return { ...state, loading: false };

    case SET_MESSAGE:
      return { ...state, message: action.payload };

    case CLEAR_MESSAGE:
      return { ...state, message: null };

    case SET_CURRENT_DATE: {
      return { ...state, currentDate: action.payload };
    }
    case SET_SELECTED_DATE: {
      return { ...state, selectedDate: action.payload };
    }

    default:
      return state;
  }
};

export default appStateReducer;
