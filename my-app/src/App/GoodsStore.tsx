import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Good, UserStore } from "../types/types";
import axios from "axios";

export const getGoods = createAsyncThunk("api/meetups", async () => {
  const resp = await axios.get("api/meetups");
  return resp.data;
});
export const getProduct = createAsyncThunk(
  "api/meetups/id",
  async (id: string) => {
    const resp = await axios.get(`/api/meetups/${id}`);
    return resp.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "api/meetups/delete",
  async (id: string) => {
    const resp = await axios.delete(`/api/meetups/${id}`);
    return resp.data;
  }
);
export const editProduct = createAsyncThunk(
  "api/meetups/id",
  async (data: {
    title: string;
    excerpt: string;
    price: number;
    img: string;
    id: string;
  }) => {
    const resp = await axios.put(`/api/meetups`, data);
    return resp.data;
  }
);
export const requestForBuying = createAsyncThunk(
  "api/meetups/",
  async (data: { id: string; buyer: UserStore; message: string }) => {
    const body = {
      ...data,
      buyer: { ...data.buyer, message: data.message },
    };
    const resp = await axios.put(`/api/meetups/buyers`, body);
    return resp;
  }
);

export const confirmBuying = createAsyncThunk(
  "api/meetups/",
  async ({ id, userID }: { id: string; userID: string }) => {
    const body = { id, userID, status: "SOLD" };
    const resp = await axios.put(`/api/meetups/buying`, body);
    return resp;
  }
);

interface GoodsStoreState {
  goods: Good[];
  product?: Good;
  productStatus: "rejected" | "fulfilled" | "pending";
  loading: boolean;
  errors: null | {};
}

const initialState: GoodsStoreState = {
  goods: [],
  product: undefined,
  productStatus: "pending",
  loading: false,
  errors: null,
};

export const goodsStoreSlice = createSlice({
  name: "goodsStore",
  initialState,
  reducers: {
    setGoodsInitState: (state) => {
      state.productStatus = "pending";
      state.product = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGoods.fulfilled, (state, action) => {
      state.goods = action.payload;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      state.productStatus = "fulfilled";
    });
    builder.addCase(getProduct.pending, (state, action) => {
      state.productStatus = "pending";
    });
    builder.addCase(requestForBuying.fulfilled, (state, action) => {});
  },
});

export const { setGoodsInitState } = goodsStoreSlice.actions;

export default goodsStoreSlice.reducer;