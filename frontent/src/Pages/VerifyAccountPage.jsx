import React from 'react';
import VerifyAccount from '../components/VerifyAccount/VerifyAccount';
import Header from '../components/Header/Header';

function VerifyAccountPage(props) {
  return (
    <div>
        <Header/>
        {props.type=="email"?<VerifyAccount type="Email"/>:<VerifyAccount type="Phone"/>}
    </div>
  );
};

export default VerifyAccountPage;
