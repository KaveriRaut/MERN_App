const express = require("express");
const userRouter = express.Router();

userRouter.post("/signup",async(req,res)=>{
    res.send("Sign up");
    //existing user
    //hashed password
    //user creation
    //token generation
    

});

userRouter.post("/signin",(req,res)=>{
    res.send("Sign in");
});

modelu.exports = userRouter; 