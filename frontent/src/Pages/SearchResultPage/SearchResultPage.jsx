import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Product from '../../components/UserComppnents/Product/Product';
import axios from 'axios';
<<<<<<< HEAD:frontent/src/Pages/SearchResultPage.jsx
import collections from '../configurations/collections';
=======
import collections from '../../config/collections';
import { useSelector } from 'react-redux';
>>>>>>> master:frontent/src/Pages/SearchResultPage/SearchResultPage.jsx

function SearchResultPage() {
  const [categories, setCategaries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState(undefined)
  const location = useLocation();
  let searchedLine = location.state.searchedLine
  let store = useSelector((state) => {
    return state.user
  })
  setEmail()
  useEffect(() => {
    if (store) {
      store.then((user) => {
        setEmail(user.email)
      })
    }
    axios.get(collections.server_base + "/search/" + searchedLine + "/" + email).then((res) => {
      console.log(res)
      setCategaries(res.data.categories)
      setCompanies(res.data.companies[0])
      setProducts(res.data.products)
    })
<<<<<<< HEAD:frontent/src/Pages/SearchResultPage.jsx
  }, [searchedLine])
=======
  }, [email,searchedLine,store])
>>>>>>> master:frontent/src/Pages/SearchResultPage/SearchResultPage.jsx
  return (
    <div className='SearchResultPage'>
      <div className='container-fluid'>
        <div className='row'>
          {categories.map((category, i) => (
            <Product key={`${i}`} Name={`${category.companyDetails.companyName}`} />
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
