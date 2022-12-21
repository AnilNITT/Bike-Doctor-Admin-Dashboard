import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../home/Footer";
import Header from "../home/Header";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useNavigate } from "react-router";

const CreateEmployee = () => {

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [first_names, setFnames] = useState("");
  const [last_names, setLnames] = useState("");
  const [email, setEmail] = useState("");
  const [phones, setPhones] = useState("");
  const [city, setCity] = useState("");
  const [states, setStates] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  function CreateEmployee(e) {
    e.preventDefault();

    const token = localStorage.getItem("bike_token");

    const data = {
      first_name: first_names,
      last_name: last_names,
      email: email,
      phone: parseInt(phones),
      password: password,
      city: city,
      state: states,
      address: address,
      latitude: latitude,
      longitude: longitude,
    };

    const options = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        token: token,
      },
    };

    console.log(data);
    axios
      .post(`${baseURL}/employee/addemployee`, data, options)
      .then((response) => {
        // console.log(response);
        if (response.data.status === 201 || response.data.status === 401) {
          Toastify({
            text: response.data.message,
            className: "info",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
              size: 10,
            },
            close: true,
          }).showToast();
        } else {
          // console.log(response.data);
          navigate("/employee");
        }
      });
  }

  useEffect(() => {
    const tokens = localStorage.getItem("bike_token");
    if (tokens === null) {
      navigate("/login");
    }
    setToken(tokens);
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
                  <h6 class="h2 text-white d-inline-block mb-0">Create Employee</h6>
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
                        Create Employee{" "}
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
                    onSubmit={CreateEmployee}
                    id="create_user_form"
                    method="POST"
                    name="create_employee_form"
                  >
                    <input
                      name="_token"
                      type="hidden"
                      value="oKup3nu5kd6tUBCqoFTVEMtnOOg1p3zubico9KkM"
                    />
                    <div class="my-0">
                      <div class="form-group">
                        <label class="form-control-label" for="fname_create">
                          First Name
                        </label>
                        <input
                          value={first_names}
                          onChange={(e) => setFnames(e.target.value)}
                          class="form-control"
                          id="fname_create"
                          name="first_names"
                          placeholder="User First Name"
                          type="text"
                        />
                        <div class="invalid-div">
                          <span class="name"></span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="form-control-label" for="lname_create">
                          Last Name
                        </label>
                        <input
                          value={last_names}
                          onChange={(e) => setLnames(e.target.value)}
                          class="form-control"
                          id="lname_create"
                          name="last_names"
                          placeholder="User Last Name"
                          type="text"
                        />
                        <div class="invalid-div">
                          <span class="name"></span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="form-control-label" for="email_create">
                          Email
                        </label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          class="form-control"
                          id="email_create"
                          name="email"
                          placeholder="Email Address"
                          type="email"
                        />
                        <div class="invalid-div">
                          <span class="email"></span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="form-control-label" for="phone_create">
                          Phone No
                        </label>
                        <input
                          value={phones}
                          onChange={(e) => setPhones(e.target.value)}
                          class="form-control"
                          id="phone_create"
                          name="phones"
                          placeholder="Phone No."
                          type="text"
                        />
                        <div class="invalid-div">
                          <span class="phone"></span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="form-control-label" for="description">
                          Password
                        </label>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          class="form-control"
                          id="password_create"
                          name="password"
                          placeholder="password"
                          type="text"
                        />
                        <div class="invalid-div">
                          <span class="password"></span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="form-control-label" for="phone_create">
                          City
                        </label>
                        <input
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          class="form-control"
                          id="city_create"
                          name="city"
                          placeholder="city"
                          type="text"
                        />
                        <div class="invalid-div">
                          <span class="city"></span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="form-control-label" for="phone_create">
                          State
                        </label>
                        <input
                          value={states}
                          onChange={(e) => setStates(e.target.value)}
                          class="form-control"
                          id="states_create"
                          name="states"
                          placeholder="states No."
                          type="text"
                        />
                        <div class="invalid-div">
                          <span class="states"></span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="form-control-label" for="address_create">
                          Address
                        </label>
                        <input
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          class="form-control"
                          id="address_create"
                          name="address"
                          placeholder="address"
                          type="text"
                        />
                        <div class="invalid-div">
                          <span class="address"></span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="form-control-label" for="estimated_cost">
                          Latitude
                        </label>
                        <input
                          value={latitude}
                          onChange={(e) => setLatitude(e.target.value)}
                          class="form-control"
                          id="latitude_create"
                          name="latitude"
                          placeholder="latitude"
                          type="text"
                        />
                        <div class="invalid-div">
                          <span class="latitude"></span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="form-control-label" for="tax">
                          longitude
                        </label>
                        <input
                          value={longitude}
                          onChange={(e) => setLongitude(e.target.value)}
                          class="form-control"
                          id="longitude_create"
                          name="longitude"
                          placeholder="longitude"
                          type="text"
                        />
                        <div class="invalid-div">
                          <span class="description"></span>
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

export default CreateEmployee;
