import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Vaccines from "./components/AdminComponents/Vaccines";
import Hospitals from "./components/AdminComponents/Hospitals";
import EditHospital from "./components/AdminComponents/EditHospital";
import AddHospital from "./components/AdminComponents/AddHospital";
import SignupForm from "./components/SignupForm";
import { useEffect, useState } from "react";
import { getUserInfo } from "./components/UserInfo";
import Login from "./components/UserLogin";
import CustomerProfile from "./components/CustomerProfile";
import AddVaccine from "./components/AdminComponents/AddVaccine";
import UpdateVaccine from "./components/AdminComponents/UpdateVaccine";
import ChildRegistration from "./components/parentComponents/ChildRegistration";
import CustomerHome from "./components/parentComponents/CustomerHome";
import AdminHome from "./components/AdminComponents/AdminHome";
import CustomerVaccines from "./components/parentComponents/CustomerVaccines";
import Bookings from "./components/AdminComponents/Bookings";
import GetChildDetails from "./components/parentComponents/GetChildDetails";
import AdminProfile from "./components/AdminComponents/AdminProfile";
import CustomerBooking from "./components/parentComponents/CustomerBooking";
import ChildUpdate from "./components/parentComponents/ChildUpdate";
import ParentList from "./components/AdminComponents/ParentList";
import VaccineList from "./components/AdminComponents/VaccineList";
import ChildrenList from "./components/AdminComponents/ChildrenList";
import BookingList from "./components/AdminComponents/BookingList";
import HospitalList from "./components/AdminComponents/HospitalList";
import PagingAndSorting from "./components/AdminComponents/PagingAndSorting";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [state, setstate] = useState(<Home />);

  useEffect(() => {
    if (getUserInfo() != null) {
      setIsLoggedIn(true);
      setRole(getUserInfo().role);
      setstate(checkUserSession());
    }
  }, [isLoggedIn, role]);

  useEffect(() => {}, []);

  console.log(isLoggedIn);
  const checkUserSession = () => {
    if (isLoggedIn) {
      return role == "admin" ? <AdminHome /> : <CustomerHome />;
    } else {
      return <Home />;
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          ></Route>
          <Route exact path="/" element={state}></Route>
          <Route exact path="/signUp" element={<SignupForm />}></Route>

          {role === "customer" ? (
            <>
              <Route
                exact
                path="/profile"
                element={<CustomerProfile />}
              ></Route>
              <Route
                exact
                path="/childDetails"
                element={<ChildRegistration />}
              ></Route>
              <Route
                exact
                path="/customerHome"
                element={<CustomerHome />}
              ></Route>
              <Route
                exact
                path="/customerVaccines"
                element={<CustomerVaccines />}
              ></Route>
              <Route
                exact
                path="/getChildDetails"
                element={<GetChildDetails />}
              ></Route>
              <Route
                exact
                path="/customerBookings"
                element={<CustomerBooking />}
              ></Route>
              <Route
                exact
                path="/updatechild/:id"
                element={<ChildUpdate />}
              ></Route>
            </>
          ) : undefined}
          {role === "admin" ? (
            <>
              <Route exact path="/vaccines" element={<Vaccines />}></Route>
              <Route exact path="/hospitals" element={<Hospitals />}></Route>
              <Route
                exact
                path="/editHospital/:id"
                element={<EditHospital />}
              />
              <Route
                exact
                path="/addHospitals"
                element={<AddHospital />}
              ></Route>

              <Route exact path="/addVaccines" element={<AddVaccine />}></Route>
              <Route
                exact
                path="/updateVaccine/:id"
                element={<UpdateVaccine />}
              ></Route>

              <Route exact path="/adminHome" element={<AdminHome />}></Route>

              <Route exact path="/bookings" element={<Bookings />}></Route>

              <Route
                exact
                path="/adminProfile"
                element={<AdminProfile />}
              ></Route>
              <Route exact path="/parentlist" element={<ParentList />}></Route>
              <Route
                exact
                path="/bookinglist"
                element={<BookingList />}
              ></Route>
              <Route
                exact
                path="/childrenlist"
                element={<ChildrenList />}
              ></Route>
              <Route
                exact
                path="/hospitallist"
                element={<HospitalList />}
              ></Route>
              <Route
                exact
                path="/vaccinelist"
                element={<VaccineList />}
              ></Route>
              <Route exact path="/ps" element={<PagingAndSorting />}></Route>
            </>
          ) : undefined}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
