
const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require("cors");

app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
    cors:{
         origin:"http://localhost:3000",
         methods: ["GET", "POST"],
    },

});

io.on("connection", (socket)=>{
    console.log(`User connected: ${socket.id}`);

    socket.on("add_item",(data)=>{

        console.log(data);
        socket.broadcast.emit("added_item", data);

    })

    socket.on("remove_item", (data)=>{
        console.log(data);
        socket.broadcast.emit("removed_item", data)
    })
})



server.listen(3001, ()=>{
    console.log("SERVER IS RUNNING");

})