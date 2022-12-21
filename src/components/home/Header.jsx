import React from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("bike_token");
    navigate("/login");
  }

  return (
    <nav class="navbar navbar-top navbar-expand navbar-dark">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {/* <!-- Navbar links  */}
          <ul class="navbar-nav align-items-center ml-md-auto ">
            <li class="nav-item d-xl-none">
              {/* <!-- Sidenav toggler  */}
              <div
                class="pr-3 sidenav-toggler sidenav-toggler-dark"
                data-action="sidenav-pin"
                data-target="#sidenav-main"
              >
                <div class="sidenav-toggler-inner">
                  <i class="sidenav-toggler-line"></i>
                  <i class="sidenav-toggler-line"></i>
                  <i class="sidenav-toggler-line"></i>
                </div>
              </div>
            </li>

            <li class="nav-item d-sm-none">
              <a
                class="nav-link"
                href="#"
                data-action="search-show"
                data-target="#navbar-search-main"
              >
                <i class="ni ni-zoom-split-in"></i>
              </a>
            </li>
          </ul>

          <ul class="navbar-nav align-items-center ml-auto ml-md-0 ">
            <li class="nav-item dropdown">
              <a
                class="nav-link pr-0"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ "background-color": "transparent" }}
              >
                <div class="media align-items-center">
                  <span class="avatar avatar-sm rounded-circle rtl-avatar">
                    <img
                      class="small_round"
                      src="images/admin_1602487776.jpg"
                    />
                  </span>
                  <div class="media-body  ml-2  d-none d-lg-block">
                    <span class="mb-0 text-sm  font-weight-bold"> Admin </span>
                  </div>
                </div>
              </a>

              <div class="dropdown-menu  dropdown-menu-right ">
                <div class="dropdown-header noti-title">
                  <h6 class="text-overflow m-0">Welcome to Bike Doctor!</h6>
                </div>

                <div class="dropdown-divider"></div>
                <div to="/login" class="dropdown-item">
                  <i class="ni ni-button-power"></i>
                  <span style={{ "cursor": "pointer" }} onClick={logout}>Logout</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
