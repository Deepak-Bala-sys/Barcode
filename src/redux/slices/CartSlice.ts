import {createSlice} from '@reduxjs/toolkit';

type deviceState = {
  cartList: any;
};
// Set the initial state for the cart slice
const initialState: deviceState = {
  cartList: [],
};
// Create a Redux slice using createSlice
export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Reducer function to update the cartList with the payload
    updateCartList: (state, action) => {
      state.cartList = action.payload; // Update cartList with the payload
    },
  },
});

export const {updateCartList} = CartSlice.actions;

export default CartSlice.reducer;
