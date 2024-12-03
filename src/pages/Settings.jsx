import React from 'react';
import { useSelector } from 'react-redux';

const Settings = () => {
  const walletAddress = useSelector(
    (state) => state.wallet.addressUserFriendly
  );

  return (
    <div>
      <h1>Settings</h1>
      <p>Wallet Address: {walletAddress || 'Not connected'}</p>
    </div>
  );
};

export default Settings;
