import React, { useEffect, useState } from 'react';
import './SearchResultPage.css'
import { useLocation } from 'react-router-dom';
import Product from '../../components/UserComppnents/Product/Product';
import axios from 'axios';
import collections from '../../configurations/collections';
import Header from '../../components/Header/Header';

function SearchResultPage() {
  const [categories, setCategaries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  let searchedLine = location.state.searchedLine
  let email = location.state.email
  useEffect(() => {
    axios.get(collections.server_base + "/search/" + searchedLine + "/" + email).then((res) => {
      console.log(res)
      setCategaries(res.data.categories)
      setCompanies(res.data.companies[0])
      setProducts(res.data.products)
    })
  }, [email,searchedLine])
  return (
    <div className='SearchResultPage'>
      <Header searchedLine={searchedLine}/>
      <div className='search-result-container'>
        <div className='reults-row'>
          {categories.map((category, i) => (
            <Product key={`${i}`} Name={`${category}`} />
          ))}
          {companies.map((company, i) => (
            <Product key={`${i}`} Name={`${company.companyDetails.companyName}`} Website={`${company.companyDetails.website}`} Email={`${company.companyDetails.email}`} Image={`${company.companyDetails.email + ".jpg"}`} Description={`${company.companyDetails.description}`} />
          ))}
          {products.map((product, i) => (
            <Product key={`${i}`} Name={`${product.name}`} Price={`${product.price}`} Category={`${product.category}`} Image={`${product._id + ".jpg"}`} CompanyName={`${product.companyName}`} Description={`${product.description}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;
