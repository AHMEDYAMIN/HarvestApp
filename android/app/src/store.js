import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import fundsReducer from './Slices/fundsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        funds: fundsReducer,
    },
});

export default store;
