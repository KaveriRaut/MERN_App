const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

const signup = async(req, res) => {
    //check for existing user
    //generate hashed password
    //user creation
    //token generation

    //this all should come from frontend
    const {username, email, password} = req.body;
    try{
        const existingUser = await userModel.findOne({email: email});
        
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);//10 time salt hashing
        
        //new user credentials with hashed password
        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        });

        //token(payload,secret_key); =>payload help to identify user and secret_key help to decrypt token
        const token = jwt.sign({email: result.email, id: result._id}, SECRET_KEY);
        //in response send back the new user credential and token that generated
        res.status(201).json({user: result, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"something went wrong"});
    }
}

const signin = async(req,res) => {
    //check for existing user
    //match the password and credentials
    //send response with existingUser token

    const {email,password} = req.body;
    try{
        const existingUser = await userModel.findOne({email: email});
        //if user not exists checking
        if(!existingUser){
            return res.status(404).json({status: false,message: "User Not Found"});
        }

        //bcrypt.compare(normal_password, hashed_passwordfrom_db)
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        //if password not matched
        if(!matchPassword){
            return res.status(400).json({status: false,message:"Invalid Credentials"});
        }
        //now generate token for existing user help to decrypt token
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, SECRET_KEY);
        res.status(201).json({status: true,user: existingUser, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: false,message:"something went wrong"});
    }

}

module.exports = {signup, signin};