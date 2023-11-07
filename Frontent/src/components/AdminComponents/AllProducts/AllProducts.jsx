import React, { useEffect, useState,useMemo } from 'react'
import "./AllProducts.css"
import axios from 'axios'
import Product from '../../Product/Product'
import collections from '../../../configurations/collections'

function AllProducts() {
  const [products, setProducts] = useState([{}])

  const headers = useMemo(() => ({
    'Authorization': window.localStorage.getItem("token")
  }), [])

  useEffect(() => {
    axios.get(collections.server_base + "/admin/products/all/" + 0, { headers }).then((res) => {
      setProducts(res.data.products)
    })
  }, [])

  return (

    <div className='AllProducts-main'>
      {
        products.map((product,i) => (
          <Product key={i} {...product} />
        ))
      }
    </div>

  )
}

export default AllProducts
