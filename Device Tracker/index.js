const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))
app.get('/',(req,res)=> {
    res.render("index")
})
io.on("connection",function(socket){
    socket.on('send-location',(data)=>{
        io.emit("receive-location",{id:socket.id,...data})
    })
    socket.on("disconnect",()=>{
        io.emit("user-disconnected",socket.id)
        console.log("disconnect");
    })
    console.log("connected");
})
server.listen(3000,(req,res)=>{
    console.log('Server is running')
})