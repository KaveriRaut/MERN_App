import React, { useState,useEffect } from "react";
import axios from "axios";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";

function UpdateNote(props) {

    const navigate = useNavigate();

  const [note, setNote] = useState({
        title: '',
        content: '',
        date: ''
  });
    
    const { id } = useParams();
    //to fetch the previous note ke details as it is -> to update that note of given id taken from url using useParams
    useEffect( () => {
        async function fetchData(){
        const response = await axios.get(`/detail/${id}`)
        .then((jsonRes) => setNote({
          title: jsonRes.data.title,
          content: jsonRes.data.content,
          date: jsonRes.data.date  
        }));
    }    
    fetchData();
    },[id])


  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }


  async function updateNote(event) {
        
        //create newNote object and send to new route to access through the backend using axios.post("desti_url",newNote)
        const newNote = {
            title: note.title,
            content: note.content,
            date: Date.now
        };
        await axios.put(`/update/${id}`,newNote); //creating POST route "/create" in backend also to store newNote in MongoDB
        navigate(`/display/${id}`);
        event.preventDefault();
  };

  return (
    <>
        <Header/>
        <div className="container newHeader" >
            <h1>Please update your note here :)</h1>
            <form className="create-note" style={{height: '250px'}}>
                <input
                name="title"
                value={note.title}
                onChange={handleChange}
                placeholder="Title"
                />
                <textarea
                name="content"
                value={note.content}
                onChange={handleChange}
                placeholder="Take a note..."
                />
                <Fab onClick={updateNote}> <EditIcon/></Fab>
            </form>
      </div>
    </>
  );
}

export default UpdateNote;
