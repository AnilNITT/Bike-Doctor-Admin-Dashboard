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


const CreateAdmin = () => {
  const baseURL = process.env.REACT_APP_API_BASE_URL

  const navigate = useNavigate()

  const [token, setToken] = useState('')
  const [names, setNames] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function CreateAdmin(e) {

    e.preventDefault()

    const token = localStorage.getItem('bike_token')

    const data = {
      name: names,
      email: email,
      password: password,
    }

    const options = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        // "Access-Control-Allow-Origin": "*",
        token: token,
      },
    }

    axios
      .post(`${baseURL}/adminauth/subadminsignup`, data, options)
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
              navigate('/admin')
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
                    Create Admin
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
                        Create Admin{' '}
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
                    onSubmit={CreateAdmin}
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
                          placeholder="Sub Admin Name"
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

export default CreateAdmin
