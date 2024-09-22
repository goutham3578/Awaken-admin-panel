import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: localStorage.getItem("isLogin") === "true", // Load isLogin state from localStorage
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLogin = true;
      localStorage.setItem("isLogin", "true"); // Save isLogin state to localStorage
    },
    logout(state) {
      state.isLogin = false;
      localStorage.setItem("isLogin", "false"); // Save isLogin state to localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
