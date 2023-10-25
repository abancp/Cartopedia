import React from 'react';
import "./IndrestedProduct.css"
import collections from '../../configurations/collections';
function Product(props) {
  console.log(props?.indrestedItem)
  return (
    <div className='Product'>
      <div className={`main ${props.indrested?"":"margin-1rem"}`} >
        <div className="product-image-div">
          <img className='image' src={`${collections.server_base}/product-displays/${props.indrestedItem?._id}.jpg`} alt="" />
        </div>
        <div className="details">
          <h5 className="name">{props.indrestedItem !== null ? props.indrestedItem?.name : "indrested product name" }</h5>
          <div className="prices">
            <h4 className="cartopedia-price">{props.indrestedItem !== null ? props.indrestedItem?.price : "10000" }</h4>
            <h4 className="mrp">140000</h4>
          </div>
          <h5 className="description">{props.indrestedItem !== null ? props.indrestedItem?.description : "good product" }</h5>
          <div className="end-items">
            <h6 className="trending">indrested</h6>
            <h6 className="company">{props.indrestedItem !== null ? props.indrestedItem?.companyName : "cartopedia" }</h6>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;