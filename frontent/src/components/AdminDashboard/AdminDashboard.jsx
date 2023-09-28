import React from 'react'
import "./AdminDashboard.css"
import Status from '../Status/Status'

function AdminDashboard() {
  return (
    <div className='AdminDashboard'>
      <div className="admindashboard-main">
        <div className="status-board">
            <Status title="Users" number="233" /> <Status title="Sales" number="133" /> <Status title="Money" number="32.3k" />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
