import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../home/Footer";
import Header from "../home/Header";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useNavigate } from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateBanner = () => {
  
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();

  const [banners_name, setBannersName] = useState("");
  const [token, setToken] = useState("");
  const [banner_image, setBannerImage] = useState([]);

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setBannerImage(files);
  };

  function CreateBanners(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", banners_name);
    formData.append("images", banner_image[0]);

    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        token: token,
      },
    };

    axios.post(`${baseURL}/banner/addbanner`, formData, options).then((response) => {
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
            navigate("/banner");
          },2000);
      }
    });
  }

  useEffect(() => {
    const tokens = localStorage.getItem("bike_token");
    setToken(tokens);
    if (tokens === null) {
      navigate("/login");
    }
    const options = {
      headers: {
        token: tokens,
      },
    };

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
                  <h6 class="h2 text-white d-inline-block mb-0">Create Banner</h6>
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
                        Create Banner{" "}
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
                    onSubmit={CreateBanners}
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
                        <label class="form-control-label" for="banners_name_create">
                          Banner Name
                        </label>
                        <input
                          value={banners_name}
                          onChange={(e) => setBannersName(e.target.value)}
                          class="form-control"
                          id="banners_name_create"
                          name="banners_name"
                          placeholder="Banner name"
                          type="text"
                          required
                        />
                        
                        <div class="invalid-div">
                          <span class="banners_name"></span>
                        </div>
         
                    </div>

                    <div class="form-group">
                        <label class="form-control-label" for="banner_image_create">
                        Banner Image
                        </label>
                        <input
                          // value={banner_image}
                          onChange={createProductImagesChange}
                          // onChange={(e) => setBannerImage(e.target.files[0])}
                          class="form-control"
                          id="banner_image_create"
                          name="banner_image"
                          placeholder="banner image URL"
                          type="file"
                          // required
                          accept="image/*"
                        />
                        <div class="invalid-div">
                          <span class="banner_image">{}</span>
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
  );
};

export default CreateBanner;
