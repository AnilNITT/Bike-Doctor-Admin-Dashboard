import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../home/Footer";
import Header from "../home/Header";
import { useNavigate } from "react-router";
import axios from "axios";


const Dashboard = () => {

  const baseURL = process.env.REACT_APP_API_BASE_URL;
  
  const navigate = useNavigate();

  // const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [service, setService] = useState([]);
  const [booking, setBooking] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [offers, setOffers] = useState([]);
  const [_,refresh] = useState({})

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

    axios.get(`${baseURL}/customers/customerlist`, options).then((response) => {
      // console.log(response.data.data);
      setUsers(response.data.data);
    });

    axios.get(`${baseURL}/dealer/dealerList`, options).then((response) => {
      // console.log(response.data.data);
      setVendor(response.data.data);
    });

    axios.get(`${baseURL}/service/servicelist`, options).then((response) => {
      // console.log(response.data.data);
      setService(response.data.data);
    });

    axios
      .get(`${baseURL}/bookings/getallbookings`, options)
      .then((response) => {
        // console.log(response.data.data);
        setBooking(response.data.data);
      });

      axios
      .get(`${baseURL}/adminauth/getalladmin`, options)
      .then((response) => {
        // console.log(response.data.data);
        setAdmins(response.data.data);
      });

      axios
      .get(`${baseURL}/bike/bikeList`, options)
      .then((response) => {
        // console.log(response.data.data);
        setBikes(response.data.data);
      });

      axios
      .get(`${baseURL}/offer/offerlist`, options)
      .then((response) => {
        // console.log(response.data.data);
        setOffers(response.data.data);
      });

  // eslint-disable-next-line
  }, []);


  // useEffect(()=>{
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 100);
  // });

  return (
    <>
      <div class="main-content">
        <Header />

        {/* <!-- Top 4 cards --> */}
        <div
          class="header pt-9"
          Style="background-image: url(images/bg.jpg); background-size: cover; background-position: center center;padding-bottom: 50px;"
        >
          <span class="mask bg-gradient-dark opacity-7"></span>
          <div class="container-fluid">
            <div class="header-body mt--4 mrgns">
              <div class="row align-items-center pb-4">
                <div class="col-lg-6 col-7">
                  <h6 class="h2 text-white d-inline-block">Dashboard</h6>
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
                        Dashboard{" "}
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              {/* <!-- Card stats --> */}
              <div class="row">




                <div class="col-xl-3 col-lg-6">
                  <div class="card card-stats mb-4 mb-xl-0">
                    <div class="card-body">
                      <div class="row">
                        <div class="col">
                          <h5 class="card-title text-uppercase text-muted mb-0" style={{"font-weight": "800"}}>
                            Bookings
                          </h5>
                          <span
                            class="h2 font-weight-bold mb-0"
                            style={{ color: "#2700ff","font-size": "1.7rem" }}
                          >
                            {booking.length}
                          </span>
                        </div>
                        <div class="col-auto">
                          <div class="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i class="fa fa-shopping-bag"></i>
                          </div>
                        </div>
                      </div>
                      <p class="mt-3 mb-0 text-muted text-sm">
                        <span class="text-nowrap">Since app launch</span>
                      </p>
                    </div>
                  </div>
                </div>


                <div class="col-xl-3 col-lg-6">
                  <div class="card card-stats mb-4 mb-xl-0">
                    <div class="card-body">
                      <div class="row">
                        <div class="col">
                          <h5 class="card-title text-uppercase text-muted mb-0" style={{"font-weight": "800"}}>
                            Services
                          </h5>
                          <span
                            class="h2 font-weight-bold mb-0"
                            style={{ color: "#2700ff","font-size": "1.7rem" }}
                          >
                            {service.length}
                          </span>
                        </div>
                        <div class="col-auto">
                          <div class="icon icon-shape bg-green text-white rounded-circle shadow">
                            <i class="fas fa-list"></i>
                          </div>
                        </div>
                      </div>
                      <p class="mt-3 mb-0 text-muted text-sm">
                        <span class="text-nowrap">Since app launch</span>
                      </p>
                    </div>
                  </div>
                </div>


                <div class="col-xl-3 col-lg-6">
                  <div class="card card-stats mb-4 mb-xl-0">
                    <div class="card-body">
                      <div class="row">
                        <div class="col">
                          <h5 class="card-title text-uppercase text-muted mb-0" style={{"font-weight": "800"}}>
                            Bikes
                          </h5>
                          <span
                            class="h2 font-weight-bold mb-0"
                            style={{ color: "#2700ff","font-size": "1.7rem" }}
                          >
                            {bikes.length}
                          </span>
                        </div>
                        <div class="col-auto">
                          <div style={{ "background-color": "rgb(46 0 169)" }} class="icon icon-shape text-white rounded-circle shadow">
                            <i class="fas fa-motorcycle"></i>
                          </div>
                        </div>
                      </div>
                      <p class="mt-3 mb-0 text-muted text-sm">
                        <span class="text-nowrap">Since app launch</span>
                      </p>
                    </div>
                  </div>
                </div>


                <div class="col-xl-3 col-lg-6">
                  <div class="card card-stats mb-4 mb-xl-0">
                    <div class="card-body">
                      <div class="row">
                        <div class="col">
                          <h5 class="card-title text-uppercase text-muted mb-0" style={{"font-weight": "800"}}>
                            Offers
                          </h5>
                          <span
                            class="h2 font-weight-bold mb-0"
                            style={{ color: "#2700ff" ,"font-size": "1.7rem"}}
                          >
                            {offers.length}
                          </span>
                        </div>
                        <div class="col-auto">
                          <div style={{ "background-color": "#1cab21" }} class="icon icon-shape text-white rounded-circle shadow">
                            <i class="fas fa-gift"></i>
                          </div>
                        </div>
                      </div>
                      <p class="mt-3 mb-0 text-muted text-sm">
                        <span class="text-nowrap">Since app launch</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="col-xl-3 col-lg-6">
                  <div class="card card-stats mb-4 mb-xl-0">
                    <div class="card-body">
                      <div class="row">
                        <div class="col">
                          <h5 class="card-title text-uppercase text-muted mb-0" style={{"font-weight": "800"}}>
                            Admins
                          </h5>
                          <span
                            class="h2 font-weight-bold mb-0"
                            style={{ color: "#2700ff","font-size": "1.7rem" }}
                          >
                            {admins.length}
                          </span>
                        </div>
                        <div class="col-auto">
                          <div class="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i class="fa fa-users"></i>
                          </div>
                        </div>
                      </div>
                      <p class="mt-3 mb-0 text-muted text-sm">
                        <span class="text-nowrap">Since app launch</span>
                      </p>
                    </div>
                  </div>
                </div>


                <div class="col-xl-3 col-lg-6">
                  <div class="card card-stats mb-4 mb-xl-0">
                    <div class="card-body">
                      <div class="row">
                        <div class="col">
                          <h5 class="card-title text-uppercase text-muted mb-0" style={{"font-weight": "800"}}>
                            Customers
                          </h5>
                          <span
                            class="h2 font-weight-bold mb-0"
                            style={{ color: "#2700ff","font-size": "1.7rem" }}
                          >
                            {users.length}
                          </span>
                        </div>
                        <div class="col-auto">
                          <div  style={{ "background-color": "blue" }} class="icon icon-shape text-white rounded-circle shadow">
                            <i  class="fa fa-users"></i>
                          </div>
                        </div>
                      </div>
                      <p class="mt-3 mb-0 text-muted text-sm">
                        <span class="text-nowrap">Since app launch</span>
                      </p>
                    </div>
                  </div>
                </div>


                <div class="col-xl-3 col-lg-6">
                  <div class="card card-stats mb-4 mb-xl-0">
                    <div class="card-body">
                      <div class="row">
                        <div class="col">
                          <h5 class="card-title text-uppercase text-muted mb-0" style={{"font-weight": "800"}}>
                            Dealers
                          </h5>
                          <span
                            class="h2 font-weight-bold mb-0"
                            style={{ color: "#2700ff","font-size": "1.7rem" }}
                          >
                            {vendor.length}
                          </span>
                        </div>
                        <div class="col-auto">
                          <div style={{ "background-color": "#00a6ff" }} class="icon icon-shape text-white rounded-circle shadow">
                            <i class="fa fa-users"></i>
                          </div>
                        </div>
                      </div>
                      <p class="mt-3 mb-0 text-muted text-sm">
                        <span class="text-nowrap">Since app launch</span>
                      </p>
                    </div>
                  </div>
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


export default Dashboard;
