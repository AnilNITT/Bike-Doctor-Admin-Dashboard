import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.removeItem("bike_token");
    navigate("/login");
  }

  return (
    <>
      <form id="logout-form" action="#" method="POST" Style="display: none;">
        <input
          type="hidden"
          name="_token"
          value="oKup3nu5kd6tUBCqoFTVEMtnOOg1p3zubico9KkM"
        />
      </form>
      <nav
        class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light"
        id="sidenav-main"
        style={{
          "background-image": "url(images/bgss.jpg)",
          "background-size": "cover",
          "background-position": "center",
        }}
      >
        <div class="container-fluid">
          {/* <!-- Toggler  */}
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#sidenav-collapse-main"
            aria-controls="sidenav-main"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          {/* <!-- Brand  */}
          <Link class="navbar-brand pt-0" to="#/">
            <div className="abcdef">
              <img
                src="images/logo.png"
                class="navbar-brand-img abcde"
                alt="Admin Logo"
                width="500rem"
              />
            </div>
          </Link>

          {/* <!-- User  */}
          <ul class="nav align-items-center d-md-none">
            <li class="nav-item dropdown">
              <a
                class="nav-link"
                href="#/"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div class="media align-items-center">
                  <span class="avatar avatar-sm rounded-circle">
                    <img
                      alt="Images placeholder"
                      src="images/admin_1602487776.jpg"
                    />
                  </span>
                </div>
              </a>
              <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                <div class=" dropdown-header noti-title">
                  <h6 class="text-overflow m-0">Welcome!</h6>
                </div>

                <div class="dropdown-divider"></div>
                <Link to="/login" class="dropdown-item">
                  <i class="ni ni-user-run"></i>
                  <span>Logout</span>
                </Link>
              </div>
            </li>
          </ul>
          
          {/* <!-- Collapse  */}
          <div class="collapse navbar-collapse" id="sidenav-collapse-main">
            <ul class="navbar-nav">


              <li class="nav-item">
                <Link class="nav-link " to="/dashboard">
                  <i class="ni ni-tv-2 text-teal"></i>
                  <span class="nav-link-text">Dashboard</span>
                </Link>
              </li>


              <li class="nav-item">
                <Link class="nav-link " to="/booking">
                  <i
                    class="fa fa-shopping-bag text-black"
                    style={{ color: "purple" }}
                  ></i>
                  <span class="nav-link-text">Bookings</span>
                </Link>
              </li>


              <li class="nav-item">
                <Link class="nav-link " to="/payment">
                  <i
                    class="fa fa-money text-black"
                    style={{ color: "purple" }}
                  ></i>
                  <span class="nav-link-text">Payments</span>
                </Link>
              </li>


              <li class="nav-item">
                <Link class="nav-link " to="/admin">
                  <i class="fa fa-user-circle text-red"></i>
                  <span class="nav-link-text">Admins</span>
                </Link>
              </li>



              <li class="nav-item">
                <Link class="nav-link " to="/dealer">
                  <i class="fa fa-user-circle text-red"></i>
                  <span class="nav-link-text">Dealers</span>
                </Link>
              </li>


              <li class="nav-item">
                <Link class="nav-link" to="/customer">
                  <i class="fa fa-users" style={{ color: "red" }}></i>
                  <span class="nav-link-text">Customers</span>
                </Link>
              </li>


              <li class="nav-item">
                <Link class="nav-link " to="/service">
                  <i
                    class="fa fa-tasks text-black"
                    style={{ color: "black" }}
                  ></i>
                  <span class="nav-link-text">Services</span>
                </Link>
              </li>


              <li class="nav-item">
                <Link class="nav-link " to="/servicefeature">
                  <i
                    class="fa fa-tasks text-black"
                    style={{ color: "black" }}
                  ></i>
                  <span class="nav-link-text">Service Features</span>
                </Link>
              </li>


              <li class="nav-item">
                <Link class="nav-link " to="/servicesalientfeature">
                  <i
                    class="fa fa-tasks text-black"
                    style={{ color: "black" }}
                  ></i>
                  <span class="nav-link-text">Service Salient Feature</span>
                </Link>
              </li>


              <li class="nav-item">
                <Link class="nav-link " to="/banner">
                  <i
                    class="fa fa-clipboard text-black"
                    style={{ color: "#78b305" }}
                  ></i>
                  <span class="nav-link-text">Banners</span>
                </Link>
              </li>


              <li class="nav-item">
                <Link class="nav-link " to="/bike">
                  <i
                    class="fa fa-motorcycle text-black"
                    style={{ color: "rgb(56 0 0)" }}
                  ></i>
                  <span class="nav-link-text">Bikes</span>
                </Link>
              </li>


              <li class="nav-item">
                <Link class="nav-link " to="/service_additional_problems">
                  <i
                    class="fa fa-exclamation-triangle text"
                    style={{ color: "crimson" }}
                  ></i>
                  <span class="nav-link-text">Additional Problems</span>
                </Link>
              </li>


              <li class="nav-item">
                <Link class="nav-link" to="/offer">
                  <i class="fa fa-gift text-green"></i>
                  <span class="nav-link-text">Offers</span>
                </Link>
              </li>


              <li class="nav-item" style={{"padding-bottom":"1rem"}}>
                <div class="nav-link ">
                  <i class="fa fa-power-off text-black" ></i>
                  <span class="nav-link-text" style={{"cursor":"pointer"}} onClick={logout}>LogOut</span>
                </div>
              </li>

              
            </ul>
          </div>

        </div>
      </nav>
    </>
  );
};

export default Sidebar;
