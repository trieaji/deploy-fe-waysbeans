import React, {useState, createContext} from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import AuthModal from "../../modals/AuthModal";
import Icon from "../../assets/IconWaysBeans.png";


function NavigationBar () {
   //fitur
   /* const [theme, setTheme] = useState("dark");

   const toggleTheme = () => {
   setTheme((curr) => (curr === "light" ? "dark" : "light"));
   }; */
   //fitur

    return (
    <>
         <Navbar className="top d-flex bg-white justify-content-between border-bottom shadow py-3">
        <Container>
          <Navbar.Brand className="ms-3 ps-5">
            <img alt="" src={Icon} width="100%" height="30" className="d-inline-block align-top"/>
          </Navbar.Brand>
          <div>
          {/* //fitur */}
          {/* <ThemeContext.Provider value={{ theme, toggleTheme }}>
                    <div className="App" id={theme}>
                        <div className="switch">
                            <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
                            <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
                        </div>
                    </div>
        </ThemeContext.Provider> */}
        {/* //fitur */}
            <AuthModal />
          </div>
        </Container>
      </Navbar>
    </>
  );
}
export default NavigationBar;