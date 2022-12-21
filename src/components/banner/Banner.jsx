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
const Banner = () => {
  
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const image_base_url = process.env.REACT_APP_IMAGE_BASE_URL;

  const navigate = useNavigate();

  const [banner, setBanner] = useState([]);
  const [__, refresh] = useState({});

  const [paginatedBanners,setpaginatedBanners] = useState([]);
  const [currentPage,setcurrentPage] = useState(1);

  const [order,setOrder] = useState("ASC");
  // sorting tables
  const sorting = (col) =>{
    if(order === "ASC"){
      const sorted = [...paginatedBanners].sort((a,b)=>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1:-1
      )
      setpaginatedBanners(sorted);
      setOrder("DSC")
    }
    if(order === "DSC"){
      const sorted = [...paginatedBanners].sort((a,b)=>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1:-1
      )
      setpaginatedBanners(sorted);
      setOrder("ASC")
    }
  }


  const DelBanner = async (e) => {
    const id = e.currentTarget.value;

    const token = localStorage.getItem("bike_token");

    const data = {
      banner_id: id,
    };

    // const options = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     token: token,
    //   },
    // };

    await axios
      .delete(`${baseURL}/banner/deletebanner`, {
        data,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          token: token,
        },
      })
      .then(async(response) => {
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
            });
          refresh({});
          const token = localStorage.getItem("bike_token");
          const options = {
            headers: {
              token: token,
            },
          };
          await axios.get(`${baseURL}/banner/bannerlist`,options ).then((response) => {
            // console.log(response.data.data);
            setBanner(response.data.data);
            setpaginatedBanners(_(response.data.data).slice(0).take(pageSize).value());
          });
          navigate("/banner");
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

    axios.get(`${baseURL}/banner/bannerlist`,options ).then((response) => {
      // console.log(response.data.data);
      setBanner(response.data.data);
      setpaginatedBanners(_(response.data.data).slice(0).take(pageSize).value());
    });
  }, []);

  const pageCount = banner? Math.ceil(banner.length/pageSize):0;
  // if(pageCount==1)return null;
  const pages = _.range(1,pageCount+1)

  const Paginations = (pageNo) =>{
    setcurrentPage(pageNo);
    const startIndex = (pageNo - 1 )* pageSize;
    const paginatedBannerss = _(banner).slice(startIndex).take(pageSize).value();
    setpaginatedBanners(paginatedBannerss);
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
                  <h6 class="h2 text-white d-inline-block mb-0">Banners</h6>
                  <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
                    <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                      <li class="breadcrumb-item text-white">
                        <Link to="/dashboard">
                          <i class="fa fa-home text-primary"></i>
                        </Link>
                      </li>
                      <li class="breadcrumb-item active text-white">Banners</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Page content --> */}
        <div class="container-fluid mt--6 mrgn" Style="background-image: url(images/bg.jpg); background-size: cover; background-position: center center;">
          <div class="row" style={{"padding-bottom": "2rem"}}>
            <div class="col">
              <div class="card">
                {/* <!-- Card header --> */}
                <div class="card-header">
                  <h3 class="mb-0">Banner Table</h3>
                  <Link
                    to="/addbanner"
                    class="btn btn-sm btn-primary float-right mt--4"
                  >
                    <i class="fa fa-plus mr-1"></i> New
                  </Link>
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
                          Banner Name
                        </th>
                        <th class="sort" scope="col">
                          Banner Image
                        </th>
                        <th class="sort" scope="col">
                          Action
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody class="list">
                      {paginatedBanners.map((data, i) => (
                        <tr>
                          <th>{parseInt((currentPage-1)*10)+(i+1)}</th>
                          <td>{data._id}</td>
                          <td>{data.name}</td>
                          <td><img src={`${image_base_url}/${data.banner_image}`} alt="" border='3' height='100' width='200' /></td>
                          {/* <td><span class="badge badge-success">User{data.status}</span></td> */}
                          <td class="table-actions">
                            <button
                              value={data._id}
                              class="btn-white btn shadow-none p-0 m-0 table-action text-danger bg-white"
                              onClick={DelBanner}
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
                        pages.map((page)=>(
                          <li className={
                            page === currentPage ? "page-item active": "page-item"
                          }
                          Style={pageCount == 1 ? "display:none":"display:flex"}
                          >
                          <p className="page-link" onClick={()=>Paginations(page)}>{page}</p>
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

export default Banner;
