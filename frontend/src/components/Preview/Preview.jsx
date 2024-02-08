import React, { useState } from 'react'
import "./Preview.css"
import collections from "../../configurations/collections"
import useDisplayUrl from '../../hooks/useDisplayUrl';
import { Link } from 'react-router-dom'

function CartPreview(props) {
  console.log("products-1", props);
  return (
    <div className='CartPreview'>
      <h4 className='preview-title' >{props.title}</h4>
      <div className="product-container">
        {
          props.products?.map((product, i) => (product.displayUrl !== "" && product.displayUrl !== undefined ?
            <Link to={'/product/' + product._id}><div key={i} className="product-1">
              <img className='preview-img' src={product.displayUrl} alt="" />
            </div></Link> : <Link to={'/product/' + product._id}><div key={i} className="product-1">
              <img className='preview-img' src={collections.server_base + "/product-displays/" + product._id + ".jpg"} alt="" />
            </div></Link>
          ))
        }
      </div>
    </div>
  )
}

export default CartPreview
