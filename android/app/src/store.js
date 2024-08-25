import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';  // Make sure to import the default export as authReducer
import fundsReducer from './Slices/fundsSlice'; // Make sure to import the default export as fundsReducer

const store = configureStore({
  reducer: {
    auth: authReducer,  
    funds: fundsReducer, 
  },
});

export default store;
