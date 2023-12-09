import {createSlice} from '@reduxjs/toolkit';

type deviceState = {
  cartList: any;
};

const initialState: deviceState = {
  cartList: [],
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCartList: (state, action) => {
      state.cartList = action.payload;
    },
  },
});

export const {updateCartList} = CartSlice.actions;

export default CartSlice.reducer;
