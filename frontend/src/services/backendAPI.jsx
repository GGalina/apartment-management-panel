import axios from 'axios';

axios.defaults.baseURL = 'https://apartment-management-panel.onrender.com';

//------------------------------Create a new apartment-----------------------------------//
export const createNewListingApi = async (aptData) => {
    try {
        const { data } = await axios.post('/api/create', aptData, {
            headers: {
              'Content-Type': 'multipart/form-data', 
            },
          });
      return data;
    } catch (error) {
      console.error('Error creating apartment:', error); // Log any errors
      throw new Error(error.response ? error.response.data : error.message);
    }
  };

//------------------------------Update an apartment by ID-----------------------------------//
export const editListingApi = async ({ aptData, id }) => {
    try {
        const { data } = await axios.patch(`/api/update/${id}`, aptData);
        return data;
    } catch (error) {
        console.error("Error updating apartment:", error);
        throw new Error(error.response ? error.response.data : error.message);
    }
};

//------------------------------Delete an apartment by ID-----------------------------------//
export const removeListingApi = async (id) => {
    try {
        await axios.delete(`/api/delete/${id}`);
    } catch (error) {
        console.error("Error deleting apartment:", error);
        throw new Error(error.response ? error.response.data : error.message);
    }
};

//------------------------------Fetch all apartments-----------------------------------//
export const getAllListingsApi = async () => {
    try {
        const { data } = await axios.get('/api/');
        return data;
    } catch (error) {
        console.error("Error fetching apartments:", error);
        throw new Error(error.response ? error.response.data : error.message);
    }
};

//------------------------------Filter by price (less than or equal to)-----------------------------------//
export const filterByPriceApi = async (price) => {
    try {
        const { data } = await axios.get(`/api/filter/price?price=${price}`);
        return data;
    } catch (error) {
        console.error("Error filtering apartments by price:", error);
        throw new Error(error.response ? error.response.data : error.message);
    }
};

//------------------------------Filter by number of rooms-----------------------------------//
export const filterByRoomsApi = async (rooms) => {
    try {
        const { data } = await axios.get(`/api/filter/rooms?rooms=${rooms}`);
        return data;
    } catch (error) {
        console.error("Error filtering apartments by rooms:", error);
        throw new Error(error.response ? error.response.data : error.message);
    }
};
