const express = require("express");
const app = express();
//cors: mechanism by which a front-end client can make requests for resources to an external back-end server
const cors = require('cors');
const mongoose = require("mongoose");
require('dotenv/config');

app.use(cors());
app.use(express.json());

//connect to mongoDB => URL to database name at end//special characters in password should be encoded***
// mongoose.connect("mongodb+srv://kaveriraut:RautK@cluster0.kgmoaya.mongodb.net/KeeperDB");
mongoose.connect(process.env.DB_CONNECTION_URL);

//require the routes //this is 'middleware' means what action to be performed when we hit the specified routes i.e. url
//require Routes '/noteRoute' + having middleware logic to handle each route action
app.use("/",require("./routes/noteRoute"));

app.get("/",(req,res)=>{
    res.send("Express server is running here");
})
app.listen(3001,function(){
    console.log("Server is running on port 3001");
})
//add proxy: "http://localhost:3001" in package.js of frontend to connect backend to frontend