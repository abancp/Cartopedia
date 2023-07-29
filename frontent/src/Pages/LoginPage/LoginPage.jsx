import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import collections from '../../configurations/collections';
import "./LoginPage.css"
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

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
    axios.post(collections.server_base + "/login", user).then(async (res) => {
      if (res.data.auth) {
        window.localStorage.setItem("token", res.data.token)
        dispatch({
          type: user
        })
        navigate("/")
      } else setLoginErr(true)
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
            <Input type="email" placeholder="Email" name="email" width="15rem" onChange={(e) =>{ setEmail(e.target.value); console.log(email) }} />
            <Input type="password" placeholder="Password" name="password" width="15rem" onChange={(e) => { setPassword(e.target.value); console.log(password) }} />
            <Button text="submit"  color="green" width="16rem" icon={<i class="bi bi-check2-circle"></i>} onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
