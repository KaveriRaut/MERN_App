import React, { useState } from "react";
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
       //take local Token first to validate user
       const localToken = localStorage.getItem("jsonwebtoken");

       fetch("http://localhost:3001/create",{
         method: 'POST',
         headers:{
           'Authorization': `Bearer ${localToken}`,
           'Content-Type': 'application/json' // Set the content type***imp
         },
         body: JSON.stringify(newNote) // Convert the object to JSON
       })
       .then(response=> response.json())
       .then(note=>{
         console.log(note);
       }).catch(err=>{console.log(err)})

       window.location.pathname = "/display";
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
          placeholder="Write the content..."
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
