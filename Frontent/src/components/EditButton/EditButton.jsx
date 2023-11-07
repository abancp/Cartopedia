import React, { useState } from 'react'
import "./EditButton.css"
import { Link } from 'react-router-dom'

function EditButton({ title, icon, width ,link}) {
    const [hover, setHover] = useState(false)
    return (
        <div className="EditButton-main"   >
            <Link className='text-decoration-none' to={link}  >
                <div className="edit-button" onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}} style={{'width': hover && width }}  >
                    {icon}
                    <h6 className='edit-profile-h6'>{title}</h6>
                </div>
            </Link>
        </div>
    )
}

export default EditButton
