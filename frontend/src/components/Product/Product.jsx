import React, { useMemo } from 'react';
import collections from '../../configurations/collections';
import "./Product.css"
import { Link } from 'react-router-dom';
import EditButton from '../EditButton/EditButton';
import axios from 'axios'
import useDisplayUrl from '../../hooks/useDisplayUrl';

function Product(product) {
  const [displayUrl] = useDisplayUrl(product.displayUrl, product._id)
  const headers = useMemo(() => ({
    'Authorization': window.localStorage.getItem("token")
  }), [])

  const deleteProduct = (e) => {
    e.preventDefault()
    if (window.confirm("are you sure to remove item from cart")) {
      axios.delete(collections.server_base + product.removeLink, { headers })
      product.handleDeleteCallback(Date.now())
    }
  }

  const handleIncrement = (e) => {
    e.preventDefault()
    axios.patch(`${collections.server_base}/add-to-cart/${product._id}/${1}`).then((res) => {
      if (res.data.cartPriceLimitErr) {
        alert("Maximum 500,000 rupees in cart")
        product.handleDeleteCallback(Date.now())
      } else {
        product.handleDeleteCallback(Date.now())
      }
    })
  }

  const handleDecrement = (e) => {
    e.preventDefault()
    if (product.count < 2) {
      if (window.confirm("are you sure to remove item from cart")) {
        axios.delete(collections.server_base + product.removeLink, { headers })
        product.handleDeleteCallback(Date.now())
      }
    } else {
      axios.patch(`${collections.server_base}/add-to-cart/${product._id}/${-1}}`).then((res) => {
        product.handleDeleteCallback(Date.now())
      })
    }
  }

  return (
    <div className='Product'>
      <div className='container-fluid'>
        <Link className='product-link' to={'/product/' + product._id}>
          <div className="product-main-div">
            {
              (product.cartItem || product.allProductForAdminPanel) &&
              <div className="delete-button-div">
                <EditButton
                  icon={<svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="edit-bottun-svg bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>}
                  title={product.cartItem ? "remove" : "delete"}
                  width={product.cartItem ? "4.9rem" : "4.2rem"}
                  onClick={deleteProduct}
                />
              </div>
            }
            <div className="product-flex-div">
              <div className="product-display-image-div ">
                <img className='product-display-image' src={displayUrl} alt={product.name} />
              </div>
              <div className='product-details-div'>
                <h5 className='product-details-name'>{product.name}</h5>
                <h6 className='product-details-description '>{product.description}</h6>
                <h6>{product.companyName}</h6>
                <h6 >{product.email}</h6>
                <h6>{product.webSite}</h6>
                {!product.deletedItem && <h5 className='product-price'>₹ {product?.price}/-<span className='product-mrp'>₹ {product.mrp}/-</span></h5>}
                {!product.deletedItem && <h5>{product.category} <span className='product-offer' >{100 - (Math.round((parseInt(product?.price) * 100) / parseInt(product?.mrp)))}%  Offer</span> </h5>}
              </div>
              {!isNaN(product.count) && <div className="product-count-div">
                <div className="inc-div" onClick={handleIncrement} >+</div>
                <div className="count-div">{product.count}</div>
                <div className="dec-div" onClick={handleDecrement}>-</div>
              </div>}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Product;
