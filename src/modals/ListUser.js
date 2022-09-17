import React, { useState, useEffect } from "react";
import { Modal, Table } from "react-bootstrap";
import { API } from "../config/api";

export default function ListUser() {
     const [show, setShow] = useState(false);

     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);
     const [User,setUser] = useState([]);

     useEffect(() => {
        let User = async () => {
            try {
                const response = await API.get("/users")
                setUser(response.data.data)
            } catch(error) {
                console.log(error)
            }
        };
        User();
     }, [setUser])

    return (
        <div>
          <button
            className='mb-5 pt-2 pb-2'
            type='submit'
            style={{
              width: "100%",
              borderRadius: "5px",
              backgroundColor: "#613D2B",
              color: "white",
              borderColor: "#613D2B",
            }}
            onClick={handleShow}>
            List Users
          </button>
    
          <Modal show={show} onHide={handleClose}>
            <div className='m-4'>
              <Modal.Title>
                <h1 className='mb-4'>User</h1>
              </Modal.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                    {User?.map((item,index)=> (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item?.name}</td>
                            <td>{item?.email}</td>
                            <td>{item?.status}</td>
                        </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </Modal>
        </div>
      );
}