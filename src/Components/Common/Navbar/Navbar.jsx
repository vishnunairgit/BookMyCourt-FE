import React from "react";
// import { Navbar } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
// import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from "react-bootstrap/DropdownButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import AddNewCourt from "../../pages/AddNewCourt/AddNewCourt";
// import Home from "../../pages/home/Home";
// // import myBookingCard from "../pages/assets/fifteen-turf-thane-balkum-thane-cricket-turf-grounds-g2qg8bfasx.jpg";
import logoutbtn from "../../pages/assets/icons8-move-up-32.png";
import "./navbar.css";



const Navbar = () => {
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.user);

  const doLogOut=()=>{
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    localStorage.clear();
    navigate("/")
  }

  const handleNavigation = () => {
    // Use the navigate function to redirect to the desired path
    navigate("/AddNewCourt");
    // console.log(addNewCourt);
  };
  const handleNavigationMyBooking = () => {
    // Use the navigate function to redirect to the desired path
    navigate("/MyBookings");
    // console.log(addNewCourt);
  };
  const handleHome =()=>{
    navigate("/home")
  }




  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary ">
        <div className="container-fluid">
          <span className="navbar-brand" onClick={handleHome}>
            HOME
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userDetails.role === 1 && (
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    onClick={handleNavigation}>
                    ADD NEW COURT
                  </a>
                </li>
              )}
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  onClick={handleNavigationMyBooking}>
                  My Bookings
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>

              <DropdownButton
                id="dropdown-basic-button"
                title="Dropdown button">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>

              {/* <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
              </li> */}
            </ul>

            <div className="d-flex">
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-warning" type="submit">
                  Search
                </button>
              </form>

              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  user : {userDetails.fname}  {userDetails.lname}
                </a>
              </li> */}

                <DropdownButton
                  id="dropdown-basic-button"
                  title="Dropdown button">
                  <div className="logout">
                    <li className="nav-item">
                      <a
                        className="nav-link active logout"
                        // style={{ color: "black" }}
                        aria-current="page"
                        href="#">
                        user : {userDetails.fname} {userDetails.lname}
                      </a>
                    </li>
                  </div>
                  <div>
                    <img src={logoutbtn} alt="" onClick={doLogOut}/>
                    LogOut
                  </div>
                  {/* <Dropdown.Item href="#/action-1">action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item> */}
                </DropdownButton>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
