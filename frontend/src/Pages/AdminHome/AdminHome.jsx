import React, { useEffect } from 'react'
import './AdminHome.css'
import AdminHeader from '../../components/AdminComponents/AdminHeader/AdminHeader'
import AdminSidebar from '../../components/AdminComponents/AdminSidebar/AdminSidebar'
import AdminDashboard from '../../components/AdminComponents/AdminDashboard/AdminDashboard'
import CompanyRequiests from '../../components/AdminComponents/CompanyRequiests/CompanyRequiests'
import AllProducts from '../../components/AdminComponents/AllProducts/AllProducts'
import { useParams } from 'react-router-dom'
import CategoryRequests from '../../components/AdminComponents/CategoryRequests/CategoryRequests'
import { useSelector } from 'react-redux'

function AdminHome() {

    const { page } = useParams()

    const user = useSelector((state) => (state.user))


    const adminPages = {
        dashboard: <AdminDashboard />,
        requisites: <div className='requests' ><CompanyRequiests /><CategoryRequests /></div>,
        products: <AllProducts />
    }
    if (user.admin) {
        return (
            <div className='AdminHome'>
                <AdminHeader />
                <AdminSidebar />
                <div className="main">
                    {adminPages[page]}
                </div>
            </div>
        )
    } else {
        return <div className='users-block' ></div>
    }

}

export default AdminHome
