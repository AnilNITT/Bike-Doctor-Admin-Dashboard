import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../home/Footer";
import Header from "../home/Header";
import axios from "axios";
// import Toastify from "toastify-js";
// import "toastify-js/src/toastify.css";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditService = () => {

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();
  const location = useLocation();
  const [_, refresh] = useState({});

  const [ids, setIds] = useState("");
  const [token, setToken] = useState("");
  const [names, setNames] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
  const [estimated_cost, setEstimated_cost] = useState("");
  const [tax, setTax] = useState("");

  function EditService(e) {
    e.preventDefault();

    const data = {
      service_id: ids,
      name: names,
      // image: images,
      area:area.toLowerCase(),
      description: description,
      estimated_cost: parseInt(estimated_cost),
      tax: parseInt(tax),
    };

    const options = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        token: token,
      },
    };
    axios
      .put(`${baseURL}/service/updateservice`, data, options)
      .then((response) => {
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
              navigate("/service");
            },2000);
        }
      });
  }

  useEffect(async () => {
    const tokens = localStorage.getItem("bike_token");
    if (tokens === null) {
      navigate("/login");
    }
    setToken(tokens);
    const idss = location.state.id;
    setIds(idss);

    const options = {
      headers: {
        token: tokens,
      },
    };

    const data = await axios.get(`${baseURL}/service/service/${idss}`, options);

    const services = data.data.data;

    setNames(services?.name);
    setArea(services?.area);
    // setImages(services?.image);
    setDescription(services?.description);
    setEstimated_cost(services?.estimated_cost);
    setTax(services?.tax);
  }, []);

  useEffect(() => {
    refresh({});
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
                  <h6 class="h2 text-white d-inline-block mb-0">
                    Edit Service
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
                        {" "}
                        Edit Service{" "}
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container-fluid mt--6 mb-5" Style="background-image: url(images/bg.jpg); background-size: cover; background-position: center center;">
          <div class="row">
            <div class="col">
              <div class="card">
                {/* <!-- Card header --> */}
                <div class="card-header border-0">
                  <span class="h3"></span>

                  <form
                    class="form-horizontal"
                    onSubmit={EditService}
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
                        <label class="form-control-label" for="name_create">
                          Name
                        </label>
                        <input
                          value={names}
                          onChange={(e) => setNames(e.target.value)}
                          class="form-control"
                          id="name_create"
                          name="name"
                          placeholder="Name"
                          type="text"
                        />
                        <div class="invalid-div">
                          <span class="name"></span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="form-control-label" for="area_create">
                          Area Locality
                        </label>
                        <input
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                          class="form-control"
                          id="area_create"
                          name="area"
                          placeholder="Place.."
                          type="text"
                        />
                        <div class="invalid-div">
                          <span class="area"></span>
                        </div>
                      </div>

{/* 
                      <div class="form-group">
                        <label class="form-control-label" for="image_create">
                          Image URL
                        </label>
                        <input
                          value={images}
                          onChange={(e) => setImages(e.target.value)}
                          class="form-control"
                          id="image_create"
                          name="images"
                          placeholder="Image link"
                          type="text"
                        />
                        <div class="invalid-div">
                          <span class="image"></span>
                        </div>
                      </div> */}

                      <div class="form-group">
                        <label class="form-control-label" for="description">
                          Description
                        </label>
                        <input
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          class="form-control"
                          id="description_create"
                          name="description"
                          placeholder="description"
                          type="text"
                        />
                        <div class="invalid-div">
                          <span class="description"></span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="form-control-label" for="estimated_cost">
                          Estimated Cost
                        </label>
                        <input
                          value={estimated_cost}
                          onChange={(e) => setEstimated_cost(e.target.value)}
                          class="form-control"
                          id="estimated_cost_create"
                          name="estimated_cost"
                          placeholder="service estimated cost"
                          type="text"
                        />
                        <div class="invalid-div">
                          <span class="description"></span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="form-control-label" for="tax">
                          Tax
                        </label>
                        <input
                          value={tax}
                          onChange={(e) => setTax(e.target.value)}
                          class="form-control"
                          id="tax_create"
                          name="tax"
                          placeholder="service tax"
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
                          Update
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

export default EditService;
