import React from 'react';
import VerifyAccount from '../components/VerifyAccount/VerifyAccount';
import Header from '../components/Header/Header';

function VerifyAccountPage() {
  return (
    <div>
      <Header />
      <VerifyAccount type="Email" />
    </div>
  );
};

export default VerifyAccountPage;
