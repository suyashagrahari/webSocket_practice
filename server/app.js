import cors from "cors";
import express from "express"
import { Server } from "socket.io";
import {createServer} from "http";
const port = 4000;
const app = express();

const server = createServer(app);
const io = new Server(server,{
    cors : {
        origin : "http://localhost:3000",
        methods : ["GET","POST"],
        credentials : true,
    },
});
app.use(cors());
app.use(express.json());

//ynha pr hmm middleware bhi lga skte h socket.io ka 

// ynha pr hm apna token verify kra skte hain mtlb hmm io.use m socket.request ke help se authentication kra skte h

// const user = false;
// io.use((socket,next)=>{
//     if(user) next();
// })


app.get("/",async(req,res)=>{
    try {
        res.send("helllo dosto kaise ho!");
    } catch (error) {
        console.log(error); 
        
    }
})

io.on("connection",(socket)=>{
    console.log("User is connected", socket.id);
    // console.log("Id :-" ,socket.id);
    // socket.emit("message", "welcome to the server")
    // socket.broadcast.emit("message",`${socket.id} joined the server`);

    // socket.on("message",(data)=>{
    //     console.log(data);
    //     io.emit("receive-message",data)
    // })

    socket.on("message",(data)=>{
        console.log(data);
        // io.emit("receive-message",data)
        // socket.broadcast.emit ("receive-message",data)
        socket.to(data.room).emit("receive-message",data.message);
    })
    socket.on("join-room",(room)=>{
        socket.join(room)
        console.log(`User joined room ${room}`)
    })

    socket.on("disconnect",()=>{
        console.log("User Disconnected",socket.id);
    })
})

server.listen(4000,()=>{
    console.log(`server is running at port ${port} `)
}) 