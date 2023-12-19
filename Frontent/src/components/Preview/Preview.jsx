import React from 'react'
import "./Preview.css"
import collections from "../../configurations/collections"

function CartPreview(props) {
  console.log(props);
  return (
    <div className='CartPreview'>
      <h4 className='preview-title' >{props.title}</h4>
      <div className="product-container">
        {
          props.products?.map((product,i) => (
            <div key={i} className="product-1">
              <img className='preview-img' src={collections.server_base + "/product-displays/" + product._id + ".jpg"} alt="" />
            </div>
          ))
        }

        {/* <div className="product-2">
          <img className='preview-img' src={collections.server_base + "/product-displays/6540b1d2823d600093f7117a.jpg"} alt="" />
        </div>
        <div className="product-3">
          <img className='preview-img' src={collections.server_base + "/product-displays/6540b1d2823d600093f7117a.jpg"} alt="" />
        </div>
        <div className="product-4">
          <img className='preview-img' src={collections.server_base + "/product-displays/6540b1d2823d600093f7117a.jpg"} alt="" />
        </div> */}
      </div>
    </div>
  )
}

export default CartPreview
