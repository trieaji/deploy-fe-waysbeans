import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Import Library
import { Route, Routes, useNavigate} from "react-router-dom";

// Page Import
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import ListProduct from "./pages/ListProduct";
import IncomeTransaction from "./pages/IncomeTransaction";
import DetailProduct from "./pages/DetailProduct";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";

import { API, setAuthToken } from "./config/api";
import { Usercontext } from "./context/userContext";
import { useContext, useEffect } from "react";


//init token on axios evry time the app refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();

  // Init user context
  const [state, dispatch] = useContext(Usercontext);
  console.clear();
  console.log(state);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    // Redirect Auth
    if (state.isLogin === false) {
      navigate("/");
    } else {
      if (state.user.status === "admin") {
        navigate("/admin");
      } else if (state.user.status === "customer") {
        navigate("/");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/product/:id' element={<DetailProduct />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/admin' element={<IncomeTransaction />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/list-products' element={<ListProduct />} />
        <Route path='/update-product/:id' element={<UpdateProduct />} />
      </Routes>
  );
}

export default App;
