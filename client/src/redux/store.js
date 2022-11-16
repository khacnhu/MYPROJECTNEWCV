import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import TourReducer from "./features/tourSlice";
import  ThemeReducer  from "./features/themeSlice";

export default configureStore({
    reducer: {
        auth: AuthReducer,
        tour: TourReducer, 
        theme: ThemeReducer,
    }
})