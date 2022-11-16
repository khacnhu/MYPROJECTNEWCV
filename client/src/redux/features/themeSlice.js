import {createSlice} from "@reduxjs/toolkit"


const initialState = {
  // darkMode: false,
  darkMode: localStorage.getItem("darkMode") || "light"

};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state, action) => {
      state.darkMode = action.payload
      console.log(state.darkMode)
      // localStorage.setItem("darkMode", state.darkMode)
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;

export default themeSlice.reducer;