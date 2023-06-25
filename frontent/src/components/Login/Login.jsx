import React from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import collections from '../../config/collections';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        let user = {
            email: e.target[0].value,
            password: e.target[1].value
        };
        axios.post(collections.server_base + "/login", user).then(async (res) => {
            dispatch({
                type: user
            });
            window.localStorage.setItem("token", res.data.token);
            dispatch({
                type: user
            });
            navigate("/");
        });
    };
    return (
        <div className='container'>
            <div className='row '>
                <div className='d-flex justify-content-end'>
                    <div className='col-lg-5 col-12 col-md-6 register-form-div mx-md-3'>
                        <img src="/register-bg.jpg" alt="" className='col-12 register-form-div-cart-bg' />
                        <form action="" method="post" onSubmit={handleSubmit} >
                            <input type="text" className='register-form-phone-input register-form-input' name='phone' placeholder='Phone With Country Code' />
                            <input type="password" className='register-form-password-input register-form-input' name='password' placeholder='Password' />
                            <button className="register-form-submit-button" type="submit">submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
