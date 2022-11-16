import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";


export const createTour = createAsyncThunk(
  "tour/createTour",
  async ({ UploadTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createTour(UploadTourData);
      toast.success("Create Tour Successfully");
      navigate("/");
      // console.log(response.data)///
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTours = createAsyncThunk(
  "tour/getTours",
  async(page, {rejectWithValue}) => {
    try {
      const response = await api.getTours(page)
      // console.log(response.data)
      return response.data      
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getTour = createAsyncThunk(
  "tour/getTour",
  async(id, {rejectWithValue}) => {
    try {
      const response = await api.getTour(id);
      // console.log(response)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message.data)
    }
  }
)

export const getToursByUser = createAsyncThunk(
  "tour/getToursByUser",
  async( userId, {rejectWithValue}) => {
    try {
      const response = await api.getToursByUser(userId);
      // console.log(response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message.data)
    }
  }
)

export const deleteTour = createAsyncThunk(
  "tour/deleteTour",
  async({id, toast}, {rejectWithValue}) => {
    try {
      const response = await api.deleteTour(id)
      toast("Deleted Successfully")
      return response.data

    } catch (error) {
      return rejectWithValue(error.message.data)

    }
  }
)



export const updateTour = createAsyncThunk(
  "tour/updateTour",
  async ({ id, updatedTourData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateTour(updatedTourData, id);
      toast.success("Tour Updated Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const searchTours = createAsyncThunk(
  "tour/searchTours",
  async(searchQuery, {rejectWithValue}) => {
    try {

      const response = await api.getToursBySearch(searchQuery);
      return response.data
      
    } catch (error) {
      return rejectWithValue(error.response.data)
      
    }
  }
  
);



export const getToursByTag = createAsyncThunk(
  "tour/getTourByTags",
  async(tag, {rejectWithValue}) => {
    try {
      const response = await api.getToursByTag(tag)
      // console.log(response.data)
      return response.data
      
    } catch (error) {
      rejectWithValue(error.response.data)
    }
  }
  
)

export const getRelatedTours = createAsyncThunk(
  "tour/getRelatedTours",
  async (tags, { rejectWithValue }) => {
    try {
      const response = await api.getRelatedTours(tags);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const likeTour = createAsyncThunk(
  "tour/likeTour",
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await api.likeTour(_id);
      // console.log(response.data)
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tour: {},
    tours: [],
    currentPage: 1,
    numberOfPages: null,
    userTours: [],
    tagTours: [],
    relatedTours: [],
    error: "",
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action)=>{
      state.currentPage = action.payload
    }

  },

  extraReducers: {
    [createTour.pending]: (state, action) => {
      state.loading = true;
    },
    [createTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = [action.payload];
    },
    [createTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


    [getTours.pending]: (state, action) => {
      state.loading = true;
    },

    [getTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = action.payload.data
      state.currentPage = action.payload.currentPage
      state.numberOfPages = action.payload.numberOfPages
    },

    [getTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message
    },

    [getTour.pending]: (state, action) => {
      state.loading = true
    },
    
    [getTour.fulfilled]: (state, action) => {
      state.loading = false
      state.tour = action.payload
    },

    [getTour.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },

    [getToursByUser.pending]: (state, action) => {
      state.loading = true
    },
    
    [getToursByUser.fulfilled]: (state, action) => {
      state.loading = false
      state.userTours = action.payload
    },

    [getToursByUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },

    [deleteTour.pending]: (state, action) => {
      state.loading = true
    },
    
    [deleteTour.fulfilled]: (state, action) => {
      state.loading = false
      console.log(action)
      const {arg: {id} } = action.meta 
      if(id){
        state.userTours = state.userTours.filter(item=> item._id !== id)
        state.tours = state.tours.filter(item => item._id !==  id)
      }
    },

    [deleteTour.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    
    [updateTour.pending]: (state, action) => {
      state.loading = true;
    },
    [updateTour.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTours = state.userTours.map((item) =>
          item._id === id ? action.payload : item
        );
        state.tours = state.tours.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    
    [searchTours.pending]: (state, action) => {
      state.loading = true;
    },
    [searchTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = action.payload
    },
    [searchTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },


    [getToursByTag.pending]: (state, action) => {
      state.loading = true;
    },
    [getToursByTag.fulfilled]: (state, action) => {
      state.loading = false;
      state.tagTours = action.payload
    },
    [getToursByTag.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getRelatedTours.pending]: (state, action) => {
      state.loading = true;
    },
    [getRelatedTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.relatedTours = action.payload;
    },
    [getRelatedTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [likeTour.pending]: (state, action) => {
      state.loading = true;
    },
    [likeTour.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { _id },
      } = action.meta;
      if (_id) {
        state.tours = state.tours.map((item) =>
        item._id === _id ? action.payload : item
      );
      }
    },
    [likeTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setCurrentPage } = tourSlice.actions;
export default tourSlice.reducer;
