import { configureStore } from '@reduxjs/toolkit';

// --- Change this line to include the .jsx extension ---
import cartReducer from './CartSlice.jsx'; // Corrected import path
// --- End change ---

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export default store;