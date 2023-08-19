const Note = require("../models/noteModel");


// # To Create New Single Note
//getting the newNote data from frontend url at backend'http://localhost:3001/create'
//accessing '/create' route and create newNote at backend by POST method and save to mongoDB
const createNote = async(req, res) => {
    console.log(req.userId);
    
    const {title, content} = req.body;
  
    const newNote = new Note({
      //'new Note' model is created for newNote at backend
      title: title,
      content: content,
      userId: req.userId
    });
  
    try{
      await newNote.save();
      console.log("note saved in mongoDB");
      res.status(201).json(newNote);
    }
    catch(err){
      console.log(err);
      res.status(500).json({message:"Something went wrong in saving note to db!"});
    }
}

const displayNote = async(req, res) => {
    // Note.find().then((foundNote) => res.json(foundNote));
    try{
      const notes = await Note.find({userId: req.userId});
      res.status(200).json(notes);
    }
    catch(err){
      console.log(err);
      res.status(500).json({message:"Something went wrong in display all notes"});
    }
}

const deleteNote = async (req, res) => {
    // console.log(req.params.id);
    const id = req.params.id;
    try {
      const deletedNote = await Note.findByIdAndRemove(id);
      console.log(deletedNote);
      // if (!noteFound) {
      //   res.status(400);
      //   throw new Error("note to delete, not found");
      // } else {
      //   await noteFound.deleteOne();
        res.status(200).json(deletedNote);
      // }
    } catch (err) {
      console.log(err);
      res.status(500).json({message:"Something went wrong in deletion of note"});
    }
}

const updateNote = async (req, res) => {
  const id = req.params.id;
  const {title, content} = req.body;

  const updatedNote = {
    title: title,
    content: content,
    userId: req.userId
  }

  try {
    await Note.findByIdAndUpdate(id,updatedNote,{new: true});
    res.status(200).json(updatedNote);
  } 
  catch (err) {
    console.log(err);
    res.status(500).json({message:"Something went wrong in updation of note"});
  }
}

const searchNote = async(req,res)=>{
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
}

const detailNote = async (req, res) => {
    console.log(req.params.id);
    try {
      const noteDetail = await Note.findById({ _id: req.params.id });
      // console.log(noteDetail);
      res.status(200).json(noteDetail);
    } catch (err) {
      console.log(err);
    }
}

module.exports = {createNote, displayNote, deleteNote, updateNote, searchNote, detailNote};