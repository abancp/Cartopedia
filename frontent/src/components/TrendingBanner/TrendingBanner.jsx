import React from 'react';
import "./TrendingBanner.css";

function TrendingBanner() {
  return (
    <div className='trendingBanner' >
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 trending-banner-main-div d-flex justify-content-center">
          <img src="/cart-bg.jpg" alt="" className='register-form-div-cart-bg' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingBanner;
