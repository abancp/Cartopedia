import React, { useState, useEffect } from 'react';
import "./VerifyAccount.css";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import collections from "../../configurations/collections"

function VerifyAccount(props) {
    const [email, setEmail] = useState(null);
    const [timer, setTimer] = useState(60);
    const [validTime, setValidTime] = useState(true);
    const [otp, setOtp] = useState(null);
    const [otpErr,setOtpErr] = useState(false);
    const [timeErr,setTimeErr] = useState(false)
    const navigate = useNavigate();

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
        for (let i = 0; i < 60; i++) {
            setTimeout(() => { setTimer(timer - 1) }, 1000);
            if (timer === 0) {
                setValidTime(false)
            }
        }
    }, [timer,navigate,store]);
    const handleSubmit = () => {
        axios.post(collections.server_base + "/submit-otp", { email: email, otp: otp }).then((res)=>{
            console.log(res.data)
            if(res.data.verify===true){
                navigate("/")
            }else{
                if(res.data.err==="otpErr"){
                    setOtpErr(true)
                }
                if(res.data.err==="timeError"){
                    setTimeErr(true)
                }
            }
        })
    }
    const handleResend = () => {
        axios.post(collections.server_base + "/get-otp-email", { email: email }).then((res) => {
            window.location.reload()
        })
    }
    return (
        <div className='verifyaccount'>
            <div className='container'>
                <div className='row d-flex justify-content-center'>
                    <div className='col-10 col-sm-8 col-md-6 col-xl-5 verifyaccount-main-div d-flex flex-column  '>
                        <h3>Email Verification</h3>
                        {validTime ? <p className='verifyaccount-main-sentens'>we send a verification code to your email <span className='verifyaccount-emailorphone'>{email}</span>.please enter that code here before < span className='verifyaccount-timer'>{timer} </span>seconds</p> : ""}
                        <p onClick={handleResend} className='verifyaccount-resent-otp' >resent otp</p>
                        {otpErr&&validTime?<p className='verifyaccount-error-p'>otp not match,please try again</p>:""}
                        {timeErr&&validTime?<p className='verifyaccount-error-p' >time out error,please click resent otp</p>:""}
                        {validTime ? <input onChange={(e) => { setOtp(e.target.value) }} className='verifyaccount-otp-input' type="number" /> : ""}
                        {validTime ? <button onClick={handleSubmit} className='btn verifyaccount-submit-btn'>submit</button> : ""}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyAccount;
