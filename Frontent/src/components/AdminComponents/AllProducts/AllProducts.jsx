import React, { useEffect, useState, useMemo } from 'react'
import "./AllProducts.css"
import axios from 'axios'
import Product from '../../Product/Product'
import collections from '../../../configurations/collections'

function AllProducts() {
  const [products, setProducts] = useState([])
  const [deleted,setDeleted] = useState(Date.now())

  const handleDeleteCallback = (date) => {
    setDeleted(date)
  }

  const headers = useMemo(() => ({
    'Authorization':  window.localStorage.getItem("token")
  }), [])

  useEffect(() => {
    axios.get(collections.server_base + "/admin/products/all/" + 0, { headers }).then((res) => {
      setProducts(res.data.products)
    })
  }, [deleted,headers])

  return (

    <div className='AllProducts-main'>
      {
        products?.map((product, i) => (
          <Product removeLink={'/admin/company-product?proId=' + product._id} allProductForAdminPanel key={i} {...product} handleDeleteCallback={handleDeleteCallback} />
        ))
      }
    </div>

  )
}

export default AllProducts
