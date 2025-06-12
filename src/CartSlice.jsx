import { createSlice } from '@reduxjs/toolkit';

// Define the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        console.log("CartSlice addItem reducer called."); // Debug log
        console.log("Payload received by addItem:", action.payload); // Debug log

        const { name, image, cost } = action.payload; // Destructure product details from the action payload
        // Check if the item already exists in the cart by comparing names
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
          // If item already exists in the cart, increase its quantity
          existingItem.quantity++;
          console.log("Existing item quantity incremented:", existingItem); // Debug log
        } else {
          // If item does not exist, add it to the cart with quantity 1
          state.items.push({ name, image, cost, quantity: 1 });
          console.log("New item added to cart:", state.items); // Debug log
        }
    },
    removeItem: (state, action) => {
        console.log("CartSlice removeItem reducer called."); // Debug log
        console.log("Payload received by removeItem:", action.payload); // Debug log
        // action.payload is expected to be an object like { name: '...' }
        state.items = state.items.filter(item => item.name !== action.payload.name);
    },
    updateQuantity: (state, action) => {
        console.log("CartSlice updateQuantity reducer called."); // Debug log
        console.log("Payload received by updateQuantity:", action.payload); // Debug log
        const { name, quantity } = action.payload; // Destructure the product name and new quantity from the action payload
        // Find the item in the cart that matches the given name
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
            itemToUpdate.quantity = quantity; // If the item is found, update its quantity to the new value
            console.log("Item quantity updated:", itemToUpdate); // Debug log
        }
    },
  },
});

// THIS LINE IS CRITICAL: Exports the named actions (addItem, removeItem, updateQuantity)
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// Exports the reducer as the default export (for store.js)
export default cartSlice.reducer;