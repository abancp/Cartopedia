import React, { useEffect, useState } from 'react'
import './CartPage.css'
import Header from '../../components/Header/Header'
import axios from 'axios'
import collections from '../../configurations/collections'
import Product from '../../components/Product/Product'
import IndrestedProduct from '../../components/IndrestedProduct/IndrestedProduct'
import { useNavigate } from 'react-router-dom'

function CartPage() {

  const [products, setProducts] = useState([])
  const [price, setPrice] = useState(0)
  const [date, setDate] = useState(Date.now())


  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${collections.server_base}/cart-items`).then((res) => {
      setProducts(res.data.products)
      setPrice(res.data.totalPrice)
      console.log(res.data)
      if (res.data.products[0]?.useridnotPrvided === 'undefined') {
        throw new Error('user id not provided')
      }
    })
  }, [date])

  const handleRevoveCallback = (date) => {
    setDate(date)
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
                return <Product handleDeleteCallback={handleRevoveCallback} cartItem removeLink={"/cart-product?proId=" + product?._id}  {...product} key={i} />
              } else {
                return <Product handleDeleteCallback={handleRevoveCallback} cartItem removeLink={"/cart-product?proId=" + product?._id} deletedItem name="This Delete Was Delete from Owner" description="Please remove from cart" key={i} />
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
