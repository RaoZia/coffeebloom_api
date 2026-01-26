// ######################### All Success and Error messages will be shown from this file ###############################

const success = {
  USER_REGISTER: "User Register Successfully",
  USER_LOGIN: "User Login Successfully",
  ALL_USERS: "All users fetched",
  SINGLE_USER: "User fetched successfully",
  USER_UPDATED: "User update successfully",
};
const error = {
  EMAIL_EXIST: "This Email is already registered",
  INVALID_CREDENTIALS: "Invalid Credentials",
  INVALID_USERNAME: "Invalid Username or Password",
  USER_NOT_FOUND: "User Not Found",
  PAGE_NOT_FOUND: "Page Not Found",
  INVALID_TOKEN: "Invalid Tokennn",
  PASSWORD_MISMATCH: "Password and Confirm Password do not match",
  PASSWORD_MUST:
    "Password must contain at least one special letter, one Upper case letter and max length 8",
  TOKEN_MISSING: "Token is missing",
  REFRESH_TOKEN_MISSING: "Refresh token missing",
  INVALID_REFRESH_TOKEN: "Invalid Refresh Token",
  INVALID_USER_ID: "Invalid user ID",
};

module.exports = { success, error };
