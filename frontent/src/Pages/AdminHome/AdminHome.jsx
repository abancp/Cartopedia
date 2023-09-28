import React, { useState } from 'react'
import './AdminHome.css'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar'
import AdminDashboard from '../../components/AdminDashboard/AdminDashboard'
import Req from '../../components/AdminComponents/AdminHome/AdminHome'
import { useParams } from 'react-router-dom'

function AdminHome() {
    const [seed,setSeed] = useState()
    const { page } = useParams()
    const adminPages={
        dashboard: <AdminDashboard/>,
        requisites:<Req/>
    }
    return (
        <div className='AdminHome'>
            <AdminHeader />
            <AdminSidebar/>
            <div className="main">
                {adminPages[page]}
            </div>
        </div>
    )
}

export default AdminHome
