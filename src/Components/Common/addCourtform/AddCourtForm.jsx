import React from "react";
import "../addCourtform/addnewcourtform.css";
import { useState } from "react";
import AxiosInstance from "../../config/AxiosInstance";
import { toastError, toastSucces } from "../../constants/plugines";
import { useNavigate } from "react-router-dom";
// import Home from "../../pages/home/Home";

function AddCourtForm() {
  const [CourtFormValu, setCourtFormValu] = useState({
    CourtName: "",
    location: "",
    address: "",
    type: "",
  });


  const navigate = useNavigate();
  // file uploading
  const [selectedimage, setselectedimage] = useState("");
  const [CourtimageUpload, setCourtimageUpload] = useState(null);

  const CourtOnChange = (e) => {
    // debugger;
    setCourtFormValu({ ...CourtFormValu, [e.target.name]: e.target.value });

    // if (e.target.name === "CourtimageUpload" && e.target.files.length > 0) {
    // if (e.target.name==='CourtimageUpload' )

    // setselectedimage(URL.createObjectURL(e.target.files[0]));
    // e.target.files[0] ? setselectedimage(URL?.createObjectURL(e.target.files[0])?? null):setselectedimage(null)
  };
  // };

  const CourtOnChangeImage = (e) => {
    setCourtimageUpload(e.target.files[0]);
    setselectedimage(URL.createObjectURL(e.target.files[0]));
    // e.target.files[0] ? setselectedimage(URL?.createObjectURL(e.target.files[0])?? null):setselectedimage(null)
  };

  // calling axios/ addCourt data
  const addCourtData = () => {
    console.log(CourtimageUpload);
    // we cant sent filedata(imag/vido) to the B-E. we need to convert FormData
    let fileData = new FormData();
    fileData.append("image", CourtimageUpload);

    AxiosInstance.post(
      "/admin/addCourtData",
      fileData,
      { params: CourtFormValu },
      { headers: { "Content-Type": "multhipart/form-data" } }
    ).then((Response) => {
      toastSucces('new court added')
      navigate('/home')
    })
    .catch((err)=>{
      toastError('something went worng')
    })
    
  };

  return (
    <div className="addtree">
      {/* <form> */}
        <div className="container">
          <div className="leftSide-container">
            <h2>ADD COURT</h2>
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
                  name="CourtName"
                  placeholder="Court Name..."
                  onChange={CourtOnChange}
                  required
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
                  onChange={CourtOnChange}
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
                  onChange={CourtOnChange}
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
                  onChange={CourtOnChange}
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
                  onChange={CourtOnChangeImage}
                  multiple
                />
                <br />
                {selectedimage && (
                  <img
                    src={selectedimage}
                    alt=""
                    width={"250px"}
                    height={"250px"}
                  />
                )}

             
                <br />
              </div>
            </div>
          </div>
        </div>

        <div className="buttonHolder">
          {/* <span><h3></h3></span> */}
          <button
            onClick={addCourtData}
            className="button-17"
            type="submit"
            style={{ backgroundColor: "rgb(10, 150, 250)", color: "white" }} >
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

export default AddCourtForm;
