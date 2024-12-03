import { createSlice } from "@reduxjs/toolkit";
import { Buffer } from "buffer";

window.Buffer = Buffer;

const TonWeb = require("tonweb");

const initialState = {
  address: null,
  addressUserFriendly: null, 
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    connectWallet: (state, action) => {
      state.address = action.payload;
      state.addressUserFriendly = new TonWeb.utils.Address(
        action.payload
      ).toString(true, true, true);
    },
    disconnectWallet: (state) => {
      state.address = null;
      state.addressUserFriendly = null; 
    },
  },
});

export const { connectWallet, disconnectWallet } = walletSlice.actions;
export default walletSlice.reducer;
