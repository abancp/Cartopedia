import React, { useEffect, useState } from 'react'
import './CartPage.css'
import Header from '../../components/Header/Header'
import axios from 'axios'
import collections from '../../configurations/collections'
import Product from '../../components/Product/Product'
import { useSelector } from 'react-redux'
import IndrestedProduct from '../../components/IndrestedProduct/IndrestedProduct'

function CartPage() {

  const [products, setProducts] = useState([])
  const [user, setUser] = useState({})
  const [price, setPrice] = useState(0)
  const [mrp, setMrp] = useState(0)
  const [removed,setRemoved] = useState(Date.now())
  const store = useSelector((state) => (state.user))

  useEffect(() => {

    store?.then((res) => { setUser(res) })
    axios.get(`${collections.server_base}/cart-items/${user._id}`).then(res => setProducts(res.data.products))

  }, [user,removed,store])

  useEffect(() => {
    var price = {}
    var mrp = {}
    if (products) {
      for (var i = 0; i < products.length; i++) {
        price[i] = products[i] ? Number(products[i]?.price) : 0
        mrp[i] = products[i] ? Number(products[i]?.mrp) : 0
      }
      setPrice(Object.values(price).reduce((a, b) => a + b, 0))
      setMrp(Object.values(mrp).reduce((a, b) => a + b, 0))
    }

  }, [products,removed,user,store])

  const handleRevoveCallback = (date)=>{
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
               return <Product handleDeleteCallback={handleRevoveCallback} cartItem removeLink={"/remove/cart-product?userId="+user._id+"&proId="+product._id}  {...product} key={i} />
              }else{
                return <Product handleDeleteCallback={handleRevoveCallback} cartItem removeLink={"/remove/cart-product?userId="+user._id+"&proId="+product?._id} deletedItem name="This Delete Was Delete from Owner" description="Please remove from cart" key={i} />
              }
            })}
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
