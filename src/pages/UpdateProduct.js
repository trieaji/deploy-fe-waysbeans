import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";

import Thumbnail from "../assets/Thumbnail.png";

import NavbarAdmin from "../components/navbar/NavbarAdmin";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { useMutation, useQuery } from "react-query";



function UpdateProduct() {
    const [preview, setPreview] = useState(null); //For image preview
    const [product, setProduct] = useState({}); //Store product data
    const [dataproduct, setDataproduct] = useState([]);
    let navigate = useNavigate();
  
    const { id } = useParams();
  
    const [form, setForm] = useState({
      name: "",
      stock: "",
      price: "",
      desc: "",
      image: "",
    }); //Store product data
  
    useEffect(() => {
      const dataproduct = async () => {
        try {
          const response = await API.get("/product/" + id);
          setForm({
            name: response.data.data.name,
  
            stock: response.data.data.stock,
  
            price: response.data.data.price,
  
            desc: response.data.data.desc,
  
            image: response.data.data.image,
          });
  
          setDataproduct(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      dataproduct();
    }, [setDataproduct]);
  
    console.log(id);
    console.log(form);
  
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
  
        if (form.image) {
          formData.set("image", form?.image[0], form?.image[0]?.name);
        }
  
        formData.set("name", form.name);
        formData.set("stock", form.stock);
        formData.set("price", form.price);
        formData.set("description", form.desc);
  
        // Configuration
  
        // Insert product data
        const response = await API.patch("/product/" + dataproduct.id, formData);
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
                      value={form.name}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        borderRadius: "5px",
                        borderColor: "#613D2B",
                        backgroundColor: "#DCDCDC",
                        color: "#808080",
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
                      value={form.stock}
                      style={{
                        width: "100%",
                        borderRadius: "5px",
                        borderColor: "#613D2B",
                        backgroundColor: "#DCDCDC",
                        color: "#808080",
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
                      value={form.price}
                      style={{
                        width: "100%",
                        borderRadius: "5px",
                        borderColor: "#613D2B",
                        backgroundColor: "#DCDCDC",
                        color: "#808080",
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
                      value={form.desc}
                      style={{
                        width: "100%",
                        borderRadius: "5px",
                        border: "2px solid #613D2B",
                        backgroundColor: "#DCDCDC",
                        color: "#808080",
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
                        color: "#808080",
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
                      Update Product
                    </button>
                  </Col>
                </form>
              </Col>
              <Col md={5}>
                {!preview ? (
                  <div>
                    <img src={form.image} style={{ width: "100%", borderRadius: "5px" }} alt="ada-foto" />
                  </div>
                ) : (
                  <div>
                    <img src={preview} style={{ width: "100%", borderRadius: "5px" }} alt="ada-preview" />
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
  
  export default UpdateProduct;