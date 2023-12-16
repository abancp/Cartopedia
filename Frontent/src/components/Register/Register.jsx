import React, { useState } from 'react';
import "./Register.css";
import Dropzone from "react-dropzone"
import axios from 'axios';
import collections from '../../configurations/collections';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';


function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [acceptedFile, setAsseptedFile] = useState(null);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [userNameErr, setUserNameErr] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[5].value === e.target[6].value) {
      axios.post(collections.server_base + "/check-email-availablility", { email: e.target[3].value, userName: e.target[2].value }).then((res) => {
        if (res.data.userName) {
          setUserNameErr(true);
        } else {
          setUserNameErr(false);
          if (res.data.email) {
            setEmailErr(true);
          } else {
            setEmailErr(false);
            let formData = new FormData();
            formData.append('email', e.target[3].value);
            formData.append('file', acceptedFile);
            axios.post(collections.server_base + "/uplaod/user-profile", formData).then((res) => {
              let user = {
                firstName: e.target[0].value,
                lastName: e.target[1].value,
                userName: e.target[2].value,
                email: e.target[3].value,
                phone: e.target[4].value,
                password: e.target[5].value
              }
              axios.post(collections.server_base + "/register", user).then((res) => {
                window.localStorage.setItem("token", res.data.token);
                dispatch({ type: "user", payload: { user:res.data.user } });
                navigate("/");
              })
            });
          }
        }
      })
    } else {
      setPasswordErr(true);
    }
  }
  return (
    <div className='register '>
      <div className="container-fluid">
        <div className="row d-flex justify-content-end">
          <div className='col-lg-5 col-12 col-md-6 register-form-div mx-md-3 '>
            <img src="/register-bg.jpg" alt="" className='col-12 register-form-div-cart-bg' />
            <form action="" method="" onSubmit={handleSubmit} >
              <h2 className="register-form-heading mt-4 text-center">Register</h2>
              <div className='d-flex justify-content-between'>
                <input type="text" className='col register-form-firstName-input register-form-input' name='firstName' placeholder='First Name' />
                <input type="text" className='col register-form-lastName-input register-form-input' name='lastName' placeholder='Last Name' />
              </div>
              {userNameErr ? <p className='margin-top-2 mb-0 text-danger'>this Username is already using</p> : ""}
              <input type="text" onChange={() => { setUserNameErr(false) }} className={`${userNameErr ? 'margin-top-0' : "margin-top-2"} register-form-userName-input register-form-input`} name='userName' placeholder='Username' />
              {emailErr ? <p className='margin-top-2 mb-0 text-danger'>this email is already existing</p> : ""}
              <input onChange={() => { setEmailErr(false) }} type="email" className={`${emailErr ? 'margin-top-0' : "margin-top-2"} register-form-email-input register-form-input`} name='email' placeholder='Email' />
              <input type="text" className='register-form-phone-input register-form-input' name='phone' placeholder='Phone' />
              <input type="password" className='register-form-password-input register-form-input' name='password' placeholder='Password' />
              {passwordErr ? <p className='margin-top-2 mb-0 text-danger'>Password not matching</p> : ""}
              <input onChange={() => { setPasswordErr(false) }} type="password" className={`${passwordErr ? 'margin-top-0' : "margin-top-2"} register-form-confirm-password-input register-form-input`} name='confirmPassword' placeholder='Confirm Password' />
              <Dropzone multiple={false} onDrop={acceptedFiles => { setAsseptedFile(acceptedFiles[0]); console.log(acceptedFiles[0]) }}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div className='register-form-profile-dropzone pt-1' {...getRootProps()}>
                      <input className='register-form-input'  {...getInputProps()} />

                      <h6 className='text-secondary'>{`${acceptedFile ? acceptedFile.name : "Profile Browse or Drop"}`}</h6>
                    </div>
                  </section>
                )}
              </Dropzone>
              <button className='register-form-submit-button' type="submit">SUBMIT</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
