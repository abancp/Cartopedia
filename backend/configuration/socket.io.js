import { createServer } from 'http'
import { Server } from 'socket.io';
import db from './mongodb.js'


export default function socket(port = 4000, msg = "SocketIO Started : ") {
    const http = createServer()
    const io = new Server(http, { cors: { origin: ["http://localhost:3000"] } })

    io.on('connection', async (socket) => {
        console.log(`⚡: ${socket.id} user just Connected!`)
        let dashboard = await db.get().collection(process.env.DASHBOARD_COLLECTION).findOne({ item: "dashboard" })
        socket.emit('users', dashboard?.users)
        socket.emit('sales', dashboard?.company?.sales)
        socket.emit('cash', dashboard?.company?.cash)
        socket.on('disconnected', () => {
            console.log('🔥: A User disconnected')
        })
    })
    io.listen(port)
    console.log(msg, port)
} 
