import React, { useState } from 'react'
import "./LoginPage.css"
import axios from 'axios'
import Input from '../../components/Inputs/Input'
import Header from '../../components/Header/Header'
import Button from '../../components/Button/Button'
import collections from '../../configurations/collections'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginErr, setLoginErr] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    let user = {
      email,
      password
    }
    axios.post(collections.server_base + "/login", user,{headers: {"Access-Control-Allow-Origin": "*"}}).then(async (res) => {
      if (res.data.auth) {
        window.localStorage.setItem("token", res.data.token)
        dispatch({type: "user"})
        navigate("/")
      } else {
        setLoginErr(true)
      }
    })
  }
  return (
    <div className='LoginPage'>
      <Header />
      <div className="login-div">
        <h3 className="login-heading">Login</h3>
        <form action="" onSubmit={handleSubmit} >
          <div className="form-div">
            {loginErr?<h6 className='loginerr'>incorrect email or password</h6>:""}
            <Input type="email" placeholder="Email" name="email" width="15rem" onChange={(e) =>{ setEmail(e.target.value) }} />
            <Input type="password" placeholder="Password" name="password" width="15rem" onChange={(e) => { setPassword(e.target.value)  }} />
            <Button text="submit"  color="green" width="16rem" icon={<i class="bi bi-check2-circle"></i>} onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
