import React, { useEffect, useState } from 'react'
import "./AddCategoryPage.css"
import CompanyInput from '../../components/Inputs/CompanyInput'
import Header from '../../components/Header/Header'
import Button from '../../components/Button/Button'
import collections from '../../configurations/collections'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'

function AddCategoryPage() {

  const navigate = useNavigate()

  const [categoryName, setCategoryName] = useState('')
  const [company, setCompany] = useState('')
  const user = useSelector((state) => state.user);

  const addCategoryReq = () => {
    axios.post(collections.server_base + '/company/add-category', { categoryName }, { headers: { Authorization: window.localStorage.getItem("token") } }).then(() => {
      navigate('/')
    })
  }

  useEffect(() => {
    if (user) {
      setCompany(user.company)
    }
  }, [user])

  if (company) {
    return (
      <div className='AddCategoryPage'>
        <Header />
        <div className="AddCategoryPage-main">
          <h3 className='title-h3'>Add Category</h3>
          <div className='line'></div>
          <p className='title-h3 text-center' >Enter your own category name and submit . Our admins will check the category and will add for you</p>
          <CompanyInput width="30rem" value={categoryName} onChange={(e) => { setCategoryName(e.target.value) }} placeholder="name" />
          <div className='buttons'>
            <Button text="Cancel" />
            <Button text="Submit" onClick={addCategoryReq} />
          </div>
        </div>
      </div>
    )
  } else {
    return (<div className='users-block'></div>)
  }
}

export default AddCategoryPage
