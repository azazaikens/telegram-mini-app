import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet, disconnectWallet } from "../store/walletSlice";
import tonConnectUI from "../services/tonService.js";


const WalletButton = () => {
  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state.wallet.address);
  const [isConnecting, setIsConnecting] = useState(false);
  
  useEffect(() => {
    try {
      const unsubscribe = tonConnectUI.onStatusChange((walletInfo) => {
        if (walletInfo) {
          dispatch(connectWallet(walletInfo.account.address));
        } else {
          dispatch(disconnectWallet());
        }
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Error subscribing to wallet status:", error);
    }
  }, [dispatch]);

  const handleConnect = async () => {
    if (isConnecting) return;

    setIsConnecting(true);
    try {
      if (walletAddress) {
        await tonConnectUI.disconnect();
        dispatch(disconnectWallet());
      } else {
        await tonConnectUI.connectWallet();
      }
    } catch (error) {
      if (error.message.includes("Wallet was not connected")) {
        console.log("The connection was canceled by the user.");
      } else {
        console.error("Wallet connection error:", error);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const buttonClass = walletAddress
    ? "wallet-button disconnect"
    : "wallet-button connect";

  return (
    <button onClick={handleConnect} className={buttonClass}>
      {walletAddress ? "Disconnect" : "Connect Wallet"}
    </button>
  );
};

export default WalletButton;
