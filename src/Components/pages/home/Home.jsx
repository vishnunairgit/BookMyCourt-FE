import React, { useEffect, useState } from "react";
import "./home.css";
import Navbar from "../../Common/Navbar/Navbar";
import AxiosInstance from "../../config/AxiosInstance";
// import { Card } from "react-bootstrap";
import Cards from "../../Common/cards/Cards";
import { useNavigate } from "react-router-dom";




function Home() {

const [courtData, setcourtData] = useState([]);
const navigate = useNavigate();


  useEffect(() => {
    getAllCourtData();
  }, []);

  // const getAllCourtData = () => {
  //   AxiosInstance.get("/users/getAllCourtData")
  //     .then((Response) => {
  //       setcourtData(Response.data);
  //       // debugger;
  //     })
  //     .catch((err) => {
  //     // debugger
  //       if (err.response.data.message === 'unauthorized user')
  //       {
  //         localStorage.clear(() => navigate("/"));
  //       }
        
  //     });
  // };
  const getAllCourtData = () => {
    AxiosInstance.get("/users/getAllCourtData")
      .then((Response) => {
        setcourtData(Response.data);
      })
      .catch((err) => {
        // debugger
        if (err.response.data.message === 'unauthorized user') {
          localStorage.clear(() => navigate("/"));
          // debugger
        }
      });
  };



  return (
    <>
      <Navbar/>
      {courtData.map((court) => (
        <Cards data ={court} />
      ))}

      <div>
        <Cards />
      </div>
    </>
  );
}

export default Home;
