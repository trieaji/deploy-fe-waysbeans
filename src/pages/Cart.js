import React, {useEffect} from 'react';
import { Container, Col, Row, Button } from "react-bootstrap";
import { API } from '../config/api';
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import convertRupiah from 'rupiah-format';


import NavbarUser from '../components/navbar/NavbarUser';
import Product1 from "../assets/Product1.png"
import Minus from "../assets/minus.png"
import Plus from "../assets/plus.png"
import Trash from "../assets/Trash.png"

export default function Cart() {
  const handleClickplus = async (qty, id, price) => {
    // Counter state is incremented
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const newQty = qty + 1;
    const newTotal = price * newQty;
    const req = JSON.stringify({
      qty: newQty,
      sub_amount: newTotal,
    });
    await API.patch(`/cart/${id}`, req, config);
    refetch();
  };

  const handleClickmin = async (id, qty, price, sub_amount) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log(sub_amount);
    console.log(price);
    // Counter state is decremented
    if (qty === 1) {
      return;
    }
    const newQty = qty - 1;
    const newTotal = sub_amount - price * newQty;
    console.log(newTotal);
    const req = JSON.stringify({
      qty: newQty,
      sub_amount: newTotal * newQty,
    });
    await API.patch(`/cart/${id}`, req, config);
    refetch();
  };


  let navigate = useNavigate();

  // Get data transaction by ID
  let { data: transaction, refetch } = useQuery("transCache", async () => {
    const response = await API.get("/transaction-status");
    return response.data.data;
  });

  console.log(transaction);



  let handleDelete = async (id) => {
    await API.delete(`cart/${id}`);
    refetch();
  };

    // total Payment
    let Total = transaction?.carts?.reduce((a, b) => {
      return a + b.sub_amount;
    }, 0);
    let TotalQTY = transaction?.carts?.reduce((a, b) => {
      return a + b.qty;
    }, 0);
  
    // pay Handler
    const form = {
      status: "success",
      total: Total,
    };

    const handleSubmit = useMutation(async (e) => {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      // Insert transaction data
      const body = JSON.stringify(form);
  
      const response = await API.patch("/transactionID", body, config);
  
      console.log(response);
  
      const token = response.data.data.token;
      console.log(token);
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    });
  
    // useEffect on Mitrans
    useEffect(() => {
      //change this to the script source you want to load, for example this is snap.js sandbox env
      const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
      //change this according to your client-key
      const myMidtransClientKey = "SB-Mid-client-_vgv43K6mZmk0PCm";
  
      let scriptTag = document.createElement("script");
      scriptTag.src = midtransScriptUrl;
      // optional if you want to set script attribute
      // for example snap.js have data-client-key attribute
      scriptTag.setAttribute("data-client-key", myMidtransClientKey);
  
      document.body.appendChild(scriptTag);
      return () => {
        document.body.removeChild(scriptTag);
      };
    }, []);


  return (
    <div>
    {" "}
    <div>
      <NavbarUser />
      <div className='mt-5'>
        <Container>
          <div className='ms-5 mt-3'>
            <h1 style={{ color: "#613D2B" }}>My Cart</h1>
            <Row>
              <p className='mt-5' style={{ color: "#613D2B" }}>
                Review Your Order
              </p>
              <Col md={8}>
                <hr />
                {transaction?.carts?.map((item, index) => (
                <Row>
                  <div className='between'>
                    <div className='d-flex'>
                      <img src={"http://localhost:5000/uploads/" + item.product?.image} alt='productimage' style={{width:'20%'}} />
                      <div className='detailcartlist ps-3'>
                        <p className='fw-semibold mb-3' style={{fontSize:'22px'}}>{item?.product?.name}</p>
                        <div className='counter'>
                          <button className='none' onClick={() => handleClickmin(item.id, item.qty, item.product.price, item.sub_amount)}>
                            -
                          </button>
                          <p className='d-inline mx-2 none'>{item?.qty}</p>
                          <button className='none' onClick={() => handleClickplus(item.qty,item.id,item.product.price)}>
                            +
                          </button>
                        </div>
                      </div>
                      <div className='flexcolend'>
                      <p className='fw-semibold fs-5 mb-3 mt-1'>{convertRupiah.convert(item.product?.price)}</p>
                      <img className='' src={Trash} alt='trash' style={{width:'15%'}} onClick={() => handleDelete(item.id)} />
                      </div>
                    </div>
                  </div>
                </Row>
              ))}
                <hr />
              </Col>
              <Col md={4}>
                <hr />
                <Col className='d-flex justify-content-between'>
                  <p>Sub Total</p>
                  <p>{Total}</p>
                </Col>
                <Col className='d-flex justify-content-between'>
                  <p>Qty</p>
                  <p>{TotalQTY}</p>
                </Col>
                <hr />
                <Col className='d-flex justify-content-between'>
                  <p>Total</p>
                  <p>{Total}</p>
                </Col>
                <button
                  type='button'
                  className='pt-2 pb-2'
                  style={{
                    width: "100%",
                    color: "white",
                    backgroundColor: "#613D2B",
                    borderColor: "#613D2B",
                    borderRadius: "5px",
                  }}
                  onClick={(e) => handleSubmit.mutate(e)}>
                  Pay
                </button>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <div
        className='modal fade'
        id='thanks-for-order'
        tabindex='-1'
        role='dialog'
        aria-labelledby='exampleModalCenterTitle'
        aria-hidden='true'></div>
    </div>
  </div>
  )
}
