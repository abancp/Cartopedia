import React from 'react';
import collections from '../../configurations/collections';
import "./Product.css"
import { Link } from 'react-router-dom';

function Product(product) {
  return (
    <div className='Product'>
      <div className='container-fluid'>
        <div className='row'>
          <Link className='product-link' to={'/product/' + product._id}>
            <div className="product-main-div">
              <div className="product-display-image-div ">
                <img className='product-display-image' src={`${collections.server_base}/product-displays/${product._id + '.jpg'}`} alt={product.name} />
              </div>
              <div className='product-details-div'>
                {<h5 className='product-details-name'>{product.name}</h5>}
                {<h6 className='product-details-description '>{product.description}</h6>}
                {<h6>{product.companyName}</h6>}
                {<h6 >{product.email}</h6>}
                {<h6>{product.webSite}</h6>}
                {<h5 className='product-price'>₹ {product.price}/-<span className='product-mrp'>₹ {product.mrp}/-</span></h5>}
                {<h5>{product.category} <span className='product-offer' >{100 - (Math.round((parseInt(product.price) * 100) / parseInt(product.mrp)))}%  Offer</span> </h5>}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
