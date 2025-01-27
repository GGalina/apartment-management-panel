// Get all apartments
export const selectAllApartments = (state) => state.apartments.apartments;

// Get filtered apartments
export const selectFilteredApartments = (state) => state.apartments.filteredApartments;

// Get the loading state
export const selectLoading = (state) => state.apartments.loading;

// Get the error state
export const selectError = (state) => state.apartments.error;
