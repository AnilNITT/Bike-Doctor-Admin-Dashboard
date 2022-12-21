import { Link } from "react-router-dom";
import Footer from "../home/Footer";
import Header from "../home/Header";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import Toastify from "toastify-js";
// import "toastify-js/src/toastify.css";
import { useNavigate } from "react-router";
import _ from "lodash"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const pageSize = 10;
const Bikes = () => {

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();

  const [bike, setBike] = useState([]);
  const [__, refresh] = useState({});
  const [searchItem, setSearchItem] = useState("");
  const [paginatedBikes, setpaginatedBikes] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);

  const [order,setOrder] = useState("ASC");
  // sorting tables
  const sorting = (col) =>{
    if(order === "ASC"){
      const sorted = [...paginatedBikes].sort((a,b)=>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1:-1
      )
      setpaginatedBikes(sorted);
      setOrder("DSC")
    }
    if(order === "DSC"){
      const sorted = [...paginatedBikes].sort((a,b)=>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1:-1
      )
      setpaginatedBikes(sorted);
      setOrder("ASC")
    }
  }

  const DelBike = async (e) => {

    const id = e.currentTarget.value;

    const token = localStorage.getItem("bike_token");

    const data = {
      bike_id: id,
    };

    // const options = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     token: token,
    //   },
    // };

    await axios
      .delete(`${baseURL}/bike/deleteBike`, {
        data,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          token: token,
        },
      })
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

          const token = localStorage.getItem("bike_token");
          const options = {
            headers: {
              token: token,
            },
          };
          axios.get(`${baseURL}/bike/bikeList`, options).then((response) => {
            // console.log(response.data.data);
            setBike(response.data.data);
            setpaginatedBikes(_(response.data.data).slice(0).take(pageSize).value());
          });
          refresh({});
          navigate("/bike");
        }
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("bike_token");
    if (token === null) {
      navigate("/login");
    }
    const options = {
      headers: {
        token: token,
      },
    };

    axios.get(`${baseURL}/bike/bikeList`, options).then((response) => {
      // console.log(response.data.data);
      setBike(response.data.data);
      setpaginatedBikes(_(response.data.data).slice(0).take(pageSize).value());
    });
  }, []);

  const pageCount = bike ? Math.ceil(bike.length / pageSize) : 0;
  // if(pageCount==1)return null;
  const pages = _.range(1, pageCount + 1)

  const Paginations = (pageNo) => {
    setcurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedBikes = _(bike).slice(startIndex).take(pageSize).value();
    setpaginatedBikes(paginatedBikes);
  }

  return (
    <>
      <div class="main-content">
        <Header />
        <ToastContainer />
        <div
          class="header pt-7"
          Style="background-image: url(images/bg.jpg); background-size: cover; background-position: center center;"
        >
          <span class="mask bg-gradient-dark opacity-7"></span>
          <div class="container-fluid">
            <div class="header-body">
              <div class="row align-items-center py-4 pb-7">
                <div class="col-lg-6 col-7">
                  <h6 class="h2 text-white d-inline-block mb-0">Bikes</h6>
                  <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
                    <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                      <li class="breadcrumb-item text-white">
                        <Link to="/dashboard">
                          <i class="fa fa-home text-primary"></i>
                        </Link>
                      </li>
                      <li class="breadcrumb-item active text-white">Bikes</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Page content --> */}
        <div class="container-fluid mt--6 mrgn" Style="background-image: url(images/bg.jpg); background-size: cover; background-position: center center;">
          <div class="row" style={{ "padding-bottom": "2rem" }}>
            <div class="col">
              <div class="card">
                {/* <!-- Card header --> */}
                <div class="card-header algn">
                  <h3 class="mb-0">Bike Table</h3>
                  <div style={{ "width": "50%","display": "inline-flex","align-items": "center","justify-content": "space-evenly"}} className="algn">
                    <input type="text"
                      placeholder="search..."
                      className="form-control"
                      style={{ "width": "70%" }}
                      onChange={(e) => setSearchItem(e.target.value)}
                    />
                    <div style={{"margin-top": "25px"}}>
                      <Link
                        to="/addbike"
                        class="btn btn-sm btn-primary float-right mt--4"
                      >
                        <i class="fa fa-plus mr-1"></i> New
                      </Link>
                    </div>

                  </div>
                </div>


                {/* <!-- Light table --> */}
                <div class="table-responsive">
                  <table
                    class="table dataTable align-items-center table-flush"
                    id="dataTableReport"
                  >
                    <thead class="thead-light">
                      <tr>
                        <th class="sort" scope="col">
                          #
                        </th>
                        <th class="sort" scope="col">
                          id
                        </th>
                        <th class="sorting_asc" scope="col" onClick={()=>sorting("name")}>
                          Brand Name
                        </th>
                        <th class="sorting_asc" scope="col" onClick={()=>sorting("model")}>
                          Model Name
                        </th>
                        <th class="sort" scope="col">
                          Bike CC
                        </th>
                        <th class="sort" scope="col">
                          CC Extra Charge
                        </th>
                        {/* <th class="sort" scope="col">
                          Bike Fuel
                        </th> */}
                        <th class="sort" scope="col">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody class="list">
                      {paginatedBikes.filter((val) => {
                        if (searchItem === "") {
                          return val;
                        } else if (
                          val._id.includes(searchItem) ||
                          val.name.toLowerCase().includes(searchItem.toLowerCase()) ||
                          val.model.toLowerCase().includes(searchItem.toLowerCase())
                        ) {
                          return val;
                        }
                      }).map((data, i) => (
                        <tr>
                          <th>{parseInt((currentPage - 1) * 10) + (i + 1)}</th>
                          <td>{data._id}</td>
                          <td>{data.name}</td>
                          <td>{data.model}</td>
                          <td>{data.bike_cc}</td>
                          <td>{data.extra_charges}</td>
                          {/* <td>
                            <span class="badge badge-success">
                              {data.fuel_type}
                            </span>
                          </td> */}
                          <td class="table-actions">
                            <button
                              value={data._id}
                              class="btn-white btn shadow-none p-0 m-0 table-action text-danger bg-white"
                              onClick={DelBike}
                            >
                              <i class="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <nav className="d-flex justify-content-center">
                    <ul class="pagination">
                      {
                        pages.map((page) => (
                          <li className={
                            page === currentPage ? "page-item active" : "page-item"
                          }
                            Style={pageCount == 1 ? "display:none" : "display:flex"}
                          >
                            <p className="page-link" onClick={() => Paginations(page)}>{page}</p>
                          </li>
                        ))
                      }
                    </ul>
                  </nav>
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

export default Bikes;
