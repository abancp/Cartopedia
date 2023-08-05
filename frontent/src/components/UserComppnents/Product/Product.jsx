import React from 'react';
import collections from '../../../configurations/collections';
import "./Product.css"

function Product(props) {
  return (
    <div className='product'>
      <div className='container-fluid'>
        <div className='row'>
          <div className="product-main-div col-12 mb-2">
            <div className="product-display-image-div ">
              <img className='product-display-image' src={`${collections.server_base}/product-displays/${props.Image}`} alt={props.name} />
            </div>
            <div className='product-details-div'>
              {props.Name ? <h3 className='product-details-name'>{props.Name}</h3> : ''}
              {props.Description ? <h5 className='product-details-description '>{props.Description}</h5> : ""}
              {props.CompanyName ? <h6>{props.CompanyName}</h6> : ""}
              {props.Email ? <h6 >{props.Email}</h6> : ""}
              {props.Website ? <h6>{props.Website}</h6> : ""}
              {props.Price ? <h2 className='text-success'>${`${props.Price}`}<span className='text-danger'></span></h2> : ""}
              {props.Category?<h6>{`${props.Category}`}</h6>:""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
