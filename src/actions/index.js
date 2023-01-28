export const CREATEUSER = "CREATEUSER";
export const LOGINUSER = "LOGINUSER";
export const LOGOUTUSER = "LOGOUTUSER";
export const DELETEALLUSERS = "DELETEALLUSERS";

export const createUser = (user) => {
  return {
    type: CREATEUSER,
    payload: user,
  };
};
export const loginUser = (user) => {
  return {
    type: LOGINUSER,
    payload: user,
  };
};
export const logoutUser = () => {
  return {
    type: LOGOUTUSER,
    payload: null,
  };
};

export const dlelteAllUser = () => {
  return {
    type: CREATEUSER,
    payload: [],
  };
};
