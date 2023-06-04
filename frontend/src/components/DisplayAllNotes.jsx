import React from "react";
import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Header from "./Header";
import moment from "moment";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';

function DisplayAllNotes() {

    //create array of notes, setnotes is function to handle that notes array setting
    const [notes, setNotes] = useState([{
        title: '',
        content: '',
        date: ''
    }])
    
    //to fetch the notes from '/display' route from backend and to display on fronend page 
    //then check if res if ok to return the json object of responce 
    //then responce json obj is seti into notes array in setnotes function of useState
    useEffect( () => {
        fetch('/display').then( res => {
            if(res.ok) {
                return res.json()
            }
        }).then(jsonRes => setNotes(jsonRes));
    }, [notes])

    //deleting the note from DB using note ki id
    //call goes from frontend to backend with note id to be deleted
    //after deleting note from DB we fetch the remaining notes from DB and backend
    function deleteNotes(id){
        // console.log(id);
        const answer = window.confirm("Are you sure about deleting the note?")
        if(!answer) return;
        else{
            fetch(`/delete/${id}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        }
    }    

    //updating the note in DB using that entire 'note' : call goes from frontend update button to backend
    function updateNotes(id){
        console.log(id);
    }

    //to see the detail note with given id=>this task of fetching data of single note is written in NoteDetail.jsx using useEffect hooks
    //delete this code now################################
    // function detailNotes(id){
    //     console.log(id);
    //     fetch(`/detail/${id}`)
    //     .then((res)=>console.log(res))
    //     .catch((err)=> console.log(err));
    // }


    return (
        <>
        <Header/>
        <div className="container">
            <br/><br/><br/>
            {/* now we have to map through the notes array having the json responces fetched from backend to display on frontend*/}
            {notes.map ((note) => 
                <div key={note._id} className="note">
                    <h1 style={{textAlign:'center', fontWeight:'bold',fontSize:'20px', textOverflow:'ellipsis',whiteSpace:'nowrap', overflow:'hidden'}}>{note.title}</h1>
                    <p style={{textOverflow:'ellipsis',whiteSpace:'nowrap', overflow:'hidden'}}>{note.content}</p>
                    <p style={{textOverflow:'ellipsis',whiteSpace:'nowrap', overflow:'hidden'}}>Date: {moment(note.date).format("MMM Do YY")}</p>
                    <button onClick={() => deleteNotes(note._id)}>
                        <DeleteIcon/>
                    </button>
                    <Link to={`/update/${note._id}`}>
                        <button onClick={() => updateNotes(note._id)}><EditIcon/></button>
                    </Link>
                    <Link to={`/display/${note._id}`}>
                        <button><InfoIcon/></button>
                    </Link>
                </div>
            )}
        </div>
        <Footer/>
        </>
    );
    
}

export default DisplayAllNotes;