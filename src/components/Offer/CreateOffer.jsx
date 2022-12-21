import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../home/Footer";
import Header from "../home/Header";
import axios from "axios";
// import Toastify from "toastify-js";
// import "toastify-js/src/toastify.css";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateOffer = () => {
  
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();

  const [service, setService] = useState([]);
  const [token, setToken] = useState("");
  const [services, setServices] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [discount, setDiscount] = useState("");
  const [minOrder, setMinOrder] = useState("");

  function CreateOffer(e) {
    e.preventDefault();

    const data = {
      service_id: services,
      promo_code: promoCode.toUpperCase(),
      city:city.toLowerCase(),
      start_date: startDate,
      end_date: endDate,
      discount: parseInt(discount),
      minorderamt: parseInt(minOrder),
    };

    const options = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        token: token,
      },
    };

    // console.log(data);
    axios.post(`${baseURL}/offer/addoffer`, data, options).then((response) => {
      // console.log(response);
      if (response.data.status === 201 || response.data.status === 401) {
        toast(response.data.message,{
          position: "top-right",
          autoClose: 2500,
          type:"error",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          })
      } else {
        // console.log(response.data);
        toast(response.data.message,{
          position: "top-right",
          autoClose: 2500,
          type:"success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          })
          setTimeout(()=>{
            navigate("/offer");
          },2000);
      }
    });
  }

  useEffect(() => {
    const tokens = localStorage.getItem("bike_token");
    if (tokens === null) {
      navigate("/login");
    }
    setToken(tokens);

    const options = {
      headers: {
        token: tokens,
      },
    };

    axios.get(`${baseURL}/service/servicelist`, options).then((response) => {
      // console.log(response.data.data);
      setService(response.data.data);
    });
  }, []);

  return (
    <>
      <div class="main-content">
        <Header />
        <div
          class="header pt-7"
          Style="background-image: url(images/bg.jpg); background-size: cover; background-position: center center;"
        >
          <span class="mask bg-gradient-dark opacity-7"></span>
          <div class="container-fluid">
            <div class="header-body">
              <div class="row align-items-center py-4 pb-7">
                <div class="col-lg-6 col-7">
                  <h6 class="h2 text-white d-inline-block mb-0">Create Offer</h6>
                  <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
                    <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                      <li class="breadcrumb-item text-white">
                        <Link to="/dashboard">
                          <i class="fa fa-home text-primary"></i>
                        </Link>
                      </li>
                      <li
                        class="breadcrumb-item active text-white"
                        aria-current="page"
                      >
                        {" "}
                        Create Offer{" "}
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container-fluid mt--6 mb-5" Style="background-image: url(images/bg.jpg); background-size: cover; background-position: center center;">
          <div class="row" style={{"padding-bottom": "2rem"}}>
            <div class="col">
              <div class="card">
                {/* <!-- Card header --> */}
                <div class="card-header border-0">
                  <span class="h3"></span>

                  <form
                    class="form-horizontal"
                    onSubmit={CreateOffer}
                    id="create_service_form"
                    method="POST"
                    name="create_service_form"
                  >
                    <input
                      name="_token"
                      type="hidden"
                      value="oKup3nu5kd6tUBCqoFTVEMtnOOg1p3zubico9KkM"
                    />
                    <div class="my-0">
                     
                      <div class="form-group">
                        <label class="form-control-label" for="role">
                          Service Name
                        </label>
                        <select
                          value={services}
                          onChange={(e) => setServices(e.target.value)}
                          class="form-control select2"
                          data-placeholder="-- Select Service --"
                          dir=""
                          name="roles[]"
                        >
                          <option value="-- Select Service --">
                            --Select Service--
                          </option>
                          {service.map((data, i) => (
                            <option value={data._id}>{data.name}</option>
                          ))}
                        </select>
                        <div class="invalid-div">
                          <span class="services"></span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="form-control-label" for="name_create">
                          Promo Code
                        </label>
                        <input
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          Style="text-transform:uppercase"
                          class="form-control"
                          id="promoCode_create"
                          name="promoCode"
                          placeholder="promoCode"
                          type="text"
                        />
                        <div class="invalid-div">
                          <span class="promoCode"></span>
                        </div>
                      </div>


                      <div class="form-group">
                        <label class="form-control-label" for="city">
                          City
                        </label>
                        <input
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          class="form-control"
                          id="city_create"
                          name="city"
                          placeholder="city"
                          required
                          type="text"
                        />
                        <div class="invalid-div">
                          <span class="city"></span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="form-control-label" for="description">
                          Start Date
                        </label>
                        {/* <DatePicker selected={startDate} showTimeSelect dateFormat="Pp" onChange={(date) => setStartDate(date)} /> */}
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        />
                        <div class="invalid-div">
                          <span class="description"></span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="form-control-label" for="description">
                          End Date
                        </label>
                        {/* <DatePicker selected={startDate} showTimeSelect dateFormat="Pp" onChange={(date) => setStartDate(date)} /> */}
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                        />
                        <div class="invalid-div">
                          <span class="description"></span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="form-control-label" for="discount">
                          Discount
                        </label>
                        <input
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                          class="form-control"
                          id="discount_create"
                          name="discount"
                          placeholder="discount"
                          type="text"
                        />
                        <div class="invalid-div">
                          <span class="Discount"></span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="form-control-label" for="tax">
                          Minimum Order Amount
                        </label>
                        <input
                          value={minOrder}
                          onChange={(e) => setMinOrder(e.target.value)}
                          class="form-control"
                          id="minOrder_create"
                          name="tax"
                          placeholder="Minimum order amount"
                          type="text"
                        />
                        <div class="invalid-div">
                          <span class="minOrder"></span>
                        </div>
                      </div>

                      <div class="text-center">
                        <button
                          class="btn btn-primary mt-4 mb-5"
                          id="create_btn"
                          type="submit"
                        >
                          Create
                        </button>
                        <ToastContainer/>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CreateOffer;
