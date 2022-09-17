import React, { useState } from "react";
import {Button, Form} from "react-bootstrap"

import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../config/api";
// import ReactSwitch from "react-switch";
//import { Usercontext } from "../context/userContext";




export default function Register() {



  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const Navigate = useNavigate();

  // const handleNaviateToSignIn = () => {
  //   navigate("/signin");
  // };

  const { name, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  console.log(form);

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/register", body, config);

      console.log(response);

      if (response.data.code == 200) {
        const alert = (
          <Alert variant="success" className="py-1">
            Register Success, Silakan Login
          </Alert>
        );
        setMessage(alert);
        setForm({
          name: "",
          email: "",
          password: "",
        });
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
      // Handling response here
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <>
      {message && message}
      <Form onSubmit={(e) => handleSubmit.mutate(e)}>
      <Form.Group className="mb-3">
        <Form.Control 
        type="text" 
        placeholder="Full Name" 
        id='name'
        name='name'
        onChange={handleChange}
        style={{borderColor : "#613D2B"}}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control 
        type="email" 
        placeholder="Email" 
        id='email'
        name='email'
        onChange={handleChange}
        style={{borderColor : "#613D2B"}}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control 
        type="password" 
        placeholder="Password" 
        id='password'
        name='password'
        onChange={handleChange}
        style={{borderColor : "#613D2B"}}
        />
      </Form.Group>


      <Button type="submit" style={{width: "100%", backgroundColor: "#613D2B"}}>
        Submit
      </Button>

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

      </Form>
    </>
  )
}
