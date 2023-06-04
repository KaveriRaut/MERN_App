import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import "mdbreact/dist/css/mdb.css";
import App from "./App";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import DisplayAllNotes from "./components/DisplayAllNotes";
import CreateNote from "./components/CreateNote";
import NoteDetail from "./components/NoteDetail";
import UpdateNote from "./components/UpdateNote";


ReactDOM.render(
<React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={ <Landing /> }/>
                <Route path="/home" element={ <App /> }/>
                <Route path="/login" element={ <Login /> }/>
                <Route path="/register" element={ <Register /> }/>
                <Route path="/create" element={ <CreateNote /> }/>
                <Route path="/display" element={ <DisplayAllNotes /> }/>
                <Route path="/display/:id" element={ <NoteDetail/> } />
                <Route path="/update/:id" element={ <UpdateNote/> } />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
, document.getElementById("root"));

// ReactDOM.render(<App/>, document.getElementById("root"));