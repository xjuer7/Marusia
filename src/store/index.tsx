import { configureStore } from "@reduxjs/toolkit";
import authReducer from './AuthSlice'
import UIReducer from './UISlice'
import movieReducer from './MovieSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: UIReducer,
        data: movieReducer,
    }
})

export default store