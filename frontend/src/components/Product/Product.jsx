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
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="edit-bottun-svg bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
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
