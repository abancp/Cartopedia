import React from 'react'
import "./IndrestedItems.css"
import collections from '../../configurations/collections'
import {Link} from 'react-router-dom'

function IndrestedItems(props) {
  console.log(props)
  return (
    <div className='IndrestedItems'>
      <div className="indrested-container-div">
        <div className="indrested-div">
          
          <div className="indrested-top">
            <div className="indrested-prodect-img-div">
            <Link to={'product/'+props.item._id} >
            <img className="indrested-product-img" src={`${collections.server_base}/product-displays/${props.item._id}.jpg`} alt={props.item.name}  />
            </Link>
            </div>
            <div className="indrested-product-details-div">
            <Link className='product-details-link text-decoration-none' to={'product/'+props.item._id} >
              <h5 className='indrested-product-title'>{props.item.name}</h5>
              <h6 className='indreste-product-description'>{props.item.description}</h6>
              <h5 className='indrested-product-prize'>{props.item.price}<span className='indrested-product-striked-prize'><strike>15000$</strike><span className='indrested-product-offer-percent'>{(13200 * 100) / 15000}% offer</span></span></h5>
              <div className="company-category-div">
              <h6 className='indrested-product-company'>{props.item.companyName}</h6>
              <h6 className='indrested-product-category'>{props.item.category}</h6>
              </div>
              </Link>
            </div>
          </div>
          <div className="indrested-bottum">
            <div className="indrested-company-div">
              <img className='indrested-company' src="data:image/png;base64,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" alt="Company" />
            </div>
            <div className="indrested-category-div">
              <img className='indrested-category' src="data:image/png;base64,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" alt="Category" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndrestedItems
