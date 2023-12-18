import React, { useState } from "react";
import '../pages/landing.css';
import loginimage from "../pages/assets/fifteen-turf-thane-balkum-thane-cricket-turf-grounds-g2qg8bfasx.jpg";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
} from "mdb-react-ui-kit";
import Login from "../LandingPage/login/Login";
import SignUp from "../LandingPage/signup/SignUp";

const Landing = () => {
    const [loginsignup, setloginsignup] = useState('login')


  return (
    <div className="Landing">
      <MDBContainer className="my-5 login-main">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardImage
                src={loginimage}
                alt="login form"
                className="rounded-start w-100 "
              />
            </MDBCol>
            <MDBCol md="6">
            { loginsignup ==='login' &&  <Login setloginsignup={setloginsignup}/> }
            { loginsignup === 'signup' &&  <SignUp setloginsignup={setloginsignup}/> }
            

            </MDBCol>
          </MDBRow>


        </MDBCard>
      </MDBContainer>
    </div>
  );
};

// export default App;

// )}

export default Landing;
