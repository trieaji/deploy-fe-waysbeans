import React, {createContext, useState} from 'react'
import {Button, Modal, Dropdown} from 'react-bootstrap';
import Register from '../auth/Register';
import Login from '../auth/Login';


export default function AuthModal() {
    const [show, setShow] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleclose = () => setShow(false);
    const handleShow = () => setShow(true)

    const handleCloseRegister = () => setShowRegister(false);
    const handleshowRegister = () => setShowRegister(true);

    function SwitchLog () {
        setShow(false)
        setShowRegister(true)
    }

    function SwitchRegis () {
        setShowRegister(false)
        setShow(true)
    }

  return (
    <>
         <Button className='me-3'style={{color: "#61302B",backgroundColor: "white",borderColor: "#61302B",padding: "5px 25px",}} onClick={handleShow}>Login</Button>


         <Button style={{color: "white",backgroundColor: "#61302B",borderColor: "#61302B",padding: "5px 25px",}} onClick={handleshowRegister}>Register</Button>


        <Modal show={show} onHide={handleclose}>
            <div className="m-4">
                <Modal.Title>
                    <h1 className='mb-4'>Login</h1>
                </Modal.Title>
                <Login /> {/* memanggil import Login */}
                <p className='mt-4' style={{color : "black"}}>
                    Don't have an account ? click {" "}
                <a onClick={SwitchLog} style={{ cursor: "pointer" }}>
                    <b>Here</b>
                </a>
                </p>
            </div>
        </Modal>

        <Modal show={showRegister} onHide={handleCloseRegister}>
            <div className="m-4">
                <Modal.Title>
                    <h1 className='mb-4'>Register</h1>
                </Modal.Title>
                    <Register /> {/* memanggil import Register */}
                <p className='mt-4' style={{color : "black"}}>
                    Already have an account ? click {" "}
                <a  onClick={SwitchRegis} style={{ cursor: "pointer" }}>
                    <b>Here</b>
                </a>
                </p>
            </div>
        </Modal>

    </>
  )
}
