import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import collections from '../../configurations/collections'
import "./UserProfilePage.css"
import { useSelector } from 'react-redux'

function UserProfilePage() {
  const [user, setUser] = useState({ firstName: "", lastName: "" , userName :"",phone:"",email:"" })
  const [profileHover, setProfileHover] = useState(false)
  const store = useSelector((state) => (state.user))
  useEffect(() => {
    store && store.then((user) => { setUser(user) })
  })
  console.log(user)
  return (
    <div className='UserProfilePage'>
      <Header />
      <div className="UserProfilePage-main">
        <div className="left">
          <div className='user-profile-div'  >
            <img className='user-profile-img'
              onMouseEnter={() => { setProfileHover(true) }}
              onMouseLeave={() => { setProfileHover(false) }}
              src={`${collections.server_base}/user-profiles/${user.email}.jpg`}
              alt={user.userName}
            />
          </div>
          <div className="user-details-div">
            <h3 className="user-name-h3">{`${user.firstName} ${user.lastName}`}</h3>
            <h5 className="user-username-h5">{user.userName}</h5>
            <h6 className="user-email-h6">{user.email}</h6>
            <h6 className="user-phone-h6">{user.phone}</h6>
          </div>
        </div>
        <div className="right">
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage
