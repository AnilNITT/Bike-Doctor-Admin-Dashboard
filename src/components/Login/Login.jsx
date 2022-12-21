import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const Login = () => {
  
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [_,refresh] = useState({})

  // console.log("token",token);

  const data = {
    email: loginEmail,
    password: loginPassword,
    // token:token
  };
  function loginSubmit(e) {
    e.preventDefault();

    const options = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        token: token,
      },
    };

    axios
      .post(`${baseURL}/adminauth/suadminlogin`, data, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          token: token,
        },
      })
      .then((response) => {
        if (response.data.status) {
          Toastify({
            text: response.data.message,
            className: "info",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
              size: 10,
            },
            close: true,
          }).showToast();
        } else {
          localStorage.setItem("bike_token", response.data.response.token);
          navigate("/");
        }
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("bike_token");
    if(token){
      navigate("/")
    }
    axios.get(`${baseURL}/tokenGenrate/jwtToken`).then((response) => {
      setToken(response.data.token);
    });
  }, []);



  return (
    <body class="login" style={{ height: "635px", background: "#bbbbbb" ,"background-image": "url(images/bg.jpg)" ,"background-size": "cover", "background-position": "center"}}>
      <section class="main-area">
        <div class="container-fluid">
          <div class="col-md-6 p-0">
            <div class="login" style={{ "padding-top": "5rem" }}>
              <div class="center-box">
                <div class="logo" style={{ "text-align": "center" }}>
                  <div className="bgd">
                  <img
                    src="images/logo.png"
                    class="logo-img"
                    style={{ width: "150px"}}
                    alt="#"
                  />
                  </div>
                </div>
                <div
                  class="title ttle"
                >
                  <h4 class="login_head" style={{"color": "#00bcd4","margin-top": "0.2rem"}}>Admin Login</h4>
                  {/* <p class="login-para">This is a secure system and you will need to provide your <br/>
                                    login details to access the site.</p> */}
                </div>
                <div class="form-wrap" style={{ width: "40%", margin: "auto" }}>
                  <form
                    role="form"
                    class="pui-form"
                    id="loginform"
                    method="POST"
                    onSubmit={loginSubmit}
                  >
                    <input
                      type="hidden"
                      name="_token"
                      value="oKup3nu5kd6tUBCqoFTVEMtnOOg1p3zubico9KkM"
                    />
                    

                    <div class="pui-form__element">
                      <label class="animated-label " style={{"color": "#ff6a00"}} >Email</label>
                      <input
                        id="inputEmail"
                        name="email"
                        type="email"
                        class="form-control"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="Enter Email"
                        required
                      />
                    </div>


                    <div class="pui-form__element">
                      <label class="animated-label" style={{"color": "#ff6a00"}} >Password</label>
                      <input
                        id="inputPassword"
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        class="form-control "
                        name="password"
                        placeholder="Enter Password"
                        required
                      />
                    </div>


                    <div
                      class="pui-form__element"
                      style={{ "padding-top": "2rem" }}
                    >
                      <button
                        class="btn btn-lg btn-primary btn-block btn-salon"
                        type="submit"
                      >
                        SIGN IN
                      </button>
                    </div>


                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </body>
  );
};

export default Login;