import React, {  useEffect, useState } from 'react'
import "./Header.css"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Header(props) {
  const [userName, setUserName] = useState(null)
  const [email, setEmail] = useState(null)
  const [company,setCompany] = useState(false)
  const [admin,setAdmin] = useState(false)
  const navigate = useNavigate()
  const store = useSelector((reduxState) => (reduxState.user))

  useEffect(()=>{
    if (store) {
      store.then((user) => {
        setUserName(user.firstName + " " + user.lastName)
        setEmail(user.email)
        setCompany(user.company)
        setAdmin(user.admin)
        if (user.firstName === undefined) {
          window.localStorage.clear()
          window.location.reload()
        }
      })
    }
  })
  const handleSearch = (e) => {
      navigate("/loading", { state: { loadingCode: 0 ,searchedLine: e.target[0].value, email: email }})
  }
  return (
    <div className='Header'>
      <div className="left-div">
        <h3 className='branding' onClick={()=>  window.location.pathname !=='/' ? navigate("/") : null}>Cartopedia</h3>
        <h5 className="sell" onClick={()=>window.location.pathname !== '/add-company-product' ? navigate("/loading", { state: { loadingCode: 1  }}) : null }> {company || admin ?"Sell":""} </h5>
        <Link to={"/admin/dashboard"} className='text-decoration-none'><h5 className="sell"> { admin ?"Panel":""} </h5></Link>
      </div>
      <div className="center-div">
        <div className='search'>
          <form className='search-form' onSubmit={handleSearch}>
            <input type="text" placeholder={props.searchedLine?props.searchedLine:""} className='search-input' />
            <button className='search-btn' type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="search-icon bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            </button>
          </form>
        </div>
      </div>
      <div className="right-div">
        <div className='account'>
          {userName ? <div className='account-login-div'>
            <Link className='text-decoration-none' to={"/user-profile"} ><h5 className='account-login-h4'>{userName}</h5></Link>
          </div> : <div className='account-loginorsignup'>
            <div className='account-login-div'>
              <Link className='text-decoration-none' to={"/login"} ><h5 className='account-login-h4'>login</h5></Link>
            </div>
            <div className='account-signup-div'>
              <Link className='text-decoration-none' to={"/signup"}><h5 className='account-signup-h4'>signup</h5></Link>
            </div>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default Header
