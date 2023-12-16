import React, { useEffect, useState } from 'react'
import './AdminHeader.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AdminHeader() {
  const [userName, setUserName] = useState(null)
  const navigate = useNavigate()
  const user = useSelector((reduxState) => (reduxState.user))
  useEffect(() => {
    if (user) {
      setUserName(user.firstName + " " + user.lastName)
      if (user.firstName === undefined) {
        window.localStorage.clear()
        window.location.reload()
      }
      if (!user.admin) navigate('/')
    } else {
      navigate('/')
    }
  })
  return (
    <div className='Header AdminHeader'>
      <div className="left-div">
        <h3 className='branding' onClick={() => window.location.pathname !== '/' ? navigate("/") : null}>Cartopedia</h3>
        <h3 onClick={() => window.location.pathname !== '/admin' ? navigate("/admin") : null} className='text-decoration-none color-tersiory branding'> / Admin</h3>
        <h3 className='text-decoration-none color-tersiory branding'> / {window.location.pathname.split('/')[2] ? window.location.pathname.split('/')[2].charAt(0).toUpperCase() + window.location.pathname.split('/')[2].slice(1) : navigate('/')}</h3>
      </div>

      <div className="right-div">
        <div className='account'>
          {userName ? <div className='account-login-div'>
            <Link className='text-decoration-none' to={"/user-profile"} ><h5 className='account-login-h4'>{userName}</h5></Link>
          </div> : navigate("/")}
        </div>
      </div>
    </div>
  )
}

export default AdminHeader
