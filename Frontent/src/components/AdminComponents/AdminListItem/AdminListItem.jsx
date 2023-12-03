import React from 'react'
import {useNavigate} from "react-router-dom"
import "./AdminListItem.css"

function AdminListItem({ title,icon,clickedIcon,border=false }) {
    const navigate = useNavigate()

    return (
        <div className='AdminListItem'>
            <div onClick={()=>{navigate("/admin/"+title.toLowerCase())}} className="adminlistitem-main" style={border?{outline:"solid 1.2px var(--secondery)"}:null}>
                <div className="icon-div">{border?clickedIcon:icon}</div>
                <div className="title-div" ><h5 className='title'>{title}</h5></div>
            </div>
        </div>
    )
}

export default AdminListItem
