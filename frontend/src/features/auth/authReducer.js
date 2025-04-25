import { LOGIN, LOGOUT, RESTORE } from "./types";

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        isAuthenticated: false,
        user: null,
      };
    case RESTORE:
      return {
        isAuthenticated: !!action.payload,
        user: action.payload,
      };
    default:
      return state;
  }
};
