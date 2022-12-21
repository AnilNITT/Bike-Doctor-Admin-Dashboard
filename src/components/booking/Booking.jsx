import { Link } from "react-router-dom";
import Footer from "../home/Footer";
import Header from "../home/Header";
import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
// import Toastify from "toastify-js";
// import "toastify-js/src/toastify.css";
import { useNavigate } from "react-router";
import _ from "lodash"
// import * as XLSX from 'xlsx';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const pageSize = 10;

const Booking = () => {

  const tableRef = useRef(null);

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();

  const [booking, setBooking] = useState([]);
  const [__, refresh] = useState({});
  const [searchItem, setSearchItem] = useState("");
  const [paginatedBookings,setpaginatedBookings] = useState([]);
  const [currentPage,setcurrentPage] = useState(1);

  const [order,setOrder] = useState("ASC");

  // Export into Excel file
  // const HandleOnExport = () =>{
  //   var wb = XLSX.utils.book_new();
  //   var ws = XLSX.utils.json_to_sheet(booking);
  //   // console.log(ws);
  //   XLSX.utils.book_append_sheet(wb,ws,"Bookings");
  //   XLSX.writeFile(wb,"BookingsTable.xlsx");
  // }


  // sorting tables
  const sorting = (col) =>{
    if(order === "ASC"){
      const sorted = [...paginatedBookings].sort((a,b)=>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1:-1
      )
      setpaginatedBookings(sorted);
      setOrder("DSC")
    }
    if(order === "DSC"){
      const sorted = [...paginatedBookings].sort((a,b)=>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1:-1
      )
      setpaginatedBookings(sorted);
      setOrder("ASC")
    }
  }

  const DelBooking = async (e) => {

    const id = e.currentTarget.value;
    const token = localStorage.getItem("bike_token");

    const data = {
      booking_id: id,
    };
    const options = {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };

    await axios
      .delete(`${baseURL}/bookings/deletebooking`, {
        data,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          token: token,
        },
      })
      .then((response) => {
        console.log(response);
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
          console.log(response.data);
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
      
          axios
            .get(`${baseURL}/bookings/getallbookings`, options)
            .then((response) => {
              // console.log(response.data.data);
              setBooking(response.data.data);
              setpaginatedBookings(_(response.data.data).slice(0).take(pageSize).value());
          });
          refresh({});
          navigate("/booking");
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

    axios
      .get(`${baseURL}/bookings/getallbookings`, options)
      .then((response) => {
        // console.log(response.data.data);
        setBooking(response.data.data);
        setpaginatedBookings(_(response.data.data).slice(0).take(pageSize).value());
      });
  }, []);

  const pageCount = booking? Math.ceil(booking.length/pageSize):0;
  // if(pageCount==1)return null;
  const pages = _.range(1,pageCount+1)

  const Paginations = (pageNo) =>{
    setcurrentPage(pageNo);
    const startIndex = (pageNo - 1 )* pageSize;
    const paginatedBookingss = _(booking).slice(startIndex).take(pageSize).value();
    setpaginatedBookings(paginatedBookingss);
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
                  <h6 class="h2 text-white d-inline-block mb-0">Bookings</h6>
                  <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
                    <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                      <li class="breadcrumb-item text-white">
                        <Link to="/dashboard">
                          <i class="fa fa-home text-primary"></i>
                        </Link>
                      </li>
                      <li class="breadcrumb-item active text-white">
                        Bookings
                      </li>
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
                <div class="card-header algn">
                  <h3 class="mb-0">Bookings Table</h3>
                  <div style={{ "width": "50%", "display": "inline-flex", "align-items": "center", "justify-content": "space-evenly" }} className="algn">
                  <input type="text"
                      placeholder="search..."
                      className="form-control"
                      style={{ "width": "70%" }}
                      onChange={(e) => setSearchItem(e.target.value)}
                    />
                  <div style={{ "margin-left": "5px" }}>
                    <DownloadTableExcel
                      filename="Bookings_table"
                      sheet="Bookings"
                      currentTableRef={tableRef.current}
                    >
                     <button style={{"color": "black","background": "#9e9e9e"}}> Export excel </button>
                    </DownloadTableExcel>                  </div>
                  </div>
                </div>

                {/* <!-- Light table --> */}
                <div class="table-responsive">
                  <table
                    class="table dataTable align-items-center table-flush"
                    id="dataTableReport"
                    ref={tableRef}
                  >
                    <thead class="thead-light">
                      <tr>
                        <th class="sort" scope="col">
                          #
                        </th>
                        <th class="sort" scope="col">
                          id
                        </th>
                        <th class="sort" scope="col">
                          Service name
                        </th>
                        {/* <th class="sort" scope="col">additonal_options</th> */}
                        <th class="sorting_asc" scope="col" onClick={()=>sorting("model")}>
                          Model & brand
                        </th>
                        <th class="sorting_asc" scope="col" onClick={()=>sorting("city")}>
                          City
                        </th>
                        <th class="sort" style={{"width":"40%"}} scope="col" onClick={()=>sorting("address")}>
                          Address
                        </th>
                        <th class="sort" scope="col">
                          Description
                        </th>
                        <th class="sort" scope="col">
                          Cost
                        </th>
                        <th class="sort" scope="col">
                          User_Name
                        </th>
                        <th class="sort" scope="col">
                          User_Phone
                        </th>
                        <th class="sort" style={{"width":"40%"}} scope="col" >
                          User_address
                        </th>
                        <th class="sort" scope="col">
                          Dealer ID
                        </th>
                        <th class="sort" style={{"width":"40%"}} scope="col">
                          Dealer_Address
                        </th>
                        <th class="sort" scope="col">
                          Dealer_Phone
                        </th>
                        <th class="sorting_asc" scope="col" onClick={()=>sorting("status")}>
                          status
                        </th>
                        <th class="sort" scope="col">
                          Action
                        </th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody class="list">
                      {paginatedBookings.filter((val)=>{
                          if(searchItem === ""){
                            return val;
                          } else if(
                            val._id.includes(searchItem) ||
                            val.model.toLowerCase().includes(searchItem.toLowerCase()) ||
                            val.address.toLowerCase().includes(searchItem.toLowerCase()) ||
                            val.city.toLowerCase().includes(searchItem.toLowerCase()) ||
                            val.status.toLowerCase().includes(searchItem.toLowerCase())
                          ){
                            return val;
                          }
                        }).map((data, i) => (
                        <tr>
                          <th>{parseInt((currentPage-1)*10)+(i+1)}</th>
                          <td>{data._id}</td>
                          <td>{data.service_id?.name}</td>
                          {/* <td>{data.additonal_options}</td> */}
                          <td>{data.model + " " + data.brand}</td>
                          <td>{data.city}</td>
                          <td style={{"width":"40%"}}>{data.address}</td>
                          <td>{data.description}</td>
                          <td>{data.estimated_cost}</td>
                          <td>
                            {data.created_by?.first_name +
                              " " +
                              data.created_by?.last_name}
                          </td>
                          <td>{data.created_by?.phone}</td>
                          <td style={{"width":"40%"}}>{data.created_by?.address}</td>
                          <td>{data?.dealer_id}</td>
                          <td style={{"width":"40%"}}>{data?.dealer_address}</td>
                          <td>{data?.dealer_phone}</td>
                          {/* <td>
                            <span class="badge badge-success">
                              {data.status}
                            </span>
                          </td> */}
                          <td>
                            <span class="badge badge-success" style={data.status == "completed" ? { "color": "green" } : data.status == "pending" ? { "color": "blue", "background-color": "rgb(163 160 243)" } : { "color": "black", "background-color": "#8d02ff85" }}>
                              {data.status}
                            </span>
                          </td>
                          {/* <td><span class="badge badge-success">User{data.status}</span></td> */}
                          <td class="table-actions">
                            <button
                              value={data._id}
                              class="btn-white btn shadow-none p-0 m-0 table-action text-danger bg-white"
                              onClick={DelBooking}
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

export default Booking;