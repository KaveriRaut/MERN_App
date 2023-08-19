const express = require("express");
const noteRouter = express.Router();
const Note = require("../models/noteModel");
const auth = require("../middlewares/auth")
const {createNote, displayNote, deleteNote, updateNote, searchNote, detailNote} = require("../controllers/noteController")

//before hitting this post route=>we check auth =>on success then go to execute post route next function 
//e.e. noteRouter.post("/create",auth,createPost);//auth function will add the userId into req body which will further passed to next createPost function on which we verifyed user
noteRouter.post("/create",auth,createNote);

// # To Display All Notes
//route to display all hte posts from the DB
// this will .get() all the notes from mongoDB and route them at "/display" => so in frontend fetch"/display" call will get all the notes that we fetched
noteRouter.get("/display",auth,displayNote);

// # To Delete Single Note
//for delete note route => we have to use async-await in new version of mongodb route request
noteRouter.delete("/delete/:id",auth,deleteNote);//***.delete request */

// # To Display Details of Single Note
//single note detail page using id means data single note send to route -> http://localhost:3001/detail/id
noteRouter.get("/detail/:id",auth,detailNote);

// # update post route
noteRouter.put("/update/:id",auth,updateNote);

//to search the note by title
noteRouter.get("/search/:key",auth,searchNote);

module.exports = noteRouter;








