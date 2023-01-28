import { CREATEUSER, DELETEALLUSERS, LOGINUSER, LOGOUTUSER } from "../actions";

const INITIAL_STATE = {
  loggedInUser: {},
  users: [],
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATEUSER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case LOGINUSER:
      return {
        ...state,
        loggedInUser: action.payload,
      };
    case LOGOUTUSER:
      return {
        ...state,
        loggedInUser: {},
      };
    case DELETEALLUSERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};
