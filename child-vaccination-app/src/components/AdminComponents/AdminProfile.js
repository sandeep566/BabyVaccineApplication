import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/AddVaccine.css";
import NavbarAdmin from "../../layout/NavbarAdmin";

function AdminProfile() {
  const [admin, setAdmin] = useState({
    adminName: "",
    password: "",
    email: "",
    mobileNumber: "",
  });

  const obj = localStorage.getItem("userInfo");
  const { userName } = JSON.parse(obj);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8585/admin/getAdminByEmail/${userName}`
        );
        setAdmin(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAdmin();
  }, [userName]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAdmin((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8585/admin/updateAdminByEmail/${userName}`, admin);
      navigate("/adminProfile");
      alert("admin details updated successfully")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavbarAdmin />
      <div className="add-vaccine">
        <div className="row">
          <div className="col-md-12 offset-md-1 border rounded p-4 mt-2 shadow" style={{backgroundColor:'white'}}>
            <h2 className="text-center m-4">Admin Profile</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter UserName"
                  name="name"
                  value={admin.adminName}
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
                  value={admin.email}
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
                  value={admin.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mobileNo" className="form-label">
                  Contact
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter mobileNo"
                  name="mobileNumber"
                  value={admin.mobileNumber}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary me-2">
                Update
              </button>
              <br></br>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminProfile;
