console.log(process.env);
const server_base = {
    development: "http://localhost:3001",
    production: "https://cartopedia-server.onrender.app"
}
const collections = {
    server_base: server_base[process.env.NODE_ENV],
    socket_io: "http://localhost:4000"
}


export default collections