import { LOGIN, LOGOUT, RESTORE } from "./types";

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    case RESTORE:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case "FINISH_LOADING": // ⚡ nuevo tipo para acabar el loading
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
