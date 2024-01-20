import React from 'react'
import "./UserProfileLeft.css"
import collections from '../../configurations/collections'
import { Link } from 'react-router-dom'
import EditButton from '../EditButton/EditButton'

function UserProfileLeft({ user, type }) {
    return (
        <div className="UserProfileLeft">
            {
                type !== 'edit' && <div className='editbutten-div'>
                    <EditButton
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="edit-bottun-svg bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>}
                        title="edit profile"
                        width='6.2rem'
                        link="/user-profile/edit"
                    />
                </div>
            }
            <div className='user-profile-div'  >
                <img className='user-profile-img'
                    src={`${collections.server_base}/user-profiles/${user?.email}.jpg`}
                    alt={user?.userName}
                />
            </div>
            <div className="user-details-div">
                <h3 className="user-name-h3">{`${user?.firstName} ${user?.lastName}`}</h3>
                <h5 className="user-username-h5">{user?.userName}</h5>
                <h6 className="user-email-h6">{user?.email}</h6>
                <h6 className="user-phone-h6">{user?.phone}</h6>
                <div className="user-security-details-div">
                    <h6 className='user-id-h6' > user id : {` ${user?._id}`} </h6>
                    {!user.verifyEmail && <h6 className="verify-email"> your email not verified . <Link className='verify-now-link'>verify now</Link> </h6>}
                </div>
            </div>
        </div>
    )
}

export default UserProfileLeft
