import React, { useEffect, useState } from "react";
import AxiosInstance from "../../config/AxiosInstance";
import MyBooingCards from "../../myBookingCards/MyBooingCards";
import Navbar from "../../Common/Navbar/Navbar";

function MyBookings() {
  const [MyBookings, setMyBookings] = useState([]);

  useEffect(() => {
    getMyBookingData();
  },[]);

  const getMyBookingData = () => {
    try {
      AxiosInstance.get("users/getMyBookingData").then((res) => {
        // debugger;
        setMyBookings(res.data);
      });
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <>
<Navbar/>
    {MyBookings.map((MyBookings)=><MyBooingCards bookingdata={MyBookings}/> )}
           
    </>
  );
}

export default MyBookings;
