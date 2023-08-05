import React, { useEffect, useState } from 'react';
import "./Header.css"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
function Header(props) {
  const [userName, setUserName] = useState(null)
  const [searchedLine, setSearchedLine] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((reduxState) => (reduxState.user))
  if (user) {
    user.then((user) => {
      setUserName(user.firstName + " " + user.lastName)
      if (user.firstName === undefined) {
        window.localStorage.clear()
        window.location.reload()
      }
    })
  }
  return (
    <div className='Header'>
      <div className="left-div">
        <Link className='text-decoration-none' to={"/"}><h3 className='branding'>Cartopedia</h3></Link>
      </div>
      <div className="center-div">
        <div className='search'>
          <input type="text" placeholder={props.searchedLine} className='search-input' onChange={(e) => { setSearchedLine(e.target.value) }} />
          <svg onClick={() => navigate("/search", { state: { searchedLine: searchedLine } }) } xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="search-icon bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
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
  );
};

export default Header;
