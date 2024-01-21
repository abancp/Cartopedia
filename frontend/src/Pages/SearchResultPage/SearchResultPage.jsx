import React, { useEffect, useState } from 'react'
import './SearchResultPage.css'
import axios from 'axios'
import Header from '../../components/Header/Header'
import Product from '../../components/Product/Product'
import collections from '../../configurations/collections'
import { useLocation } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'

function SearchResultPage() {

  const [products, setProducts] = useState([])
  const [companies, setCompanies] = useState([])
  const [categories, setCategaries] = useState([])
  const [displayUrl,setDisplayUrl] = useState('')

  const location = useLocation()

  let email = location.state.email
  let searchedLine = location.state.searchedLine

  useEffect(() => {

    axios.get(collections.server_base + "/search/" + searchedLine ).then((res) => {
      setCategaries(res.data.categories)
      setCompanies(res.data.companies[0])
      setProducts(res.data.products)
    })

  }, [email, searchedLine])

  return (
    <div className='SearchResultPage'>
      <Header searchedLine={searchedLine} />
      <div className='search-result-container'>
        {categories.map((category, i) => (
          <Product key={`${i}`} Name={`${category}`} />
        ))}
        {companies.map((company, i) => (
          <Product key={`${i}`}  Name={`${company.companyDetails.companyName}`} Website={`${company.companyDetails.website}`} Email={`${company.companyDetails.email}`} Image={`${company.companyDetails.email + ".jpg"}`} Description={`${company.companyDetails.description}`} />
        ))}
        {products.map((product, i) => (
          <Product {...product} key={i} />
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default SearchResultPage
