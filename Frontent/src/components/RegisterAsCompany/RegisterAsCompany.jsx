import React, { useState, useEffect } from 'react';
import "./RegisterAsCompany.css";
import axios from 'axios';
import collections from '../../configurations/collections';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';


function RegisterAsCompany() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [companyErr, setCompanyErr] = useState(false);
  const [websiteErr, setWebsiteErr] = useState(false);
  const [email, setEmail] = useState(null);

  var store = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    if (store) {
      store.then((res) => {
        setEmail(res.email);
        if (res.company) {
          navigate("/");
        }
      });
    }
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    axios.post(collections.server_base + "/check-companyname-availablility", { companyName: e.target[0].value, website: e.target[1].value }, { headers: { 'Authorization': window.localStorage.getItem("token") } }).then((res) => {
      if (res.data.companyName) {
        setCompanyErr(true)
      } else {
        setCompanyErr(false);
        if (res.data.website) {
          setWebsiteErr(true);
        } else {
          setWebsiteErr(false);
          let company = {
            companyName: e.target[0].value,
            website: e.target[1].value,
            categories: e.target[2].value,
            location: e.target[3].value,
            description: e.target[4].value,
            email: email
          }
          axios.post(collections.server_base+"/add-company-temparerly", company).then((res) => {
            dispatch({
              type: company
            });
            console.log("is it execute")
            axios.post(collections.server_base + "/get-otp-email", { email: email }).then((res) => {
              navigate("/verify-email")
            })
          })
        }
      }
    })

  }
  return (
    <div className='register'>
      <div className="container-fluid">
        <div className="row d-flex justify-content-end">
          <div className='col-lg-5 col-12 col-md-6 register-form-div mx-md-3 '>
            <img src="/register-bg.jpg" alt="" className='col-12 register-form-div-cart-bg' />
            <form action="" method="" onSubmit={handleSubmit} >
              <h2 className="register-form-heading mt-4 text-center">Register As a Company</h2>
              {companyErr ? <p className='margin-top-2 mb-0 text-danger'>this Company is already registered</p> : ""}
              <input type="text" onChange={() => { setCompanyErr(false) }} className={`${companyErr ? 'margin-top-0' : "margin-top-2"} register-form-userName-input register-form-input`} name='company' placeholder='Company Full Name' />
              {websiteErr ? <p className='margin-top-2 mb-0 text-danger'>this site is already using</p> : ""}
              <input onChange={() => { setWebsiteErr(false) }} type="text" className={`${websiteErr ? 'margin-top-0' : "margin-top-2"} register-form-email-input register-form-input`} name='website' placeholder='Company Official Web Site' />
              <input type="text" className='register-form-phone-input register-form-input' name='categories' placeholder='Categories of Products' />
              <input type="text" className='register-form-password-input register-form-input' name='location' placeholder='Location' />
              <textarea className='register-form-input register-form-description-textarea' name="description" placeholder='Write a description of your Company' rows="1" ></textarea>
              <p>our admins will check your request and if it genuin we will email you</p>
              <button className='register-form-submit-button' type="submit" >Verify Email</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAsCompany;
