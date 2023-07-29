import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import "./RegisterPage.css"
import Input from '../../components/Input/Input';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import collections from '../../configurations/collections';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../configurations/firebase"


function RegisterPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [userName, setUserName] = useState('')
  const [profile, setProfile] = useState(null)
  const [passwordErr, setPasswordErr] = useState(false)
  const [emailErr, setEmailErr] = useState(false)
  const [userNameErr, setUserNameErr] = useState(false)
  const [phoneErr, setPhoneErr] = useState()
  const [uploadProfile,setUploadProfile] = useState(false)
  if (page === 1) {
    setTimeout(() => { handlePageChange(1) }, 2300)
  }
  const handlePageChange = (change) => {
    if (page === 7 && change === 1) {
      setPage(8)
      if (password === confirmPassword) {
        axios.post(collections.server_base + "/check-user-availablility", { email, userName, phone }).then((res) => {
          console.log(res.data)
          if (res.data.userName) {
            setUserNameErr(true);
            setPage(6)
          } else {
            setUserNameErr(false);
            if (res.data.email) {
              setEmailErr(true);
              setPage(3)
            } else {
              setEmailErr(false);
              if (res.data.phone) {
                setPhoneErr(true)
                setPage(5)
              } else {
                setPhoneErr(false)
              let formData = new FormData();
              formData.append('email', email);
              formData.append('file', profile);
              axios.post(collections.server_base + "/uplaod/user-profile", formData).then((res) => {
                let user={
                  firstName,
                  lastName,
                  userName,
                  email,
                  phone,
                  password
                }
                  axios.post(collections.server_base + "/register", user).then((res) => {
                    dispatch({
                      type: user
                    });
                    window.localStorage.setItem("token", res.data.token);
                    dispatch({
                      type: user
                    });
                    navigate("/");
                  })
                });
              }

            }
          }
        })
      } else {
        setPasswordErr(true);
        setPage(4)
      }
    } else {
      (page === 1 && change === -1) || (page === 8 && change === 1) ? setPage(page) : setPage(page + change)
    }
  }
  return (
    <div className='RegisterPage'>
      <Header />
      <div className='register'>
        <div onClick={() => { handlePageChange(-1) }} className="left-arrow"><i className="arrow arrow-left bi bi-arrow-left"></i></div>
        <div className="main-input">
          {(() => {
            switch (page) {
              case 1:
                return <div className='inner'><h1 className='first-page-text'><span className='f-t-1'>Create</span> <span className='f-t-2'>an</span> <span className='f-t-3'>Account</span> <span className='f-t-4'>and</span> <span className='f-t-5'>Start</span></h1> </div>;
              case 2:
                return <div className='inner'>
                  <div className="register-page">
                    <h2 className="screen2-tet">Start from Your Name ...</h2>
                    <div className="regiser-inputs">
                      <Input onChange={(e) => { setfirstName(e.target.value) }} value={firstName} width="13rem" type="text" placeholder="Firstname" />
                      <Input onChange={(e) => { setlastName(e.target.value) }} value={lastName} width="13rem" type="text" placeholder="Lastname" />
                    </div>
                  </div>
                </div>
              case 3:
                return <div className='inner'>
                  <div className="register-page">
                    {emailErr ? <h6 className="error">this email already registered</h6> : null}
                    <h2 className="screen2text">Enter Your Email  ...</h2>
                    <div className="regiser-inputs">
                      <Input onChange={(e) => { setEmail(e.target.value) }} value={email} width="15rem" type="email" placeholder="Email" />
                    </div>
                  </div>
                </div>
              case 4:
                return <div className='inner'>
                  <div className="register-page">
                    {passwordErr ? <h6 className="error">passwords not matching</h6> : null}
                    <h2 className="screen2-text">SShhh... Enter Your assword and confirm it  ...</h2>
                    <div className="regiser-inputs">
                      <Input onChange={(e) => { setPassword(e.target.value) }} value={password} width="13rem" type="password" placeholder="Password" />
                      <Input onChange={(e) => { setConfirmPassword(e.target.value) }} value={confirmPassword} width="13rem" type="password" placeholder="Confirm Password" />
                    </div>
                  </div>
                </div>;
              case 5:
                return <div className='inner'>
                  <div className="register-page">
                    {phoneErr ? <h6 className="error">this phone already registered</h6> : null}
                    <h2 className="screen-text">Enter Your Phone ...</h2>
                    <div className="regiser-inputs">
                      <Input onChange={(e) => { setPhone(e.target.value) }} value={phone} width="15rem" type="number" placeholder="Phone" />
                    </div>
                  </div>
                </div>
              case 6:
                return <div className='inner'>
                  <div className="register-page">
                    {userNameErr ? <h6 className="error">this userName already taken.try anthor....</h6> : null}
                    <h2 className="screen-text">Enter Your UserName...</h2>
                    <div className="regiser-inputs">
                      <Input onChange={(e) => { setUserName(e.target.value) }} value={userName} width="15rem" type="text" placeholder="UserName" />
                      <h6 className='subtitle'>Your userName will show when unauthorized people visit your used items</h6>
                    </div>
                  </div>
                </div>
              case 7:
                return <div className='inner'>
                  <div className="register-page">
                    <h2 className="screen-text">...and Your Buetifull Profile</h2>
                    <div className="regiser-inputs">
                      <Dropzone multiple={false} onDrop={acceptedFiles => { setProfile(acceptedFiles[0]); console.log(acceptedFiles[0]) }}>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div className='register-form-profile-dropzone ' {...getRootProps()}>
                              <input className='register-form-input'  {...getInputProps()} />
                              <h6 >{`${profile ? profile.name : "Profile Browse or Drop"}`}</h6>
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    </div>
                  </div>
                </div>
              case 8:
                return <div className="loading-anime">
                  {uploadProfile?<h4 className='loading-h4'>uploading profile</h4>:<h4 className='loading-h4'>craeting user</h4>}

                  <div className="loading-anime-div-1"></div>
                  <div className="loading-anime-div-2"></div>
                  <div className="loading-anime-div-3"></div>
                </div>
              default:
                return <div></div>
            }
          })()}
        </div>
        <div onClick={() => { handlePageChange(1) }} className="right-arrow"><i className="arrow arrow-right bi bi-arrow-right"></i></div>
      </div>
    </div>
  );
};

export default RegisterPage;
