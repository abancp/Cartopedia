import React, { useEffect, useState } from 'react';
import "./UserProfile.css";
import { useDispatch, useSelector } from 'react-redux';
import collections from '../../config/collections';
import { Link, useNavigate } from 'react-router-dom';

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("firstName");
  const [lastName, setLastName] = useState("lastName");
  const [userName, setUserName] = useState("user_name");
  const [phone, setPhone] = useState("8888888888");
  const [email, setEmail] = useState(null);
  const [company, setCompany] = useState(false);
  const [companyPending, setCompanyPending] = useState(false);
  const [companyDetails, setCompanyDetails] = useState(null);

  var user = useSelector((state) => { return state.user });
  useEffect(() => {
    if (user) {
      user.then((res) => {
        setCompany(res.company);
        setFirstName(res.firstName);
        setLastName(res.lastName);
        setUserName(res.userName);
        setEmail(res.email);
        setPhone(res.phone);
        setCompanyPending(res.companyPending);
        setCompanyDetails(res.companyDetails);
      });
    }
  });
  return (
    <div className='userprofile'>
      <div className='container'>
        <div className='row d-flex justify-content-center'>
          <div className='col-9 col-md-10 col-xl-8 userprofile-main-div p-3 '>
            <div className='userprofile-userdetails-div '>
              <div className='userprofile-usermaindetails-div '>
                <img className='userprofile-userdetails-profile-image' src={`${collections.server_base}/user-profiles/${email}.jpg`} alt="" />
                <div>
                  <h2 className='userprofile-userdetails-fullname text-center text-white'>{firstName + " " + lastName}</h2>
                  <h5 className='userprofile-userdetails-username text-center'>{userName}</h5>
                </div>
                <div className='userprofile-userdetails-submain'>
                  <h4 className='userprofile-userdetails-phone text-center'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                  </svg>{" " + phone}</h4>
                  <h5 className='userprofile-userdetails-email text-center'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-at" viewBox="0 0 16 16">
                    <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                    <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                  </svg>{" " + email}</h5>
                </div>
              </div>
            </div>
            <div className='userprofile-companydetails-div'>
              {company ? <h3 className='userprofile-userdetails-comapnyname text-center'>{companyDetails.companyName}</h3> : ""}
              {company ? <h4 className='userprofile-userdetails-comapnyname text-center'>{companyDetails.website}</h4> : ""}
              {company ? <h4 className='userprofile-userdetails-comapnyname text-center'>{companyDetails.location}</h4> : ""}
              {company ? <h4 className='userprofile-userdetails-comapnyname text-center'>{companyDetails.categories}</h4> : ""}
              {company ? <h4 className='userprofile-userdetails-comapnyname text-center'>{companyDetails.description}</h4> : ""}
            </div>
            {!company ? <Link to={`${companyPending ? "" : '/register-as-company'}`}><button className='text-white btn userprofile-registerascompany-button'>{companyPending ? 'Waiting for Admin Response' : 'Register As Company'}</button></Link> : ""}
            {email==null?"": <button onClick={()=>{window.localStorage.clear();let user=null;dispatch({type: user});navigate("/");}} className='btn text-white userprofile-logoutorlogin-button '>Logout</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
