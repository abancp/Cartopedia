import React,{useState,useEffect} from 'react';
import "./Header.css";
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';

function Header() {
  const [username,setUsername] = useState(null)
  var store = useSelector((state)=>{return state.user})
  useEffect(()=>{
    if(store){
        store.then((res)=>{setUsername(res.firstName+" "+res.lastName)});
    }
  });

  return (
    <div className='Header'>
      <div className='container-fluid' >
        <div className="row">
          <div className="col-12 d-flex justify-content-between">
            <div className="header-left col-6 ">
              <Link className='link' to={`/`}><h2  className='header-left-branding d-inline'>Cartopedia</h2></Link>
              <Link className='link' to={`/used`}><h4 className='header-left-branding-used d-inline' >Used</h4></Link>
            </div>
            
            <div className="header-right col-6 d-flex justify-content-end">
              <div className="header-right-cart-svg-div" >
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="header-right-cart-svg d-inline bi bi-cart2" viewBox="0 0 16 16">
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
              </svg>
              <span class=" badge  bg-success">10</span>

              </div>

              <div className="header-right-accountbar mt-2 d-flex justify-content-between">
                <div className={`header-right-accountbar-image ${username?"header-right-accountbar-image-logged-in":"header-right-accountbar-image-not-loggin"}`}>
                  <Link to={`/signup`}  className={`${username?"":"text-decoration-none"}`} ><h6 className={`${username?"":"padding-left-3px header-right-accountbar-singup-h6"}`} >{username?"":"signup"}</h6></Link>
                </div>
                <div className="header-right-accountbar-username-div">
                <Link to={`${username?"/profile":"/login"}`}  className="text-decoration-none" ><h6 className={`${username?"header-right-accountbar-username":" header-right-accountbar-username"}`} >{username?username:"login"}</h6></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
