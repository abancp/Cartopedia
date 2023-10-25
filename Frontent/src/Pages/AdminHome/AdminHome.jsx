import React from 'react'
import './AdminHome.css'
import AdminHeader from '../../components/AdminComponents/AdminHeader/AdminHeader'
import AdminSidebar from '../../components/AdminComponents/AdminSidebar/AdminSidebar'
import AdminDashboard from '../../components/AdminComponents/AdminDashboard/AdminDashboard'
import CompanyRequiests from '../../components/AdminComponents/CompanyRequiests/CompanyRequiests'
import { useParams } from 'react-router-dom'

function AdminHome() {
    const { page } = useParams()
    const adminPages = {
        dashboard: <AdminDashboard/>,
        requisites: <CompanyRequiests />
    }
    return (
        <div className='AdminHome'>
            <AdminHeader />
            <AdminSidebar />
            <div className="main">
                {adminPages[page]}
            </div>
        </div>
    )
}

export default AdminHome
