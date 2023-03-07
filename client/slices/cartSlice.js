import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllCart = createAsyncThunk("/cart", async () => {
  const { data } = await axios.get("/api/cart");
  return data;
});
export const cartUpdate = createAsyncThunk("/guest/cart", async (product) => {
  console.log('product', product);
  return product
});

export const QuickAddToCart = createAsyncThunk(
  "/QuickAddToCart",
  async (productInfo) => {
    const { data } = await axios.post(
      "http://localhost:3000/api/cart/quickadd",
      productInfo
    );
    return data;
  }
);

export const AddToCart = createAsyncThunk(
  "/AddToCart",
  async ({ singleProduct, quantity }) => {
    const { data } = await axios.post("http://localhost:3000/api/cart", {
      singleProduct,
      quantity,
    });
    return data;
  }
);

export const deleteSingleItem = createAsyncThunk(
  "cart/deleteItem",
  async (id) => {
    const { data } = await axios.delete(`/api/cart/${id}`);

    return data;
  }
);

export const incrementItemCount = createAsyncThunk(
  "cart/addToCount",
  async (id) => {
    const { data } = await axios.put(`/api/cart/increment/${id}`);

    return data;
  }
);

export const decrementItemCount = createAsyncThunk(
  "cart/subtractFromCount",
  async (id) => {
    const { data } = await axios.put(`/api/cart/decrement/${id}`);

    return data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    // cartUpdate: (state, action) => {
    //   console.log('payload', action)
    //   state.cart.push(action.payload)
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(cartUpdate.fulfilled, (state, {payload}) => {
      state.cart = payload
    })
    builder.addCase(getAllCart.fulfilled, (state, { payload }) => {
      state.cart = payload;
    });

    builder.addCase(QuickAddToCart.fulfilled, (state, { payload }) => {
      state.cart.push(payload);
    });

    builder.addCase(AddToCart.fulfilled, (state, { payload }) => {
      state.cart.push(payload);
    });

    builder.addCase(deleteSingleItem.fulfilled, (state, { payload }) => {
      state.cart = state.cart.filter(
        (element) => element.productId !== payload.productId
      );
    });

    builder.addCase(incrementItemCount.fulfilled, (state, { payload }) => {
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].productId === payload.productId) {
          state.cart[i] = payload;
          break;
        }
      }
    });

    builder.addCase(decrementItemCount.fulfilled, (state, { payload }) => {
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].productId === payload.productId) {
          state.cart[i] = payload;
          break;
        }
      }
    });
  },
});

export const getCart = (state) => state.cart;
export default cartSlice.reducer;
