import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{position:'relative',bottom:'5px',display:'flex',flexDirection:'column'}}>
      <br/><br/>
      <a href='https://kaveriraut.github.io/' style={{fontWeight: 'bold', color: '#54adde'}}>
          Made with 💙 By Kaveri Raut ⓒ {year}
        </a>
    </footer>
  );
}

export default Footer;
