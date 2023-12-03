import React from 'react';
import "./IndrestedProduct.css"
import collections from '../../configurations/collections';
import { Link } from 'react-router-dom';
function IndrestedProduct(props) {
  return (
    <div className='IndrustedProduct'>
      <Link className='text-decoration-none' to={'/product/' + props.indrestedItem?._id} >
        <div style={{ "width": props.width ? props.width : "250px" }} className={`main ${props.indrested ? "" : "margin-1rem"}`} >
          <div className="product-image-div">
            <img className='image' src={`${collections.server_base}/product-displays/${props.indrestedItem?._id}.jpg`} alt="" />
          </div>
          <div className="details">
            <h6 className="name">{props.indrestedItem !== null ? props.indrestedItem?.name : "indrested product name"}</h6>
            <div className="end-items">
              <h6 className="cartopedia-price">₹{props.indrestedItem !== null ? props.indrestedItem?.price : "10000"}</h6>
              <h6 className="mrp">₹{props.indrestedItem?.mrp}</h6>
              <h6 className="offer">({100 - (Math.round((parseInt(props.indrestedItem?.price) * 100) / parseInt(props.indrestedItem?.mrp)))}%offer) </h6>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default IndrestedProduct;