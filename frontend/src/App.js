import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './components/styles.css'

function App() {

  return (
    <>
      <Header />
      <div className="container">
        <div className="newHeader">

            <h1>Features of The Keeper App :)</h1>
              
                <br/><br/>
                Easy to write the notes ✍
                <br/><br/>
                Keep notes handy and secure 🔑
                <br/><br/>
                Attractive and user-friendly UI 🤩
                <br/><br/>
                Reveal secrets anonymously if you want 😜
                <br/><br/><br/><br/>
      </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
