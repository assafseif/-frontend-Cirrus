import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignedIn: false,
};

export const credential = createSlice({
  name: "counter",
  initialState,
  reducers: {
    //WHEN USER LOGIN WE CALL THIS FUNCTION TO CHANGE STATE
    setSignedIn: (state) => {
      state.isSignedIn = true;
    },

    //WHEN USER LOG OUT WE CALL THIS FUNCTION TO LOGOUT
    SetLoggedOut: (state) => {
      state.isSignedIn = false;
    },
  },
});

export const { setSignedIn, SetLoggedOut } = credential.actions;

export default credential.reducer;
