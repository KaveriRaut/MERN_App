import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{position:'relative',bottom:'5px',display:'flex',flexDirection:'column'}}>
      <a href='https://kaveriraut.github.io/' style={{fontWeight: 'bold', color: '#f06bb2'}}>
          Made with 💙 By Kaveri Raut ⓒ {year}
        </a>
    </footer>
  );
}

export default Footer;
