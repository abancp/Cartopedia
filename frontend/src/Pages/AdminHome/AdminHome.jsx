import React from 'react'
import './AdminHome.css'
import AdminHeader from '../../components/AdminComponents/AdminHeader/AdminHeader'
import AdminSidebar from '../../components/AdminComponents/AdminSidebar/AdminSidebar'
import AdminDashboard from '../../components/AdminComponents/AdminDashboard/AdminDashboard'
import CompanyRequiests from '../../components/AdminComponents/CompanyRequiests/CompanyRequiests'
import AllProducts from '../../components/AdminComponents/AllProducts/AllProducts'
import { useParams } from 'react-router-dom'
import CategoryRequests from '../../components/AdminComponents/CategoryRequests/CategoryRequests'

function AdminHome() {
    const { page } = useParams()
    const adminPages = {
        dashboard: <AdminDashboard/>,
        requisites: <div className='requests'><CompanyRequiests /><CategoryRequests/></div>,
        products:<AllProducts/>
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
