
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apartments: [],
};

const apartmentSlice = createSlice({
  name: "apartments",
  initialState,
  reducers: {
    addApartment: (state, action) => {
      state.apartments.push(action.payload);
    },
    updateApartment: (state, action) => {
      const index = state.apartments.findIndex(
        (apartment) => apartment.id === action.payload.id
      );
      if (index !== -1) {
        state.apartments[index] = action.payload;
      }
    },
    removeApartment: (state, action) => {
      state.apartments = state.apartments.filter(
        (apartment) => apartment.id !== action.payload
      );
    },
  },
});

export const { addApartment, updateApartment, removeApartment } =
  apartmentSlice.actions;

export default apartmentSlice.reducer;
