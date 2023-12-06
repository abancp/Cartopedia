import React, { useEffect, useState } from 'react'
import './CartPage.css'
import Header from '../../components/Header/Header'
import axios from 'axios'
import collections from '../../configurations/collections'
import Product from '../../components/Product/Product'
import { useSelector } from 'react-redux'
import IndrestedProduct from '../../components/IndrestedProduct/IndrestedProduct'
import { useNavigate } from 'react-router-dom'

function CartPage() {
  const store = useSelector((state) => (state.user))

  const [products, setProducts] = useState([])
  const [userId, setUserId] = useState()
  const [price, setPrice] = useState(0)
  const [removed, setRemoved] = useState(Date.now())

  const navigate = useNavigate()

  useEffect(() => {
    if (store) store.then((res) => { setUserId(res._id); })
    axios.get(`${collections.server_base}/cart-items/${userId}`).then((res) => {
      setProducts(res.data.products)
      setPrice(res.data.totalPrice)
    })
    //FIXME instant cart loading
  }, [userId, removed])

  const handleRevoveCallback = (date) => {
    setRemoved(date)
  }

  return (
    <div className='CartPage'>
      <Header />
      <div className="CartPage-main">
        <div className="heading-div">
          <h4 className='shopping-cart-heading-h4'> Shopping Cart </h4>
          <hr />
        </div>
        <div className="cart-div">
          <div className="cart-products-container">
            {products.map((product, i) => {
              if (!product.deleted) {
                return <Product handleDeleteCallback={handleRevoveCallback} cartItem removeLink={"/cart-product?userId=" + userId + "&proId=" + product._id}  {...product} userId={userId} key={i} />
              } else {
                return <Product handleDeleteCallback={handleRevoveCallback} cartItem removeLink={"/cart-product?userId=" + userId + "&proId=" + product?._id} deletedItem name="This Delete Was Delete from Owner" description="Please remove from cart" key={i} />
              }
            })}
          </div>
          <div className="cart-left-div">
            <div className="cart-order-container">
              <h4>Your cart ({products?.length})</h4>
              <hr />
              <h5>Total price : ₹ {price}/-</h5>
              <hr />
              <div className="cart-controls-div">
                <div className="place-order-bottun" onClick={() => navigate('/place-order/cart')}  ><h5>Place Order</h5></div>
              </div>
            </div>
            <div className="cart-relative-products-div">
              {
                products.map((product, i) => (
                  <IndrestedProduct key={i} indrestedItem={product} />
                ))
              }
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
