import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formValue);
      toast.success("login Successfully");
      navigate("/");
      // console.log(response.data)
      // console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error.response.data.message)
      toast.error(error.response.data.message)
      // navigate("/login")
      rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formValue);
      toast.success("Register Successfully");
      navigate("/login");

      console.log(response.data);

      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const googleSignIn = createAsyncThunk(
  "auth/googleSignIn",
  async ({ result, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.googleSignIn(result);
      toast.success("Login Google Gmail Successfully");
      navigate("/");

      // console.log(response.data);

      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({formValue, id, navigate, toast}, {rejectWithValue}) => {
    
    try {
      const response = await api.changePassword(formValue, id)
      toast.success("Change Password Successfully")

      console.log(response.data)
      navigate("/")
      return response.data
      
    } catch (error) {
      toast.error(error.response.data.message)
      rejectWithValue(error.message.data)
    }
  }
)

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({formValue, navigate, toast}, {rejectWithValue}) => {
    
    try {
      const response = await api.forgotPassword(formValue)
      toast.success("Verify Email Successfully, Please check your Gmail")

      console.log(response.data)
      navigate("/login")
      return response.data
      
    } catch (error) {
      toast.error(error.response.data.message)
      rejectWithValue(error.message.data)
    }
  }
)

export const resetPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({formValue, token, navigate, toast}, {rejectWithValue}) => {
    
    try {
      const response = await api.resetPassword(formValue, token)
      toast.success("Reset Password Successfully, Please check your Gmail")
      
      console.log(response.data)
      navigate("/login")
      return response.data
      
    } catch (error) {
      toast.error(error.response.data.message)
      rejectWithValue(error.message.data)
    }
  }
)




const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
      // navigate("/")
    },
  },

  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [changePassword.pending]: (state, action) => {
      state.loading = true;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.loading = false;
      // console.log(action)
      // localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      // state.user = action.payload;
    },
    [changePassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


    [forgotPassword.pending]: (state, action) => {
      state.loading = true;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.loading = false;
      // console.log(action)
      // localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = null;
    },
    [forgotPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [resetPassword.pending]: (state, action) => {
      state.loading = true;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action)
      // localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      // state.user = null;
    },
    [resetPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


    [googleSignIn.pending]: (state, action) => {
      state.loading = true;
    },
    [googleSignIn.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [googleSignIn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      // localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
