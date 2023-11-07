import React from 'react';
import collections from '../../configurations/collections';
import "./Product.css"
import { Link } from 'react-router-dom';
import EditButton from '../EditButton/EditButton';

function Product(product) {
  return (
    <div className='Product'>
      <div className='container-fluid'>
        <Link className='product-link' to={'/product/' + product._id}>
          <div className="product-main-div">
            <div className="delete-button-div"> <EditButton
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="edit-bottun-svg bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>}
              title="delete"
              width='4.2rem'
              link=""
            /></div>
            <div className="product-flex-div">
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
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Product;
