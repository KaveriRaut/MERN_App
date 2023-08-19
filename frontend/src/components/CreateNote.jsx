import React from "react";
import { useState } from "react";
// import Note from "./Note";
import CreateArea from "./CreateArea";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function CreateNote() {
    
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);

    //checking the title or content is null string or not and then adding the note with prevNotes
    function addNote(newNote) {
        if(newNote.title.length === 0){
            alert("Title empty!! Please fill the title");
        }
        else if(newNote.content.length === 0){
            alert("Content empty!! Please fill the content");
        }
        else{
          const answer = window.confirm("Are you sure about adding this note?")
          if(!answer) return;
          else{
            setNotes(prevNotes => {
                return [...prevNotes, newNote];
              });
          }
        }
    }
  
    // this code is to delete note only from frontend by using id 
    // function deleteNote(id) {
    //     console.log(id);
    //     setNotes(prevNotes => {
    //     return prevNotes.filter((noteItem, index) => {
    //       return index !== id;
    //     });
    //   });
    // }
  
    return (
    <>
    <Header />
    <div className="container newHeader">
        <h1>Let's create new note here :)</h1>
        <CreateArea onAdd={addNote} />
        {/* If you want to display notes on same page of note_creation box: below code works */}

        {/* {notes.map((noteItem, index) => {
          return (
              <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              date={noteItem.date}
              onDelete={deleteNote}
              />
              );
          })} */}

    </div>
    <br/>
    <Footer/>
    </>
    );
    

}

export default CreateNote;