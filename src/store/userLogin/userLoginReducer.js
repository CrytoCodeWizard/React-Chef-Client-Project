import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./userLoginActions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
};

const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return {
        ...state,
        ...action.payload,
        name: `${action.payload.firstName} ${action.payload.lastName}`,
      };

    default:
      return state;
  }
};

export default userLoginReducer;
