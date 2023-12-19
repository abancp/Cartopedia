import React from 'react'
import collections from '../../configurations/collections'
import "./TrendingProduct.css"

function TrendingProduct(props) {
  return (
    <div className='TrendingProduct'>
      {/* <div className="main">
        <div className="image">
          <img className='display' src={`${collections.server_base}/product-displays/${props.Image}`} alt={props.name}/>
        </div>
        <div className="product-details">
          <h3 className="name">{props.Name}</h3>
        </div>
      </div> */}
    </div>
  )
}

export default TrendingProduct
