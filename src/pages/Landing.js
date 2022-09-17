import React, { useState, useContext, useEffect } from 'react'
import NavigationBar from '../components/navbar/NavigationBar'

import {Container, Col, Row, Card} from 'react-bootstrap';
import Lan from "../assets/Landing.png"
import productsdummy from "../datadummy/DummyProduct.js";
import convertRupiah from "rupiah-format"
import NavbarUser from '../components/navbar/NavbarUser';

import { Link, useNavigate } from 'react-router-dom';
import { Usercontext } from '../context/userContext';
import { API } from '../config/api';

export default function Landing() {
    const [state, dispatch] = useContext(Usercontext);

    const [dataproduct, setDataproduct] = useState([]);

    useEffect(() => {
      const dataproduct = async () => {
        try {
          const response = await API.get("/products");
          setDataproduct(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      dataproduct();
    }, [setDataproduct]);

    
    let isLogin = state.isLogin;

    console.log(state)

  return (
    <div>
        {isLogin ? <NavbarUser />: <NavigationBar /> }
        
        <Container >
            <div>
                <img src={Lan} alt="landing" className='mt-5'  />
            </div>

            <div>
                <Row className='mt-5 mb-5'>
                    {dataproduct.map((item, index) => {
                        return(
                            <Col sm={3}>
                                <div>
                                    <Card
                                        key={index}
                                        style={{
                                            width: "15rem",
                                            backgroundColor:"F6E6DA",
                                            color:"F6E6DA",
                                            cursor:"pointer",
                                        }}
                                    >
                                        <Card.Img variant='top' src={item.image} />
                                        <Card.Body>
                                            <Link to={`/product/${item.id}`} className="text-decoration-none text-dark">
                                            <Card.Title>{item.name}</Card.Title>
                                            </Link>
                                            <p>{convertRupiah.convert(item.price)}</p>
                                            <p>stock: {item.stock}</p>
                                        </Card.Body>

                                    </Card>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </div>
        </Container>
    </div>
  )
}
