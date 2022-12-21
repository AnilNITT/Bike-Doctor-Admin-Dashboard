import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../home/Footer'
import Header from '../home/Header'
import axios from 'axios'
// import Toastify from 'toastify-js'
// import 'toastify-js/src/toastify.css'
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateDealer = () => {
  const baseURL = process.env.REACT_APP_API_BASE_URL

  const navigate = useNavigate()

  const [token, setToken] = useState('')
  const [names, setNames] = useState('')
  const [email, setEmail] = useState('')
  const [phones, setPhones] = useState('')
  const [city, setCity] = useState('')
  const [states, setStates] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  function CreateDealers(e) {
    e.preventDefault()

    const token = localStorage.getItem('bike_token')

    const data = {
      name: names,
      email: email,
      phone: parseInt(phones),
      password: password,
      city: city,
      state: states,
      address: address,
      latitude: parseInt(latitude),
      longitude: parseInt(longitude),
    }

    const options = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        // "Access-Control-Allow-Origin": "*",
        token: token,
      },
    }

    axios
      .post(`${baseURL}/dealer/addDealer`, data, options)
      .then((response) => {

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
              navigate('/dealer')
            },2000);
        }
      })
  }

  useEffect(() => {
    const tokens = localStorage.getItem('bike_token')
    if (tokens === null) {
      navigate('/login')
    }
    setToken(tokens)
  }, [])

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
                  <h6 class="h2 text-white d-inline-block mb-0">
                    Create Dealer
                  </h6>
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
                        {' '}
                        Create Dealer{' '}
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="container-fluid mt--6 mb-5"
          Style="background-image: url(images/bg.jpg); background-size: cover; background-position: center center;"
        >
          <div class="row" style={{ 'padding-bottom': '2rem' }}>
            <div class="col">
              <div class="card">
                {/* <!-- Card header --> */}
                <div class="card-header border-0">
                  <span class="h3"></span>
                  <form
                    class="form-horizontal"
                    onSubmit={CreateDealers}
                    id="create_user_form"
                    method="POST"
                    name="create_dealer_form"
                  >
                    <input
                      name="_token"
                      type="hidden"
                      value="oKup3nu5kd6tUBCqoFTVEMtnOOg1p3zubico9KkM"
                    />
                    <div class="my-0">
                      <div class="form-group">
                        <label class="form-control-label" for="fname_create">
                          Name
                        </label>
                        <input
                          value={names}
                          onChange={(e) => setNames(e.target.value)}
                          class="form-control"
                          id="fname_create"
                          name="first_names"
                          placeholder="Dealer Name"
                          type="text"
                          required
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
                          required
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
                          required
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
                          required
                        />
                        <div class="invalid-div">
                          <span class="password"></span>
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
                          required
                        />
                        <div class="invalid-div">
                          <span class="address"></span>
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
                          required
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
                          placeholder="states"
                          type="text"
                          required
                        />
                        <div class="invalid-div">
                          <span class="states"></span>
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
                          required
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
                          required
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
                        <ToastContainer />
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
  )
}

export default CreateDealer
