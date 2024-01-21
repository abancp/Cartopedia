import React, { useEffect, useMemo, useState } from 'react'
import Preview from "../Preview/Preview"
import "./Previews.css"
import axios from 'axios'
import collections from '../../configurations/collections'

function Previews(props) {

  const [ratedProducts, setRatedProducts] = useState([{}])
  // const [categories, setCategories] = useState([{}])
  // const [companies, setCompanies] = useState([{}])
  // const [products, setProducts] = useState([{}])

  const headers = useMemo(() => ({
    'Authorization': window.localStorage.getItem("token")
  }), [])

  useEffect(() => {

    axios.get(collections.server_base + "/recommented").then(({ data }) => {
      setRatedProducts(data.products)
    })

  }, [headers])

  return (
    <div className='Previews'>
      <Preview title="4 + Rated" products={ratedProducts} />
      {/* <Preview title="Categories" id={ratedProducts[0]} />
      <Preview title="Companies" id={ratedProducts[0]} />
      <Preview title="Products" id={ratedProducts[0]} /> */}
    </div>
  )
}

export default Previews
