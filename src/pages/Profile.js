import React, { useContext } from 'react'
import { Container, Col, Row } from "react-bootstrap";
import NavbarUser from "../components/navbar/NavbarUser";
import Transaction from '../components/navbar/Transaction';
import { Usercontext } from '../context/userContext';
import { API } from '../config/api';
import { useQuery } from 'react-query';

import User from "../assets/user.png";

export default function Profile() {
  const title = "Profile";
  document.title = "WaysBeans | " + title;

  const [state] = useContext(Usercontext);

  return (
    <div>
      <NavbarUser />
      <Container className='bodyProfile p-5 ps-5'>
        <Row className='ps-5'>
          <Col md={6} className='mt-3'>
            <h2 className='myprofile mb-4' style={{ color: "#613D2B" }}>
              My Profile
            </h2>
            <Row>
              <div>
                <Row>
                  <Col className='' sm={6}>
                    <img alt="user" style={{width: "100%",height: "auto",borderRadius: "5px",}}/>
                  </Col>
                  <Col sm={6}>
                    <div>
                      <h3 style={{ color: "#613D2B" }}>Full Name</h3>
                      <p> {state.user.name}</p>
                    </div>

                    <div className='mt-4'>
                      <h3 style={{ color: "#613D2B" }}>Email</h3>
                      <p>{state.user.email}</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Row>
          </Col>
          <Col md={6} className='mt-3'>
            <h2 className='mb-4' style={{ color: "#613D2B" }}>
              My Transaction
            </h2>
            <Transaction />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
