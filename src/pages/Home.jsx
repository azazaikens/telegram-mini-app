import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const walletAddress = useSelector(
    (state) => state.wallet.addressUserFriendly
  );

  return (
    <div className='containerText'>
      <h1>Home</h1>
      <p>Wallet Address: {walletAddress || 'Not connected'}</p>
    </div>
  );
};

export default Home;
