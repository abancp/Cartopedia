import React, { useEffect, useState } from 'react'
import Preview from "../Preview/Preview"
import "./Previews.css"
import axios from 'axios'
import collections from '../../configurations/collections'

function Previews(props) {

  const [ratedProducts, setRatedProducts] = useState([{}])
  const [categories, setCategories] = useState([{}])
  const [companies, setCompanies] = useState([{}])
  const [products, setProducts] = useState([{}])

  useEffect(() => {
    console.log(props);
    axios.get(collections.server_base + "/recommented/" + props.user?._id).then(({ data }) => {
      console.log(data.products[0][0]._id)
      setRatedProducts(data.products[0])
      console.log(ratedProducts)
    })

  },[])

  return (
    <div className='Previews'>
      <Preview title="4 + Rated" id={ratedProducts[0]} />
      <Preview title="Categories" id={ratedProducts[0]} />
      <Preview title="Companies" id={ratedProducts[0]} />
      <Preview title="Products" id={ratedProducts[0]} />
    </div>
  )
}

export default Previews
