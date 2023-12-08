import React from 'react'
import "./Preview.css"
function CartPreview(props) {
  return (
    <div className='CartPreview'>
      <h4 className='preview-title' >Apple -INC</h4>
      <div className="product-container">
        <div className="product-1">
          <img className='preview-img' src="http://localhost:3001/product-displays/6540b1d2823d600093f7117a.jpg" alt="" />
        </div>
        <div className="product-2">
          <img className='preview-img' src="http://localhost:3001/product-displays/6540b1d2823d600093f7117a.jpg" alt="" />
        </div>
        <div className="product-3">
          <img className='preview-img' src="http://localhost:3001/product-displays/6540b1d2823d600093f7117a.jpg" alt="" />
        </div>
        <div className="product-4">
          <img className='preview-img' src="http://localhost:3001/product-displays/6540b1d2823d600093f7117a.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default CartPreview
