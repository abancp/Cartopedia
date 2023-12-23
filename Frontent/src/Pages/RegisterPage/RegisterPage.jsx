import React, { useState } from 'react'
import "./RegisterPage.css"
import axios from 'axios'
import Input from '../../components/Inputs/Input'
import Header from '../../components/Header/Header'
import Dropzone from 'react-dropzone'
import collections from '../../configurations/collections'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function RegisterPage() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [profile, setProfile] = useState(null)
  const [userName, setUserName] = useState('')
  const [phoneErr, setPhoneErr] = useState(false)
  const [emailErr, setEmailErr] = useState(false)
  const [password, setPassword] = useState('')
  const [lastName, setlastName] = useState('')
  const [firstName, setfirstName] = useState('')
  const [passwordErr, setPasswordErr] = useState(false)
  const [userNameErr, setUserNameErr] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [uploadingProfile, setUploadingProfile] = useState(false)

  if (page === 1) setTimeout(() => { handlePageChange(1) }, 2000)

  const register = () => {

    let formData = new FormData()
    formData.append('email', email)
    formData.append('file', profile)
    setUploadingProfile(true)

    axios.post(collections.server_base + "/uplaod/user-profile", formData).then(() => {

      setUploadingProfile(false)

      const user = {
        firstName,
        lastName,
        userName,
        email,
        phone,
        password
      }

      axios.post(collections.server_base + "/register", user).then((res) => {

         window.localStorage.setItem("token", res.data.token)
        dispatch({ type: "user", payload: { user: res.data.user } })
        navigate("/")

      })

    })

  }
  const handlePageChange = (change) => {
    switch (page) {
      case 1: change === 1 ? setPage(page + change) : setPage(page); break;
      case 2: setPage(page + change); break;
      case 3:
        if (change === 1) {
          axios.get(`${collections.server_base}/check-email-availability/${email}`).then((res) => {
            if (res.data.email) {
              setEmailErr(true)
            } else {
              setEmailErr(false)
              setPage(page + change)
            }
          })
        } else {
          setPage(page + change)
        } break
      case 4:
        if (change === 1) {
          if (password !== confirmPassword) {
            setPasswordErr(true)
          } else {
            setPasswordErr(false)
            setPage(page + change)
          }
        } else {
          setPage(page + change)
        } break
      case 5:
        if (change === 1) {
          axios.get(`${collections.server_base}/check-phone-availability/${phone}`).then((res) => {
            if (res.data.phone) {
              setPhoneErr(true)
            } else {
              setPhoneErr(false)
              setPage(page + change)
            }
          })
        } else {
          setPage(page + change)
        } break
      case 6:
        if (change === 1) {
          axios.get(`${collections.server_base}/check-username-availability/${userName}`).then((res) => {
            if (res.data.username) {
              setUserNameErr(true)
            } else {
              setUserNameErr(false)
              setPage(page + change)
            }
          })
        } else {
          setPage(page + change)
        } break
      case 7: change === 1 && setPage(8); register(); break;
      default: setPage(1)
    }

  }

  const pages = {
    1: <div className='inner'><h1 className='first-page-text'><span className='f-t-1'>Create</span> <span className='f-t-2'>an</span> <span className='f-t-3'>Account</span> <span className='f-t-4'>and</span> <span className='f-t-5'>Start</span></h1> </div>,
    2: <div className='inner'>
      <div className="register-page">
        <h2 className="screen2-tet">Start from Your Name ...</h2>
        <div className="regiser-inputs">
          <Input autoFocus id="firstName" key="firstName" onKeyDown={(e) => { e.code === 'Enter' && document.getElementById('lastName').focus() }} onChange={(e) => { setfirstName(e.target.value) }} value={firstName} width="13rem" type="text" placeholder="Firstname" />
          <Input id="lastName" key="lastName" onKeyDown={(e) => { e.code === 'Enter' && handlePageChange(1) }} onChange={(e) => { setlastName(e.target.value) }} value={lastName} width="13rem" type="text" placeholder="Lastname" />
        </div>
      </div>
    </div>,
    3: <div className='inner'>
      <div className="register-page">
        {emailErr && <h6 className="error">this email already registered</h6>}
        <h2 className="screen2text">Enter Your Email    ...</h2>
        <div className="regiser-inputs">
          <Input autoFocus id="email" key="email" onKeyDown={(e) => { e.code === "Enter" && handlePageChange(1) }} onChange={(e) => { setEmail(e.target.value) }} value={email} width="15rem" type="text" placeholder="Email" />
        </div>
      </div>
    </div>,
    4: <div className='inner'>
      <div className="register-page">
        {passwordErr && <h6 className="error">passwords not matching</h6>}
        <h2 className="screen2-text">SShhh... Enter Your password and confirm it    ...</h2>
        <div className="regiser-inputs">
          <Input id="password" key="password" autoFocus onKeyDown={(e) => { e.code === "Enter" && document.getElementById('confirmPassword').focus() }} onChange={(e) => { setPassword(e.target.value) }} value={password} width="13rem" type="password" placeholder="Password" />
          <Input id="confirmPassword" key="confirmPassword" onKeyDown={(e) => { e.code === "Enter" && handlePageChange(1) }} onChange={(e) => { setConfirmPassword(e.target.value) }} value={confirmPassword} width="13rem" type="password" placeholder="Confirm Password" />
        </div>
      </div>
    </div>,
    5: <div className='inner'>
      <div className="register-page">
        {phoneErr && <h6 className="error">this phone already registered</h6>}
        <h2 className="screen-text">Enter Your Phone ...</h2>
        <div className="regiser-inputs">
          <Input id="phone" key="phone" autoFocus onKeyDown={(e) => { e.code === "Enter" && handlePageChange(1) }} onChange={(e) => { setPhone(e.target.value) }} value={phone} width="15rem" type="text" placeholder="Phone" />
        </div>
      </div>
    </div>,
    6: <div className='inner'>
      <div className="register-page">
        {userNameErr && <h6 className="error">this userName already taken.try anthor....</h6>}
        <h2 className="screen-text">Enter Your UserName...</h2>
        <div className="regiser-inputs">
          <Input id="username" key="username" autoFocus onKeyDown={(e) => { e.code === "Enter" && handlePageChange(1) }} onChange={(e) => { setUserName(e.target.value) }} value={userName} width="15rem" type="text" placeholder="UserName" />
          <h6 className='subtitle'>Your userName will show when unauthorized people visit your used items</h6>
        </div>
      </div>
    </div>,
    7: <div className='inner' onKeyDown={(e) => { e.code === "Enter" && handlePageChange(1) }}>
      <div className="register-page" onKeyDown={(e) => { e.code === "Enter" && handlePageChange(1) }}>
        <h2 className="screen-text">...and Your Buetifull Profile</h2>
        <div onKeyDown={(e) => { e.code === "Enter" && handlePageChange(1) }} className="regiser-inputs">
          <Dropzone multiple={false} onDrop={acceptedFiles => { setProfile(acceptedFiles[0]) }}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div className='register-form-profile-dropzone ' onKeyDown={(e) => { e.code === "Enter" && handlePageChange(1) }} {...getRootProps()}>
                  <input className='register-form-input' onKeyDown={(e) => { e.code === "Enter" && handlePageChange(1) }} {...getInputProps()} />
                  <h6 >{`${profile ? profile.name : "Profile Browse or Drop"}`}</h6>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      </div>
    </div>,
    8: <div className="loading-anime">
      {uploadingProfile ? <h4 className='loading-h4'>uploading profile</h4> : <h4 className='loading-h4'>creating user</h4>}

      <div className="loading-anime-div-1"></div>
      <div className="loading-anime-div-2"></div>
      <div className="loading-anime-div-3"></div>
    </div>,
    default: <div></div>
  }

  return (
    <div className='RegisterPage'>
      <Header />
      <div className='register'>
        <div onClick={() => { handlePageChange(-1) }} className="left-arrow"><i className="arrow arrow-left bi bi-arrow-left"></i></div>
        <div className="main-input">
          {pages[page]}
        </div>
        <div onClick={() => { handlePageChange(1) }} className="right-arrow"><i className="arrow arrow-right bi bi-arrow-right"></i></div>
      </div>
    </div>
  )
}

export default RegisterPage
