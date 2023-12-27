import React, { useEffect, useState } from "react"
import "./editCourt.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AxiosInstance from "../../config/AxiosInstance";
import { setcourtDetails } from "../../../ToolKit/courtSlic";


function EditCourt({}) {




  // for edit the court dettails we can do 2 way.  
      // 1 -- call the api here, the bwllow code
      // 2-- calling court dettails throught redux
      
        // 1 -- call the api here, the bwllow code

      // const {courtId }=useParams()

      // useEffect(()=>{
      //   getSingleCourtData()

      // },[])
      // function getSingleCourtData() {
      //   AxiosInstance.get("users/getSingleCourtData", { params: { courtId: courtId } })
      //     .then((res) => {
      //       debugger
      //       // setsingleCourtData(res.data);
      //       seteditCourtData(res.data);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //       // toastError("somthing went worng");
      //     });
      // }

  // const [editCourtData, seteditCourtData] = useState()

    // 2-- calling court dettails throught redux




 const  {courtDetails} =useSelector ((state)=>state.court)
//  console.log(courtDetails,"---------------");
  // const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleCourtEdit=(e)=>{
    const {name,value}=e.target;
    dispatch(setcourtDetails ({...courtDetails,[name]:value}) )
    // setcourtDetails({...courtDetails,[e.target.name]: e.target.value})
  }

  




  return (
    <div className="editcourt">
      {/* <form> */}
      <div className="container">
        <div className="leftSide-container">
          <h2>EDIT COURT</h2>

          <div className="Tree-thumbnail"></div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="name">
                COURT NAME <span className="mandatory-indicator">*</span>
              </label>
            </div>

            <div className="col-75">
              <input
                type="text"
                id="Court Name"
                placeholder="Court Name..."
                name="CourtName"

                onChange={handleCourtEdit}
                required
                 value={courtDetails?.CourtName}
                // value={editCourtData?.CourtName}

                />
              <span> </span>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="accession-name">
                LOCATION <span className="mandatory-indicator">*</span>
              </label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Location.."
                value={courtDetails?.location}
                // value={editCourtData?.location}

                onChange={handleCourtEdit}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="accession-number">
                ADDRESS<span className="mandatory-indicator">*</span>
              </label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Address.."
                value={courtDetails?.address}
                // value={editCourtData?.address}

                onChange={handleCourtEdit}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="scientific-name">TYPE</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="type"
                name="type"
                placeholder="Type Of Court.."
                value={courtDetails?.type}
                // value={editCourtData?.type}
                onChange={handleCourtEdit}
              />
            </div>
          </div>
        </div>
        <div className="rightSide-container">
          <div className="rightSide-container-2">
            <div className="text">
              <h4>UPLOAD FILES</h4>
            </div>
            <div className="fileupload">
              <label htmlFor="imageUpload">SELECT AN IMAGES</label>
              <input
                type="file"
                id="imageUpload"
                name="CourtimageUpload"
                accept="image/*"
                // onChange={CourtOnChangeImage}
                multiple
              />
              <br />
              {/* {selectedimage && (
                <img
                  src={selectedimage}
                  alt=""
                  width={"250px"}
                  height={"250px"}
                />
              )} */}

              <br />
            </div>
          </div>
        </div>
      </div>

      <div className="buttonHolder">
        {/* <span><h3></h3></span> */}
        <button
          //   onClick={addCourtData}
          className="button-17"
          type="submit"
          style={{ backgroundColor: "rgb(10, 150, 250)", color: "white" }}>
          Submit
        </button>
        <button
          className="button-17"
          // onClick={handleReset}
          style={{ backgroundColor: "rgb(0, 150, 0)", color: "white" }}>
          Reset
        </button>
        <button
          className="button-17"
          // onClick={handleCancel}
          style={{ backgroundColor: "rgb(200, 0, 0)", color: "white" }}>
          Cancel
        </button>
      </div>
      {/* </form> */}
    </div>
  );
}

export default EditCourt;
