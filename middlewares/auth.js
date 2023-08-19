const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

const auth = (req, res, next) => {
    try{
        //req ke header me token we have which is requested
        let token = req.headers.authorization;
        //got correct token then do this
        if(token){
            token = token.split(" ")[1];//split the token from its barier
            let user = jwt.verify(token,SECRET_KEY);//get user object => if verify user with token
            //***we have store the email,id of user in token payload => to identify user and get its notes only
            req.userId = user.id;//token ke payload me info store kari thi humane
        }
        else{
            res.status(401).json({message:"unauthorized User"});
        }
        next(); //if all success go to next function
    }
    catch(err){
        console.log(err);
        res.status(401).json({message:"unauthorized User"});
    }
}

module.exports = auth;