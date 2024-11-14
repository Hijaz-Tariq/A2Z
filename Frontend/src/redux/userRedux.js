import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,

    isFetching: false,

    error: false,
  },

  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },

    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },

    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    logOut: (state) => {
      state.isFetching = false;

      state.currentUser = null;
    },

       // Add the updatePhone action here
       updatePhone: (state, action) => {
        if (state.currentUser) {
          state.currentUser.phone = action.payload; // Update the phone number in the currentUser object
        }
      },
  },
});

export const { loginFailure, loginStart, loginSuccess, logOut, updatePhone } =
  userSlice.actions;

export default userSlice.reducer;