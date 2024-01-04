// import logo from "./logo.svg";
import "./App.css";
import Landing from "./Components/pages/Landing.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/pages/home/Home.jsx";
import Toastcontainer from "./Components/Common/Toastcontainer.jsx";
import AddNewCourt from "./Components/pages/addNewCourt/AddNewCourt.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import CourtUserViewPage from "./Components/pages/CourtUserViewpage/CourtUserViewPage.jsx";
import MyBookings from "./Components/pages/myBookings/MyBookings";
import {
  AdminAuth,
  LoginAuth,
  UserAuth,
} from "./Authorization/Authorization.js";
import EditCourt from "./Components/Common/Edit/EditCourt.jsx";

function App() {
  return (
    <>
      <Toastcontainer />
      <BrowserRouter>
        <Routes>
          <Route element={<LoginAuth />}>
            <Route path="" element={<Landing />} />
          </Route>

          {/* userRoute */}

          <Route element={<UserAuth />}>
            <Route path="/home" element={<Home />} />
            <Route
              path="/CourtUserViewPage/:id"
              element={<CourtUserViewPage />}
            />
            <Route path="/MyBookings" element={<MyBookings />} />
          </Route>

          {/* adminRoute */}

          <Route element={<AdminAuth />}>
            <Route path="/AddNewCourt" element={<AddNewCourt />} />
            <Route path="/EditCourt/:courtId" element={<EditCourt />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
