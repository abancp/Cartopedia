import React, { useEffect, useState } from 'react'
import './AdminHeader.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AdminHeader(props) {
  const [userName, setUserName] = useState(null)
  const [email, setEmail] = useState(null)
  const [admin, setAdmin] = useState(false)
  const navigate = useNavigate()
  const store = useSelector((reduxState) => (reduxState.user))
  useEffect(() => {
    if (store) {
      store.then((user) => {
        setUserName(user.firstName + " " + user.lastName)
        setEmail(user.email)
        setAdmin(user.admin)
        if (user.firstName === undefined) {
          window.localStorage.clear()
          window.location.reload()
        }
      })
    }
  })
  return (
    <div className='Header AdminHeader'>
      <div className="left-div">
        <h3 className='branding' onClick={() => window.location.pathname !== '/' ? navigate("/") : null}>Cartopedia</h3>
        <h3 onClick={()=>window.location.pathname !== '/admin' ? navigate("/admin") : null}  className='text-decoration-none color-tersiory branding'> / Admin</h3>
        <h3 className='text-decoration-none color-tersiory branding'> / {window.location.pathname.split('/')[2].charAt(0).toUpperCase() + window.location.pathname.split('/')[2].slice(1)}</h3>
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

export default AdminHeader
