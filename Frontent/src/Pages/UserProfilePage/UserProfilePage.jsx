import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import "./UserProfilePage.css"
import { useDispatch, useSelector } from 'react-redux'
import UserProfileLeft from '../../components/UserProfileLeft/UserProfileLeft'
import { useNavigate, useParams } from 'react-router-dom'
// import axios from 'axios'
// import collections from '../../configurations/collections'

function UserProfilePage() {
  //getting theme and user from store
  const storeTheme = useSelector((state) => (state.theme))
  const user = useSelector((state) => (state.user))
  //setting theme and user states
  const [theme, setTheme] = useState(storeTheme)
  //getting profile type from url
  const { type } = useParams()
  // useNavigate 
  const navigate = useNavigate()
  //declaring dispatch from store
  const dispatch = useDispatch()
  //setting theme object
  const themes = {
    dark: "hsla(218, 29%, 11%)",
    light: '#DBE8E1'
  }
  //useEfect to gett user from promise
  useEffect(() => {
    if (!user) {
      navigate('/')
    }
    //dispatch theme
    dispatch({ type: theme })
  })
  // Logout function 
  const logout = () => {
     window.localStorage.clear()
    dispatch({ type: user, payload: { user: {} } })
    navigate('/')
    window.location.reload()
  }
  const handleChangeTheme = () => {
    //setting theme opposite
    setTheme(theme === 'dark' ? 'light' : 'dark')
    dispatch({ type: theme })
    //changing css root vaiables
    document.documentElement.style.setProperty('--primary', themes[theme]);
    document.documentElement.style.setProperty('--tersiory', theme === 'dark' ? themes['light'] : themes['dark']);
  }
  return (
    <div className='UserProfilePage'>
      <Header />
      <div className="UserProfilePage-main">
        {/* calling user details to left div */}
        <UserProfileLeft user={user} type={type} />
        <div className="right" >
          <div className="right-top">
            <div className="theme-selector" onClick={handleChangeTheme}>
              <div className={"theme-option " + theme}>
                {
                  theme === 'dark' ?
                    // moon svg
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="moon-svg bi bi-moon-stars" viewBox="0 0 16 16">
                      <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                      <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
                    </svg>
                    :
                    // sun svg
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="sun-svg bi bi-brightness-high" viewBox="0 0 16 16">
                      <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                    </svg>
                }
              </div>
            </div>
          </div>
          <div className="right-main">

          </div>
          <div className="right-bottum">
            {!user.company && <button className='register-company-btn' onClick={() => { !user.companyPending && navigate('/register-as-company') }} >{user.companyPending ? "waiting for admin response" : "register as company"}</button>}
            <button className='logout-btn' onClick={logout} >logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage
