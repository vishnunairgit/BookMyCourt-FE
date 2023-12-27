import React  from "react";
import { BASE_URL } from "../../constants/Constant";
import { useNavigate } from "react-router-dom";
import '../cards/cards.css'



function Cards({ data }) {
  const navigate = useNavigate();

  const handleNavigationViewCourt = () => {
    navigate(`/CourtUserViewPage/${data._id}`);
  };

  
  const editCourtDetails = () => {
    navigate(`/EditCourt/${data._id}`);
  }


  return (
    <>
    <div>
    

    </div>

      <div
        className=" row row-cols-2 row-cols-md-3 g-4"
        >
        <div className="card mb-4 " style={{ maxWidth: "540px" }}>
          <div className="row g-0-" 
          onClick={handleNavigationViewCourt}>
            <div className="col-md-4">
              <img
                src={`${BASE_URL}/Courts/${data?.courtPic}`}
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Court Name:{data?.CourtName}</h5>
                <p className="card-text"> Location: {data?.location}</p>
                <p className="card-text"> Address: {data?.address}</p>
                <p className="card-text"> Type Of Court: {data?.type}</p>
                <p className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
          </div>
          {  <div className="Courtviewfooter">
            <button type="button" class="btn btn-dark" onClick={editCourtDetails}>EDIT</button>

            <button type="button" class="btn btn-dark">DELETE</button>
          </div>}
        </div>
      </div>
    </>
  );
}

export default Cards;
