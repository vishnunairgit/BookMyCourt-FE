import React, { useState } from "react";
import "../login/login.css";
// import loginimage from "../login/assets/geely-vision-car-ads-psd.jpg";
import {
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBCardBody,
} from "mdb-react-ui-kit";
import axios from "axios";
import { BASE_URL } from "../../constants/Constant";
import { useNavigate } from "react-router-dom";
import { toastError, toastSucces } from "../../constants/plugines";
import { useDispatch, useSelector } from "react-redux";
import { setuserDetails, setuserRoll } from "../../../ToolKit/userSlic";

// login data
const Login = ({ setloginsignup }) => {



  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

// redux function calling
  const {userDetails ,userRole}=useSelector ((state)=>state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch()


  // calling signup settails to login page
  const handilSignUp = () => {
    setloginsignup("signup");
  };

  // login credintionls checking
  const handlelogin = () => {
    try {
      if (email && password) {
        axios
          .post(`${BASE_URL}/auth/login`, { email, password })
          .then((res) => {
            if (
              res.data.message === "Authentication successful" &&
              res.data.token
            ) {
              // once we closed the screen undil clear the tocken will valid and we ll move to home page
              //  now the tocken is stored to the localstorage
              localStorage.setItem("token", res.data.token);
              // here we are adding JWT token to the "parseToken"
              const parseToken = parseJwt(res.data.token);
              // storing user dettails to local storagfe / we need to stor  it  asa string.
              localStorage.setItem('user',JSON.stringify(parseToken))
              dispatch(setuserDetails(parseToken))
              console.log(parseToken);
              navigate("./home");
              toastSucces("login succes");
            }
            if (res.data.message === "Invalid user credentials")
              toastError("Invalid credentials");
            {
              // alert('Invalid credentials')
            }
            debugger;
          });
      }
      // else  {
      //   alert('user credentials not fount')
      // }
    } catch (error) {}
  };
  //

  // jwt token decoding function- storing the user data to local storage
  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  const updateUserRoll=()=>{
    dispatch(setuserRoll(123))
  }




  return (
    <div className="Login">
      {/* <MDBContainer className="my-5 login-main"> */}
      {/* <MDBCard> */}
      {/* <MDBRow className="g-0"> */}

      <MDBCol md="6">
        <MDBCardBody className="d-flex flex-column">
          <div className="d-flex flex-row mt-2">
            <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: "#ff6219" }} />
            <span className="h1 fw-bold mb-0">Logo</span>
          </div>

          <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: "1px" }}>
            Sign into your account
          </h5>

          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="formControlLg"
            type="email"
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="formControlLg"
            type="password"
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <MDBBtn
            className="mb-4 px-5"
            color="dark"
            size="lg"
            onClick={handlelogin}>
            {/* onClick{handlelogin} */}
            Login
          </MDBBtn>
          <a className="small text-muted" href="#!">
            Forgot password?
          </a>
          <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
            Don't have an account?{" "}
            <span style={{ color: "#393f81" }} onClick={() => handilSignUp()}>
              Register here
            </span>
          </p>

          <div className="d-flex flex-row justify-content-start">
            <a href="#!" className="small text-muted me-1">
              Terms of use.
            </a>
            <a href="#!" className="small text-muted">
              Privacy policy
            </a>
          </div>
        </MDBCardBody>
        {/* <button onClick={updateUserRoll}>value:{userDetails.name},{userRole}</button> */}
      </MDBCol>

  
    </div>
  );
};

export default Login;
