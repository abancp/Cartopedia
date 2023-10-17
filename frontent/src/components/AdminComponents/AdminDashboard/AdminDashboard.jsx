import React, { useEffect, useState } from 'react'
import "./AdminDashboard.css"
import Status from '../../Status/Status'
import { io } from 'socket.io-client'
import collections from '../../../configurations/collections'

const socket = io(collections.socket_io, { autoConnect: false })
socket.connect()
let initiState = {};
socket.on('users', (data) => initiState.users = data)
socket.on('sales', (data) => initiState.sales = data)
socket.on('cash', (data) => initiState.cash = data)

function AdminDashboard() {
  const [users, setUser] = useState(initiState.users)
  const [sales, setSales] = useState(initiState.sales)
  const [cash, setCashe] = useState(initiState.cash)
  useEffect(() => {
    socket.on('users', (data) => { setUser(data) })
    socket.on('sales', (data) => { setSales(data) })
    socket.on('cash', (data) => { setCashe(data) })
  }, [])
  return (
    <div className='AdminDashboard'>
      <div className="admindashboard-main">
        <div className="status-board">
          <Status title="Users" number={users} /> <Status title="Sales" number={sales} /> <Status title="Money" number={cash} />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
