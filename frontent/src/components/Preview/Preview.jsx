import React from 'react'
import "./Preview.css"
function CartPreview(props) {
  return (
    <div className='CartPreview'>
      <div className="main">
        <h3 className='cart-name'>{props.heading}</h3>
        <div className="image-div">{props.icon}</div>
        <div className="cart-details">
          <div className={` cart-recent ${props.line?"bottum-border":""} `}>
            <h5>{props.text1}</h5>
            <h5>{props.text2}{props.etc ? <span>...</span> : ""}</h5>
          </div>
          <h4 className='total-itmes'>{props.text3}</h4>
          <h4>{props.text4}</h4>
        </div>
        <div className="cart-actions"> {props.button1} {props.button2} </div>
      </div>
    </div>
  )
}

export default CartPreview
