import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarAdmin from "../../layout/NavbarAdmin";

function EditHospital() {
  const [hospital, setHospital] = useState({
    hospitalName: "",
    hospitalAddress: "",
    startingTime: "",
    endingTime: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const response = await axios.get(`http://localhost:8585/Hospital/hospital/view/${id}`);
        setHospital(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHospital();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setHospital((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8585/Hospital/updateHospital/${id}`, hospital);
      navigate("/hospitals");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavbarAdmin />
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4"><u>Update Hospital Details</u></h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="hospitalName" className="form-label">
                  Hospital Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter hospital name"
                  name="hospitalName"
                  value={hospital.hospitalName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter address"
                  name="hospitalAddress"
                  value={hospital.hospitalAddress}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="startingTime" className="form-label">
                  Starting Time
                </label>
                <input
                  type="time"
                  className="form-control"
                  placeholder="Enter starting time"
                  name="startingTime"
                  value={hospital.startingTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="endingTime" className="form-label">
                  Ending Time
                </label>
                <input
                  type="time"
                  className="form-control"
                  placeholder="Enter ending time"
                  name="endingTime"
                  value={hospital.endingTime}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-success me-2">
                Update
              </button>
              <button className="btn btn-danger" onClick={() => navigate("/hospitals")}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditHospital;
