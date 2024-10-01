// cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiLink from '../data/ApiLink';

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : null;
};

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// Thunk to fetch cart from the backend
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${apiLink}/cart`,{
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk to add an item to the cart and sync it with the backend
export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiLink}/cart`, { productId, quantity, }, {
        withCredentials: true 
      });
      const { cart } = getState(); // Get the current cart state
      const updatedCart = [...cart.items, response.data]; // Assuming the backend returns the updated cart item
      console.log('Response from backend:', response.data);
      saveCartToLocalStorage(updatedCart); // Save updated cart to localStorage
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateItemQuantity = createAsyncThunk(
  'cart/updateItemQuantity',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      // Send the PATCH request to update item quantity in the backend
      const response = await axios.patch(`${apiLink}/cart`, { productId, quantity }, {
        withCredentials: true,
      });

      // Return the updated cart item from the backend
       
      return response.data; // response.data should contain the updated cartItem
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to remove an item from the cart
export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async (productId, { getState, rejectWithValue }) => {
    try {
      const response = await axios.delete(`${apiLink}/cart`, {
        data: { productId },
        withCredentials: true
      });
      const { cart } = getState(); // Get current cart state
      const updatedCart = cart.items.filter((item) => item.product_id !== productId);

      saveCartToLocalStorage(updatedCart); // Save updated cart to localStorage
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCartFromStorage(state) {
      const savedCart = loadCartFromLocalStorage();
      if (savedCart) {
        state.items = savedCart.items;
        state.totalPrice = savedCart.totalPrice;
        state.totalQuantity = savedCart.totalQuantity;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.removeItem('cart'); // Clear cart from localStorage
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.cartItems;
        state.totalPrice = action.payload.totalPrice;
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);

        saveCartToLocalStorage(state); // Save cart to localStorage after fetching from backend
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        
        // Load from localStorage if backend request fails
        const savedCart = loadCartFromLocalStorage();
        if (savedCart) {
          state.items = savedCart.items;
          state.totalPrice = savedCart.totalPrice;
          state.totalQuantity = savedCart.totalQuantity;
        }
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.totalQuantity += action.payload.quantity;
        state.totalPrice += action.payload.quantity * action.payload.Product.price;

        saveCartToLocalStorage(state); // Save updated cart to localStorage
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        const updatedItem = action.payload; // Use the response from backend (the updated cart item)
        
        // Find the index of the updated item in the cart
        const itemIndex = state.items.findIndex(item => item.Product.id === updatedItem.product_id);
        
        if (itemIndex !== -1) {
          // Update the quantity and other fields in the state
          state.items[itemIndex].quantity = updatedItem.quantity;
      
          // Recalculate the total quantity and price
          state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
          state.totalPrice = state.items.reduce((total, item) => total + item.quantity * item.Product.price, 0);
        }
      
        // Optionally save the updated cart to localStorage
        saveCartToLocalStorage(state);
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.Product.id !== action.meta.arg);
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = state.items.reduce((total, item) => total + item.quantity * item.Product.price, 0);

        saveCartToLocalStorage(state); // Save updated cart to localStorage
      });
  },
});

export const { loadCartFromStorage, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
