// import React from "react";
// import { logDOM } from "@testing-library/react";
// import { useAsyncError } from "react-router-dom";
import axios from "axios";
import "../signup/signup.css";
import React, { useEffect, useState } from 'react';
import { BASE_URL } from "../../constants/Constant";


const SignUp = ({ setloginsignup }) => {
  // console.log('-----data-----')
  const handilLogin = () => {
    setloginsignup("login")
  }

  const [signupData, setsignupData] = useState
    (
      {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        comfirmPassword: '',
      }
    )


  {/*  to check the signup valus are working or not  > */ }

  // const [state,setstate]=useState()
  // useEffect(()=>{
  //   console.log(signupData);
  // },[signupData])

  {/*  ones we are usng the form componet. then we can use the state  > */ }

  // const test=(e)=>{
  //   e.preventDefault()
  // }

  {/*  signupregister */ }

  const handilRegister = () => {
    try {
      axios.post(`${BASE_URL}/auth/signup`, signupData)
        .then((res) => {
          if (res.data.message === "Sign up success")
            {setloginsignup("login")
        }

        if (res.data.message === "email already exists")
        { alert('email alredy exsist')}
    
          console.log(res);
          debugger
        })
    } catch (error) {
    }
  }

  return (
    <div className="signup">

      {/* <form method='post' action="/signup" > */}
      {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
      <div className="row mb-4">
        <div className="col">
          <div className="form-outline">
            <input type="text" value={signupData.firstName} onChange={(e) => { setsignupData({ ...signupData, firstName: e.target.value }) }} id="form3Example1" className="form-control" />
            <label className="form-label" htmlFor="form3Example1">
              First name
            </label>
          </div>
        </div>
        <div className="col">
          <div className="form-outline">
            <input type="text" value={signupData.lastName} onChange={(e) => { setsignupData({ ...signupData, lastName: e.target.value }) }} id="form3Example2" className="form-control" />
            <label className="form-label" htmlFor="form3Example2">
              Last name
            </label>
          </div>
        </div>
      </div>

      {/* <!-- Email input --> */}
      <div className="form-outline mb-4">
        <input type="email" value={signupData.email} onChange={(e) => { setsignupData({ ...signupData, email: e.target.value }) }} id="form3Example3" className="form-control" />
        <label className="form-label" htmlFor="form3Example3">
          Email address
        </label>
      </div>

      {/* <!-- Password input --> */}
      <div className="form-outline mb-4">
        <input type="password" value={signupData.password} onChange={(e) => { setsignupData({ ...signupData, password: e.target.value }) }} on id="form3Example4" className="form-control" />
        <label className="form-label" htmlFor="form3Example4">
          Password
        </label>
      </div>
      <div className="form-outline mb-4">
        <input type="password" value={signupData.comfirmPassword} onChange={(e) => { setsignupData({ ...signupData, comfirmPassword: e.target.value }) }} id="form3Example4" className="form-control" />
        <label className="form-label" htmlFor="form3Example4">
          confirm  Password
        </label>
      </div>

      {/* / <!-- Checkbox --> */}
      <div className="form-check d-flex justify-content-center mb-4">
        <input
          className="form-check-input me-2"
          type="checkbox"
          value=""
          id="form2Example33"
          checked
        />
        <label className="form-check-label" htmlFor="form2Example33">
          Subscribe to our newsletter
        </label>
      </div>

      {/* <!-- Submit button --> */}
      <div className="submitBTM">
        <button type="submit" className="btn btn-primary btn-block mb-4 " onClick={handilRegister} >
          {/*         <button type="submit" className="btn btn-primary btn-block mb-4 "  onClick={test} >
 */}
          Sign up
        </button>

      </div>

      <div>
        <span onClick={() => handilLogin()}>i am already a member</span>
        {/* <span>i am already a member</span> */}
      </div>

      {/* <!-- Register buttons --> */}
      {/* <div class="text-center">
          <p>or sign up with:</p>
          <button type="button" class="btn btn-secondary btn-floating mx-1">
            <i class="fab fa-facebook-f"></i>
          </button>

          <button type="button" class="btn btn-secondary btn-floating mx-1">
            <i class="fab fa-google"></i>
          </button>

          <button type="button" class="btn btn-secondary btn-floating mx-1">
            <i class="fab fa-twitter"></i>
          </button>

          <button type="button" class="btn btn-secondary btn-floating mx-1">
            <i class="fab fa-github"></i>
          </button>
        </div> */}
      {/* </form> */}
    </div>
  );
};

export default SignUp;
