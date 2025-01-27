import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllListings,
  createListing,
  updateListing,
  deleteListing,
  filterByPrice,
  filterByRooms
} from './apartmentActions';

const initialState = {
  apartments: [],
  filteredApartments: [],
  loading: false,
  error: null,
};

const apartmentsSlice = createSlice({
  name: 'apartments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch apartments
      .addCase(fetchAllListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllListings.fulfilled, (state, action) => {
        state.loading = false;
        state.apartments = action.payload;
        state.filteredApartments = action.payload; // Initially, all apartments are displayed
      })
      .addCase(fetchAllListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Create apartment
      .addCase(createListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.loading = false;
        state.apartments.push(action.payload);
        state.filteredApartments.push(action.payload);
      })
      .addCase(createListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Update apartment
      .addCase(updateListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.apartments.findIndex(
          (apt) => apt._id === action.payload._id
        );
        if (index !== -1) {
          state.apartments[index] = action.payload;
        }
        const filterIndex = state.filteredApartments.findIndex(
          (apt) => apt._id === action.payload._id
        );
        if (filterIndex !== -1) {
          state.filteredApartments[filterIndex] = action.payload;
        }
      })
      .addCase(updateListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Delete apartment
      .addCase(deleteListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.loading = false;
        state.apartments = state.apartments.filter(
          (apt) => apt._id !== action.payload
        );
        state.filteredApartments = state.filteredApartments.filter(
          (apt) => apt._id !== action.payload
        );
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Filter apartments by price
      .addCase(filterByPrice.fulfilled, (state, action) => {
        state.filteredApartments = action.payload;
      })

      // Filter apartments by number of rooms
      .addCase(filterByRooms.fulfilled, (state, action) => {
        state.filteredApartments = action.payload;
      });
  }
});

export default apartmentsSlice.reducer;
