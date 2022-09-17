import React from 'react'

import { Navbar, Container, Dropdown, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Icon from "../../assets/IconWaysBeans.png";
import User from "../../assets/user.png";
import Logout from "../../assets/logout 1.png";
import AddBeans from "../../assets/AddBeans.png";

export default function NavbarAdmin() {
    const Navigate = useNavigate();

  const goAddProduct = () => {
    Navigate("/add-product");
  };

  const goAdmin = () => {
    Navigate("/admin");
  };

  const goList = () => {
    Navigate("/list-products");
  };

  const goLogout = () => {
    Navigate("/")
  }

  return (
    <Navbar
    bg='light'
    className='d-flex justify-content-beetween sticky-top'
    style={{ boxShadow: "0px 5px 5px #888888" }}>
    <Container className='d-flex justify-content-beetween'>
      <div>
        <img src={Icon} alt="icon" onClick={goAdmin} />
      </div>
      <div>
        <Row>
          <Col>
            <div>
              <Dropdown>
                <Dropdown.Toggle
                  variant='none'
                  id='dropdown-basic'
                  style={{ border: "none" }}>
                  <img src={User} alt="user" style={{ width: "50px", borderRadius: "50%" }} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <img src={AddBeans} alt='addbeans' onClick={goAddProduct} /> Add
                    Product
                  </Dropdown.Item>
                  <hr />
                  <Dropdown.Item>
                    <img src={AddBeans} alt='addbeans' onClick={goList} /> List Product
                  </Dropdown.Item>
                  <hr />
                  <Dropdown.Item>
                    <img src={Logout} alt='logout' onClick={goLogout} /> Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  </Navbar>
  )
}
