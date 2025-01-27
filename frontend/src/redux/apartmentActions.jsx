import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createNewListingApi,
  editListingApi,
  removeListingApi,
  getAllListingsApi,
  filterByPriceApi,
  filterByRoomsApi
} from '../services/backendAPI';

// Fetch all apartments
export const fetchAllListings = createAsyncThunk(
    'apartments/fetchAll', 
    async () => {
        const data = await getAllListingsApi();
        return data;
    }
);

// Create a new apartment listing
export const createListing = createAsyncThunk(
    'apartments/create',
    async (aptData) => {
        const data = await createNewListingApi(aptData);
        return data;
    }
);

// Update an existing apartment listing
export const updateListing = createAsyncThunk(
    'apartments/update',
    async ({ aptData, id }) => {
        const data = await editListingApi({ aptData, id });
        return data;
    }
);

// Delete an apartment by ID
export const deleteListing = createAsyncThunk(
    'apartments/delete', 
    async (id) => {
        await removeListingApi(id);
        return id;  
    }
);

// Filter apartments by price (less than or equal to)
export const filterByPrice = createAsyncThunk(
    'apartments/filterByPrice',
    async (price) => {
        const data = await filterByPriceApi(price);
        return data;
    }
);

// Filter apartments by number of rooms
export const filterByRooms = createAsyncThunk(
    'apartments/filterByRooms',
    async (rooms) => {
        const data = await filterByRoomsApi(rooms);
        return data;
    }
);
