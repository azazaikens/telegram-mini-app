import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const walletAddress = useSelector(
    (state) => state.wallet.addressUserFriendly
  );

  return (
    <div>
      <h1>Profile</h1>
      <p>Wallet Address: {walletAddress || 'Not connected'}</p>
    </div>
  );
};

export default Profile;
