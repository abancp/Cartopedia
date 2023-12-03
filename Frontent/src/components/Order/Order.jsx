import React from 'react'
import "./Order.css"
import IndrestedProduct from '../IndrestedProduct/IndrestedProduct'

function Order(order) {
    return (
        <div className='Order'>
            <div className="order-details">
                <h5>{Date(order.orderDate)}</h5>
                <h5>{order.address.length < 6 ? order.address : order.address.substring(0, 5) + "..."}</h5>
                <h5>{order.delivery}</h5>
                <h5>{order.totalPrice}</h5>
                <h5>{order.payment}</h5>
            </div>
            <div className="order-products">
                {
                    order.products?.map((product, i) => (
                        <IndrestedProduct width="150px" key={i} indrestedItem={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default Order
