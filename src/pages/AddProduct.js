import {React, useState} from 'react';
import { Container, Col, Row } from "react-bootstrap";
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";

import Thumbnail from "../assets/Thumbnail.png";
import Product1 from "../assets/Product1.png";

import NavbarAdmin from '../components/navbar/NavbarAdmin';

export default function AddProduct() {
  const [preview, setPreview] = useState(null); //For image preview
  let navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    stock: "",
    price: "",
    desc: "",
    image: "",
  }); //Store product data


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    console.log(form);
    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("name", form.name);
      formData.set("stock", form.stock);
      formData.set("price", form.price);
      formData.set("desc", form.desc);
      formData.set("image", form.image[0], form.image[0].name);

      // Configuration

      // Insert product data
      const response = await API.post("/product", formData, config);
      navigate("/list-products");
    } catch (error) {
      console.log(error);
    }
  });


  return (
    <div>
    <NavbarAdmin />
    <div>
      <Container className='mt-5 mb-5'>
        <Row>
          <Col md={7} className=''>
            <h1 className='mb-5' style={{ color: "#613D2B" }}>
              Product
            </h1>
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              <Col>
                <input
                  className='mb-5 pt-2 pb-2 ps-1'
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Name Product'
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    borderColor: "#613D2B",
                    backgroundColor: "#DCDCDC",
                  }}
                />
              </Col>
              <Col>
                <input
                  className='mb-5 pt-2 pb-2 ps-1'
                  type='text'
                  placeholder='Stock'
                  name='stock'
                  id='stock'
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    borderColor: "#613D2B",
                    backgroundColor: "#DCDCDC",
                  }}
                />
              </Col>
              <Col>
                <input
                  className='mb-5 pt-2 pb-2 ps-1'
                  type='text'
                  placeholder='Price'
                  name='price'
                  id='price'
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    borderColor: "#613D2B",
                    backgroundColor: "#DCDCDC",
                  }}
                />
              </Col>
              <Col>
                <textarea
                  className='mb-5 pt-2 pb-2 ps-1'
                  placeholder='Description'
                  name='desc'
                  id='desc'
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    border: "2px solid #613D2B",
                    backgroundColor: "#DCDCDC",
                  }}></textarea>
              </Col>
              <Col>
                <label
                  className='mb-5 pt-2 pb-2 ps-1 pe-1 d-flex justify-content-between align-item-center'
                  htmlFor='image'
                  style={{
                    width: "50%",
                    borderRadius: "5px",
                    border: "2px solid #613D2B",
                    color: "#757575",
                    backgroundColor: "#DCDCDC",
                  }}>
                  File
                  <img src={Thumbnail} alt='' />
                </label>
                <input
                  className='mb-5 pt-2 pb-2 ps-1'
                  type='file'
                  id='image'
                  placeholder='Photo Product'
                  onChange={handleChange}
                  name='image'
                  hidden
                />
              </Col>
              <Col className='d-flex justify-content-center'>
                <button
                  className='mb-5 pt-2 pb-2'
                  type='submit'
                  style={{
                    width: "60%",
                    borderRadius: "5px",
                    backgroundColor: "#613D2B",
                    color: "white",
                    borderColor: "#613D2B",
                  }}>
                  Add Product
                </button>
              </Col>
            </form>
          </Col>
          <Col md={5}>
            {preview && (
                <img src={preview} alt="product" style={{ width: "100%", borderRadius: "5px" }}
                />
            )}
            
          </Col>
        </Row>
      </Container>
    </div>
  </div>
  )
}
