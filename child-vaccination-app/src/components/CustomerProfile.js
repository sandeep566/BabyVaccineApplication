import { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/AddVaccine.css';
import NavbarCustomer from "../layout/NavbarCustomer";

function CustomerProfile() {
  const [customer, setCustomer] = useState({
    userName: "",
    password: "",
    email: "",
    address: "",
    mobileNo:0
  });

  const cities = ['Bangalore', 'Chennai', 'Delhi', 'Mumbai', 'Pune'];
  const obj = localStorage.getItem("userInfo");
  const { userName } = JSON.parse(obj);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const response = await axios.get(`http://localhost:8585/parent/getParentByEmail/${userName}`);
        setCustomer(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHospital();
  }, [userName]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8585/parent/updateParentByEmail/${userName}`, customer);
      alert('Admin updated Successfully')
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavbarCustomer />
      <div className="add-vaccine">
        <div className="row">
          <div className="col-md-12 offset-md-1 border rounded p-4 mt-2 shadow"style = {{'backgroundColor': "white"}}>
            <h2 className="text-center m-4">Customer Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="userName" className="form-label">
                  User-Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter User name"
                  name="userName"
                  value={customer.userName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter password"
                  name="password"
                  value={customer.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter email"
                  name="email"
                  value={customer.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mobileNo" className="form-label">
                  Contact
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter mobileNo"
                  name="mobileNo"
                  value={customer.mobileNo}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="city">City:</label>
                <select id="city" name="address" value={customer.address} onChange={handleInputChange}>
                  <option value="">-- Select a city --</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary me-2">
                Update
              </button><br></br>
              <button className="btn btn-secondary" onClick={() => navigate("/")}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerProfile;
