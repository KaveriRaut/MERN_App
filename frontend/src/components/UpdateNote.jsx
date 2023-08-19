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

          //take local Token first to validate user
        const localToken = localStorage.getItem("jsonwebtoken");
      
        await fetch(`/detail/${id}`,{
          method: 'GET',
          headers:{
            'Authorization': `Bearer ${localToken}`
          }
        })
        .then(response=> response.json())
        .then((jsonRes) => setNote({
          title: jsonRes.title,
          content: jsonRes.content,
          date: jsonRes.date  
        }))
        .catch(err=>{console.log(err)})
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

      //take local Token first to validate user
      const localToken = localStorage.getItem("jsonwebtoken");

      fetch(`/update/${id}`,{
        method: 'PUT',
        headers:{
          'Authorization': `Bearer ${localToken}`,
          'Content-Type': 'application/json' // Set the content type***imp
        },
        body: JSON.stringify(newNote) // Convert the object to JSON
      })
      .then(response=> response.json())
      .then(note=>{
        console.log(note);
        setNote(note);
      }).catch(err=>{console.log(err)})

      window.location.pathname = "/display";
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
                <textarea className="newtextarea"
                name="content"
                value={note.content}
                onChange={handleChange}
                placeholder="Write the content..."
                />
                <Fab onClick={updateNote}> <EditIcon/></Fab>
            </form>
      </div>
    </>
  );
}

export default UpdateNote;
