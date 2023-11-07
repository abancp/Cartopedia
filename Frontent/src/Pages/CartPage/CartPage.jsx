import React, { useEffect, useState } from 'react'
import './CartPage.css'
import Header from '../../components/Header/Header'
import axios from 'axios'
import collections from '../../configurations/collections'
import Product from '../../components/Product/Product'
import { useSelector } from 'react-redux'
import IndrestedItems from '../../components/IndrestedItems/IndrestedItems'
import IndrestedProduct from '../../components/IndrestedProduct/IndrestedProduct'

function CartPage() {

  const [products, setProducts] = useState([])
  const [user, setUser] = useState({})
  const [price, setPrice] = useState(0)
  const [mrp, setMrp] = useState(0)
  const store = useSelector((state) => (state.user))

  useEffect(() => {

    store?.then((res) => { setUser(res) })
    axios.get(`${collections.server_base}/cart-items/${user._id}`).then(res => setProducts(res.data.products))

  }, [user])
  useEffect(() => {

    var price = {}
    var mrp = {}
    if (products) {
      for (var i = 0; i < products.length; i++) {
        price[i] = Number(products[i].price)
        mrp[i] = Number(products[i].mrp)
      }
      setPrice(Object.values(price).reduce((a, b) => a + b, 0))
      setMrp(Object.values(mrp).reduce((a, b) => a + b, 0))
    }

  }, [products])
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
            {products?.map((product, i) => (
              <Product {...product} key={i} cart={true} />
            ))}
          </div>
          <div className="cart-left-div">
            <div className="cart-order-container">
              <h4>Your cart ({products?.length})</h4>
              <hr />
              <h5 > Total Price : ₹ <strike className='total-mrp-strike' >{mrp}</strike>/-</h5>
              <h5> Discount : {100 - (Math.round((parseInt(price) * 100) / parseInt(mrp)))} % </h5>
              <h5>Our price : ₹ {price}/-</h5>
              <hr />
              <div className="cart-controls-div">
                <div className="place-order-bottun"><h5>Place Order</h5></div>
              </div>
            </div>
            <div className="cart-relative-products-div">
              {
                products.map((product)=>(
                  <IndrestedProduct indrestedItem={product} />
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
