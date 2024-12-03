import { createSlice } from "@reduxjs/toolkit";
import { Buffer } from "buffer";

// @ts-ignore
window.Buffer = Buffer;

const TonWeb = require("tonweb");

const initialState = {
  address: null,
  addressUserFriendly: null, // Додаємо змінну для дружньої адреси
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    connectWallet: (state, action) => {
      state.address = action.payload;
      state.addressUserFriendly = new TonWeb.utils.Address(
        action.payload
      ).toString(true, true, true); // Дружня адреса
    },
    disconnectWallet: (state) => {
      state.address = null;
      state.addressUserFriendly = null; // Очищаємо дружню адресу при відключенні
    },
  },
});

export const { connectWallet, disconnectWallet } = walletSlice.actions;
export default walletSlice.reducer;
