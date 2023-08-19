import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './NoteDetail.css'
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
import moment from "moment";
import Header from "./Header";

function NoteDetail(){
    
    //to store single note ke details we are getting to save and display
    const [note, setNote] = useState({
        title: '',
        content: '',
        date: ''
    });

    const { id } = useParams();

    //to make the fetch call to api to fetch the single post ke details
    useEffect( () => {
        // console.log(id);
        //take local Token first to validate user
      const localToken = localStorage.getItem("jsonwebtoken");

      fetch(`/detail/${id}`,{
        method: 'GET',
        headers:{
          'Authorization': `Bearer ${localToken}`
        }
      })
      .then(response=> response.json())
      .then(note=>{
        setNote(note)
      }).catch(err=>{console.log(err)})
    },[])

    return(
        <div className="body_new">
            <Header/>
            <div className="newHeader2">
            <h1>Let's see the details of your note here :)</h1>
            <br/>
            </div>
            <main>
                <section class="blog-single">
                    <div class="blog">
                        <div class="blog-img">
                            <img src="https://i.pinimg.com/564x/43/db/a0/43dba017aa5ad05b6f268b1b92713a8d.jpg" alt="author" />
                        </div>
                        <div class="blog-content">
                            <h2 class="blog-title">Title: {note.title}</h2>
                            <p class="blog-desc">Content: {note.content}</p>
                            <h2 class="blog-title">Date: {moment(note.date).format("MMM Do YY")}</h2>
                            <div class="blog-details">
                                {/* <div class="blog-author-img">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS7uvhOHa3VWkvQ_nxwWToV8US0CCFZb9xKZ9LNGRRZBMW6XBhiUYJTAY_VWCifGqQBuY&usqp=CAU" alt="page image"/>
                                </div> */}
                                {/* <div class="blog-author-details">
                                    <h4 class="blog-author-name">Jessica Andrews</h4>
                                    <div class="blog-author-desig">Content Manager</div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </section>
                </main>
        </div>
    );
}

export default NoteDetail;