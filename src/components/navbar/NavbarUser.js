import React, {useContext} from 'react';
import { Container, Navbar, Dropdown, Col, Row } from 'react-bootstrap';
import Icon from "../../assets/IconWaysBeans.png";
import ProfileNav from "../../assets/ProfilNavbar.png";
import Cart from "../../assets/cart.png";
import User from "../../assets/user.png";
import Logout from "../../assets/logout 1.png";

import { useNavigate } from "react-router-dom";
import { Usercontext } from '../../context/userContext';

function NavbarUser () {
    const navigate = useNavigate();

    const [state, dispatch] = useContext(Usercontext);

    const handleProfile = () => {
        navigate("/profile");
      };
    
      const handleLogout = () => {
        console.log(state);
        dispatch({
          type: "LOGOUT",
        });
        navigate("/");
      };


    const goHome = () => {
      navigate("/");
    };
    const goCart = () => {
      navigate("/cart");
    };


    return (
    <>
        <Navbar className="d-flex bg-white justify-content-between sticky-top" style={{boxShadow: "0px 5px 5px #888888"}}>
            <Container className='d-flex bg-white justify-content-between'>
              <div>
                <img alt="" src={Icon} onClick={goHome}/>
              </div>
              <div>
                <Row>
                    <Col>
                        <img alt="" src={Cart} className='me-3' style={{width: "35px", marginTop: "15px"}} onClick={goCart}/>
                    </Col>

                    <Col>
                        <div>
                            <Dropdown>
                                <Dropdown.Toggle
                                variant='none'
                                id='dropdown-basic'
                                style={{border: "none"}}>
                                    <img src={ProfileNav} alt='' style={{width: "50px", borderRadius: "50%"}} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <img src={User} alt='' onClick={handleProfile} />{" "}
                                        Profile
                                    </Dropdown.Item>
                                        <hr />
                                    <Dropdown.Item>
                                        <img src={Logout} alt='' onClick={handleLogout} /> Log Out
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Col>
                </Row>
            </div>
            </Container>
        </Navbar>
    </>
    );
}
export default NavbarUser