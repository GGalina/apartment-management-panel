import { configureStore } from '@reduxjs/toolkit';
import apartmentsReducer from './apartmentSlice'; 

export const store = configureStore({
  reducer: {
    apartments: apartmentsReducer, 
  },
});

export default store;
