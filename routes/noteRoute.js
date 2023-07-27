const express = require("express");
const router = express.Router();
const Note = require("../models/noteModel");

// # To Create New Single Note
//getting the newNote data from frontend url at backend'http://localhost:3001/create'
//accessing '/create' route and create newNote at backend by POST method and save to mongoDB
router.route("/create").post((req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const newNote = new Note({
    //'new Note' model is created for newNote at backend
    title,
    content,
  });
  newNote.save();
  console.log("note saved in mongoDB");
});

// # To Display All Notes
//route to display all hte posts from the DB
// this will .get() all the notes from mongoDB and route them at "/display" => so in frontend fetch"/display" call will get all the notes that we fetched
router.route("/display").get((req, res) => {
  Note.find().then((foundNote) => res.json(foundNote));
});

// # To Delete Single Note
//for delete note route => we have to use async-await in new version of mongodb route request
router.route("/delete/:id").get(async (req, res) => {
  // console.log(req.params.id);
  try {
    const noteFound = await Note.findById(req.params.id);
    // console.log(noteFound);
    if (!noteFound) {
      res.status(400);
      throw new Error("note to delete, not found");
    } else {
      await noteFound.deleteOne();
      res.status(200).json({ _id: req.params.id });
    }
  } catch (err) {
    console.log(err);
  }
});

// # To Display Details of Single Note
//single note detail page using id means data single note send to route -> http://localhost:3001/detail/id
router.route("/detail/:id").get(async (req, res) => {
  console.log(req.params.id);
  try {
    const noteDetail = await Note.findById({ _id: req.params.id });
    // console.log(noteDetail);
    res.status(200).json(noteDetail);
  } catch (err) {
    console.log(err);
  }
});

// # update post route
router.route("/update/:id").put(async (req, res) => {
  try {
    const note = await Note.findById({ _id: req.params.id });
    // console.log(note);
    if (!note) {
      return res.status(404).json({ msg: "Note to be update is not found" });
    }
    // findByIdAndUpdate accepts the post id as the first parameter and the new values as the second parameter
    const updateNote = await Note.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(updateNote);
  } catch (err) {
    console.log(err);
  }
});

router.route("/search/:key").get(async(req,res)=>{
    try{
        console.log(req.params.key);
        const note = await Note.find({
            "$or":[
                {title: { $regex: req.params.key}}
            ]
        });
        res.status(200).json(note);
    }
    catch(err){
        console.log("error cant search note!!!");
    }
});

module.exports = router;
