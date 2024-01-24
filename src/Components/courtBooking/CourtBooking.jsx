import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AxiosInstance from "../config/AxiosInstance";
import { BASE_URL } from "../constants/Constant";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { TIMING } from "../constants/Constant";
import "./courtbooking.css";
import { toastError, toastSucces } from "../constants/plugines";
import { useDispatch, useSelector } from "react-redux";
import { setcourtDetails } from "../../ToolKit/courtSlic";
// import axios from "axios";

function CourtBooking() {
  const { id } = useParams();
  const [singleCourtData, setsingleCourtData] = useState({});
  const [timeSlotDate, settimeSlotDate] = useState({
    startDate: " ",
    endDate: " ",
    cost: " ",
  });
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  // add Time slot modal only for admin
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // editmodal
  const [editshow, seteditShow] = useState(false);
  const edithandleClose = () => seteditShow(false);
  const edithandleShow = () => seteditShow(true);
  const [editCourtData, seteditCourtData] = useState({});

  // booking dettails modal for user
  const [usershow, setusershow] = useState(false);
  const userHandleClose = () => setusershow(false);
  const userHandleShow = () => setusershow(true);

  const [SelectedSlots, setSelectedSlots] = useState();

  const [selectedTime, setselectedTime] = useState([]);
  const [filterTiming, setfilterTiming] = useState(TIMING);
  const [slotData, setslotData] = useState([]);
  const [inputDate, setinputDate] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    getSingleCourtData();
    getTimeSloutData(new Date());
  }, []);

  useEffect(() => {
    getLatestFilterSlots();
  }, [selectedTime]);

  function getSingleCourtData() {
    AxiosInstance.get("users/getSingleCourtData", { params: { courtId: id } })
      .then((res) => {
        setShow(false);
        setsingleCourtData(res.data);
        seteditCourtData(res.data);
        debugger;
        dispatch(setcourtDetails(res.data));
      })
      .catch((err) => {
        console.log(err);
        toastError("somthing went worng");
      });
  }

  // const handledatechange = (e) => {
  //   settimeSlotDate({ ...timeSlotDate, [e.target.name]: e.target.value });
  // };

  // const handleTimeSlotChange = (e) => {
  //   const selectedSlot = e.target.value;
  //   if (!selectedTimeSlots.includes(selectedSlot)) {
  //     setSelectedTimeSlots([...selectedTimeSlots, selectedSlot]);
  //   }
  // };

  // // Filter time slots to exclude the selected ones
  // const availableTimeSlots = timeSlots.filter(
  //   (slot) => !selectedTimeSlots.includes(slot.value)
  // );

  const getLatestFilterSlots = () => {
    if (selectedTime.length === 0) {
      setfilterTiming(TIMING);
    } else {
      const tempArray = [];
      for (let slot of TIMING) {
        let flag = false;
        for (let selectedSlot of selectedTime) {
          if (slot.id === selectedSlot.id) {
            // debugger;
            flag = true;
          }
        }
        if (!flag) {
          tempArray.push(slot);
        }
      }
      setfilterTiming(tempArray);
    }
  };

  // const handilCreateTimeSlot = () => {
  //   try {
  //     AxiosInstance.post('/admin/addTimeSlotData',{
  //       ...timeSlotDate,
  //       selectedTime, courtId:id
  //     }).then((res) => {

  //       // Validation check after the Axios request completes
  //     if (!timeSlotDate.startDate || !timeSlotDate.endDate || !timeSlotDate.cost || selectedTime.length === 0) {
  //       // Display an error message or take appropriate action
  //       alert("Please fill out all required fields.");
  //       return;
  //     }
  //       toastSucces('court slouts added successfully')

  //     });

  //   } catch (error) {
  //     console.error('Error in Axios request:', error);

  //   }
  //   if (!timeSlotDate.startDate || !timeSlotDate.endDate || !timeSlotDate.cost || selectedTime.length === 0) {
  //     // Display an error message or take appropriate action
  //     alert("Please fill out all required fields.");
  //     return;
  //   }
  // };

  // const handleChange = (e) => {
  //   settimeSlotDate({ ...timeSlotDate, [e.target.name]: e.target.value });
  //   console.log(timeSlotDate);
  //   const { name, value } = e.target;
  //
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if the end date is being updated and if it is earlier than the start date
    if (name === "endDate" && value < timeSlotDate.startDate) {
      alert("End date cannot be earlier than start date");
    } else {
      // Update the state
      settimeSlotDate({ ...timeSlotDate, [name]: value });
      console.log(timeSlotDate);
    }
  };

  const handilCreateTimeSlot = () => {
    try {
      if (
        !timeSlotDate.startDate ||
        !timeSlotDate.endDate ||
        !timeSlotDate.cost ||
        selectedTime.length === 0
      ) {
        // Display an error message or take appropriate action
        alert("Please fill out all required fields.");
        return;
      }
      AxiosInstance.post("/admin/addTimeSlotData", {
        ...timeSlotDate,
        selectedTime,
        courtId: id,
      }).then((res) => {
        // Validation check after the Axios request completes
        toastSucces("court slouts added successfully");
      });
    } catch (error) {
      console.error("Error in Axios request:", error);
    }
  };

  const { userDetails } = useSelector((state) => state.user);

  const getTimeSloutData = (date = new Date()) => {
    // console.log("-----Court ID---------:", id); // Add this line for debugging
    // console.log(date, "-----date-----");
    AxiosInstance.get("/users/dayWiseTimeSlout", {
      params: { courtId: id, date: date },
    })
      .then((res) => {
        console.log(res.data, "---------"); // Log the fetched data to the console
        setslotData(res.data);
        // debugger;
      })
      .catch((err) => {
        console.error("Error fetching time slot data:", err);

        // debugger;
      });
  };

  const inititeBooking = async () => {
    // async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await AxiosInstance.post("/payment/orders", {
      slotId: SelectedSlots._id,
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_PDgtn0gQI671ND", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "nair_my_court.",
      description: "Test Transaction",
      // image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          slotId: SelectedSlots._id,
        };

        const result = await AxiosInstance.post("/payment/success", data);

        toastSucces("Booking Success");
        setusershow(false);
        window.location.href = '/home'
        //  Optionally, you can wait for a few seconds before reloading the page

        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000);
        // Reload after 3 seconds (adjust the time as needed)

        // alert(result.data.msg);
      },
      prefill: {
        name: "nair",
        email: "infovishnunair@gmail.com",
        contact: "9999999999",
      },
      notes: {
        address: "nair bangalour ",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  const handleEditData = (e) => {
    seteditCourtData({ ...editCourtData, [e.target.name]: e.target.value });
  };

  const updateEditCourtData = () => {
    try {
      AxiosInstance.post("/admin/updateEditCourtData", editCourtData).then(
        (res) => {
          debugger;
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <img
          src={`${BASE_URL}/Courts/${singleCourtData?.courtPic}`}
          className="img-fluid Courtdemy"
          alt="Responsive image"
        />
        <div className="courtname_addtimeslot">
          <div>
            <h2>Court Name: {singleCourtData?.CourtName}</h2>
          </div>

          {/* admin addcourt modal */}
          <div>
            {userDetails.role === 1 && (
              <Button variant="primary" onClick={handleShow}>
                Add Time Slot
              </Button>
            )}

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {singleCourtData?.CourtName} {singleCourtData?.location}
                </Modal.Title>
              </Modal.Header>
              <form onSubmit={handilCreateTimeSlot}>
                <div className="modalstyl">
                  <label htmlFor="">starting date</label>
                  <input
                    type="date"
                    value={timeSlotDate?.startDate}
                    name="startDate"
                    onChange={handleChange}
                    required
                  />{" "}
                  <br />
                  <label htmlFor="">ending date</label>
                  <input
                    type="date"
                    // min={timeSlotDate?.startDate} if i use min then i am not able to select the less than off end date
                    value={timeSlotDate?.endDate}
                    name="endDate"
                    onChange={handleChange}
                    required
                  />{" "}
                  <span className="validation-message">.</span>
                  <br />
                  {/* <div> */}
                  <label htmlFor="cost">cost:</label>
                  <input
                    type="number"
                    value={timeSlotDate?.cost}
                    name="cost"
                    onChange={handleChange}
                    required
                  />
                  <div className="timedroupdown">
                    <div>
                      <Dropdown className="">
                        <Dropdown.Toggle
                          variant="secondary"
                          id="dropdown-basic">
                          Select Time Slot
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {filterTiming.map((element, index) => (
                            <Dropdown.Item
                              key={index}
                              href="#"
                              onClick={() =>
                                setselectedTime([...selectedTime, element])
                              }>
                              {element.name}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>

                    <div>
                      {selectedTime?.length > 0 ? (
                        selectedTime.map((element, index) => (
                          // You were missing a 'return' statement here
                          <li>
                            <span key={index}>{element.name}</span>
                          </li>
                          //  <span key={index}>{element.name}</span>
                        ))
                      ) : (
                        <i>no time slot selected</i>
                      )}
                    </div>
                  </div>
                </div>

                <Modal.Body>
                  Woohoo, you are reading this text in a modal!
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <button className="btn-primary"> submit</button>
                  {/* <button onClick={handleClose}> * </button> */}
                </Modal.Footer>
              </form>
            </Modal>
          </div>

          {/* admin court edit  */}

          <div>
            {userDetails.role === 1 && (
              <Button variant="primary" onClick={edithandleShow}>
                EDIT
              </Button>
            )}

            <Modal show={editshow} onHide={edithandleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  EDIT COURT
                  {/* {singleCourtData?.CourtName} {singleCourtData?.location} */}
                </Modal.Title>
              </Modal.Header>
              <form>
                <div className="editcourt">
                  {/* <form> */}
                  <div className="container">
                    <div className="leftSide-container">
                      {/* <h2>ADD COURT</h2> */}

                      <div className="Tree-thumbnail"></div>

                      <div className="row">
                        <div className="col-25">
                          <label htmlFor="name">
                            COURT NAME{" "}
                            <span className="mandatory-indicator">*</span>
                          </label>
                        </div>

                        <div className="col-75">
                          <input
                            type="text"
                            id="Court Name"
                            name="CourtName"
                            placeholder="Court Name..."
                            required
                            value={editCourtData?.CourtName}
                            onChange={handleEditData}
                          />
                          <span></span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-25">
                          <label htmlFor="accession-name">
                            LOCATION{" "}
                            <span className="mandatory-indicator">*</span>
                          </label>
                        </div>
                        <div className="col-75">
                          <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Location.."
                            value={editCourtData?.location}
                            onChange={handleEditData}
                            required
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-25">
                          <label htmlFor="accession-number">
                            ADDRESS
                            <span className="mandatory-indicator">*</span>
                          </label>
                        </div>
                        <div className="col-75">
                          <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Address.."
                            value={editCourtData?.address}
                            onChange={handleEditData}
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
                            value={editCourtData?.type}
                            onChange={handleEditData}
                          />
                        </div>
                      </div>

                      <div className="rightSide-container">
                        <div className="rightSide-container-2">
                          <div className="text">
                            <h4>UPLOAD FILES</h4>
                          </div>
                          <div className="fileupload">
                            <label htmlFor="imageUpload">
                              SELECT AN IMAGES
                            </label>
                            <input
                              type="file"
                              id="imageUpload"
                              name="CourtimageUpload"
                              accept="image/*"
                              // onChange={CourtOnChangeImage}
                              multiple
                            />
                            <br />
                          </div>
                        </div>
                      </div>
                    </div>
                   
                  </div>

                  {/* </form> */}
                </div>

                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <button className="btn-primary" onClick={updateEditCourtData}>
                    {" "}
                    submit
                  </button>
                </Modal.Footer>
              </form>
            </Modal>
            
          </div>

          
          {/* admin edit */}







        </div>



      </div>

      <div className="marquee">
        <marquee width="100%" direction="right" height="50px">
          This is a sample scrolling text that has scrolls texts to the right.
        </marquee>
      </div>

      <div className="courtTinme">
        <div className="courttimedisplay">
          <h4>COURT TIME</h4>

          <button id="Today">Today</button>

          <button id="Tommorrow">Tommorrow</button>
          <br />
          <br />

          <div>
            <span>
              <input
                type="date"
                placeholder="Select a specific Date"
                value={inputDate}
                onChange={(e) => setinputDate(e.target.value)}
              />
              <button
                onClick={() =>
                  inputDate && getTimeSloutData(new Date(inputDate))
                }>
                Serach
              </button>{" "}
            </span>
          </div>

          <div>
            {slotData.map((slot) => (
              <span
                key={slot.id}
                style={{ margin: "5px", padding: "1px" }}
                onClick={() => {
                  !slot.bookedBy && setusershow(true);
                  !slot.bookedBy && setSelectedSlots(slot);
                }}>
                <button
                  className={`${slot.bookedBy ? "bg-warning" : "bg-primary"}`}>
                  {slot.slot.name}
                </button>

                {/*  style={{background:'red', color:'white'}} */}
              </span>
            ))}

            {/* user court view modal */}

            <div>
              <div>
                <Modal show={usershow} onHide={userHandleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      court Name: {SelectedSlots?.court?.CourtName}
                    </Modal.Title>
                  </Modal.Header>
                  {/* <form onSubmit={handilCreateTimeSlot}> */}
                  <div className="modalstyl">
                    <h2>Location:{SelectedSlots?.court?.location}</h2>
                  </div>
                  <li>Address: {SelectedSlots?.court?.address}</li>
                  <li>Type: {SelectedSlots?.court?.type}</li>
                  <li>Amount: {SelectedSlots?.cost}</li>
                  <li>time: {SelectedSlots?.slot?.name}</li>
                  {/* <Modal.Body>date: {SelectedSlots?.date ? new Date(SelectedSlots.date).toLocaleString().slice(0,11) : 'No date selected'}</Modal.Body> */}
                  <li>
                    date:{" "}
                    {SelectedSlots?.date
                      ? new Date(SelectedSlots.date).toLocaleDateString("en-GB")
                      : "No date selected"}
                  </li>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "25%", margin: "0 auto", display: "block" }}
                    onClick={inititeBooking}>
                    Book Now
                  </button>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={userHandleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                  {/* </form> */}
                </Modal>
              </div>
            </div>


            {/* court time details modal */}

            {/* <li></li> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default CourtBooking;
