const server_base = {
    development: "http://192.168.233.235:3001",
    production: "https://cartopedia-server.onrender.com"
}
const collections = {
    server_base: server_base[process.env.NODE_ENV],
    socket_io: "http://localhost:4000"
}


export default collections