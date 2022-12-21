import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../home/Footer";
import Header from "../home/Header";
import axios from "axios";
// import Toastify from "toastify-js";
// import "toastify-js/src/toastify.css";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateServiceFeature = () => {
  
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  
  const navigate = useNavigate();

  const [service, setService] = useState([]);
  const [services, setServices] = useState("");
  const [token, setToken] = useState("");
  const [names, setNames] = useState("");
  const [images, setImages] = useState("");
  const [description, setDescription] = useState("");

  const createServiceImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  function CreateService(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("service_id", services);
    formData.append("name", names);
    formData.append("images", images[0]);
    formData.append("description", description);

    // const data = {
    //   name: names,
    //   image: images,
    //   description: description,
    //   estimated_cost: parseInt(estimated_cost),
    //   tax: parseInt(tax),
    // };

    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        token: token,
      },
    };

    axios
      .post(`${baseURL}/servicefeature/addfeature`, formData, options)
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
              navigate("/servicefeature");
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
                  <h6 class="h2 text-white d-inline-block mb-0">Create Service Feature</h6>
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
                        Create Service Feature{" "}
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
                    onSubmit={CreateService}
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
                          required
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
                          Feature Name
                        </label>
                        <input
                          value={names}
                          onChange={(e) => setNames(e.target.value)}
                          class="form-control"
                          id="name_create"
                          name="name"
                          placeholder=" FeatureName"
                          type="text"
                          required
                        />
                        <div class="invalid-div">
                          <span class="name"></span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="form-control-label" for="image_create">
                          Image
                        </label>
                        <input
                          // value={images}
                          onChange={createServiceImagesChange}
                          // onChange={(e) => setImages(e.target.value)}
                          class="form-control"
                          id="image_create"
                          name="images"
                          placeholder="Image link"
                          type="file"
                          required
                        />
                        <div class="invalid-div">
                          <span class="image"></span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="form-control-label" for="description">
                        Feature Description
                        </label>
                        <input
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          class="form-control"
                          id="description_create"
                          name="description"
                          placeholder=" Feature description"
                          required
                          type="text"
                        />
                        <div class="invalid-div">
                          <span class="description"></span>
                        </div>
                      </div>

                      {/* <div class="form-group">
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
                          required
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
                          required
                          type="text"
                        />
                        <div class="invalid-div">
                          <span class="description"></span>
                        </div>
                      </div> */}

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

export default CreateServiceFeature;
