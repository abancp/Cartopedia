import React from 'react';
import collections from '../../../config/collections';
import "./Product.css"

function Product(Props) {
  return (
    <div className='product'>
      <div className='container-fluid'>
        <div className='row'>
          <div className="product-main-div col-12 mb-2">
            <div className="product-display-image-div ">
              <img src={`${collections.server_base}/product-displays/${Props.Image}`} alt="" />
            </div>
            <div className='product-details-div'>
              {Props.Name ? <h3 className='product-details-name'>{Props.Name}</h3> : ''}
              {Props.Description ? <h5 className='product-details-description '>{Props.Description}</h5> : ""}
              {Props.CompanyName ? <h6>{Props.CompanyName}</h6> : ""}
              {Props.Email ? <h6 >{Props.Email}</h6> : ""}
              {Props.Website ? <h6>{Props.Website}</h6> : ""}
              {Props.Price ? <h2 className='text-success'>${`${Props.Price}`}<span className='text-danger'></span></h2> : ""}
              {Props.Category?<h6>{`${Props.Category}`}</h6>:""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
