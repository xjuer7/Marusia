import { configureStore } from "@reduxjs/toolkit";
import authReducer from './AuthSlice.tsx';
import UIReducer from './UISlice.tsx';
import movieReducer from './MovieSlice.tsx';
const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: UIReducer,
        data: movieReducer,
    }
});
export default store;
