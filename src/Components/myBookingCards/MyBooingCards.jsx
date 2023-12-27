import React from 'react'
// import myBookingCard from "../pages/assets/fifteen-turf-thane-balkum-thane-cricket-turf-grounds-g2qg8bfasx.jpg";
import { BASE_URL } from '../constants/Constant';


function MyBooingCards({bookingdata}) {
  return (
    <div>
          <div className="card" style={{ width: "18rem" }}>
          <img src={`${BASE_URL}/Courts/${bookingdata?.courtData?.courtPic}`} alt="..." />
          <div className="card-body">
            <h5 className="card-title">{bookingdata?.courtData?.CourtName}</h5>
            <p className="card-text">
            <div>{bookingdata.courtData.address}</div> 
            </p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{bookingdata?.courtData?.location}</li>
            <li className="list-group-item">{bookingdata?.courtData?.type}</li>
            <li className="list-group-item"> {new Date(bookingdata.date).toLocaleDateString()} </li>
            <li className="list-group-item"> {bookingdata?.slot?.name} </li>

          </ul>
          <div className="card-body">
            
          </div>
        </div>
    </div>
  )
}

export default MyBooingCards
