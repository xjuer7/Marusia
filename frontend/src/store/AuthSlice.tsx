import { createSlice } from "@reduxjs/toolkit";

interface UserInfo {
  email: string;
  favorites: string[];
  name: string;
  surname: string;
}

interface InitialState {
  loginModalWindow: boolean;
  isRegistration: boolean;
  isAuthenticated: boolean;
  authType: string;
  userInfo: Partial<UserInfo>;
  errorMessage: string;
}

export interface AuthInitialState {
  auth: InitialState
}

const initialState: InitialState = {
  loginModalWindow: false,
  isRegistration: false,
  isAuthenticated: false,
  authType: "auth",
  userInfo: {
    email: "",
    favorites: [],
    name: "",
    surname: "",
  },
  errorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authModalOpen(state) {
      state.loginModalWindow = true;
    },
    authModalClose(state) {
      state.loginModalWindow = false;
    },
    registrationSuccess(state) {
      state.isRegistration = true;
      state.authType = "notice";
      state.errorMessage = "";
    },
    registrationFailure(state) {
      state.isRegistration = false;
      state.authType = "auth";
    },
    loginSuccess(state) {
      state.isAuthenticated = true;
      // state.userInfo = { ...state.userInfo, ...action.payload };
      state.errorMessage = "";
    },
    loginFailure(state) {
      state.isAuthenticated = false;
      state.authType = "register";
    },
    authMe(state, action) {
      state.userInfo = {...state.userInfo, ...action.payload}
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userInfo = {};
      state.errorMessage = "";
    },
    updateUserInfo(state, action) {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
  },
});

export const {
  authModalOpen,
  authModalClose,
  registrationSuccess,
  registrationFailure,
  loginSuccess,
  loginFailure,
  logout,
  updateUserInfo,
  authMe
} = authSlice.actions;
export default authSlice.reducer;
