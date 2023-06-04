import React, { useState } from "react";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Zoom } from '@mui/material';
import moment from "moment/moment";


function CreateArea(props) {

  const [isExpand,setExpand] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
    date: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    // console.log(note)
    if(note.title.length === 0){
      alert("Title empty!! Please fill the title");
    }
    else if(note.content.length === 0){
        alert("Content empty!! Please fill the content");
    }
    else{
      props.onAdd(note);
      setNote({
        title: "",
        content: "",
        date:""
      });
      
      
      //create newNote object and send to new route to access through the backend using axios.post("desti_url",newNote)
      const newNote = {
        title: note.title,
        content: note.content,
        date: moment(note.date).format("MMM Do YY")
      }  
      axios.post("http://localhost:3001/create",newNote); //creating POST route "/create" in backend also to store newNote in MongoDB
      event.preventDefault();
    }
  }

  function expand(){
    setExpand(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpand && <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />}
        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpand ? "3" : "1"}
        />
        <Zoom in={isExpand}>
           <Fab onClick={submitNote}> <AddIcon/></Fab>
        </Zoom>
        
      </form>
    </div>
  );
}

export default CreateArea;
