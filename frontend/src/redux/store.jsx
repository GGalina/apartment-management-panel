// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
// Import your reducers here (e.g., apartmentReducer)
import apartmentReducer from "./apartmentSlice";

const store = configureStore({
  reducer: {
    apartments: apartmentReducer, // Make sure this matches your slice name
  },
});

export default store;
