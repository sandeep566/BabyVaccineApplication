import { useState } from "react";
import axios from "axios";
import '../../styles/AddVaccine.css';
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../layout/NavbarAdmin";


function AddHospital() {
  const [hospital, setHospital] = useState({
    hospitalName: "",
    hospitalAddress: "",
    startingTime: "",
    endingTime: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [e.target.name]: "" });

  setHospital((prevHospital) => ({
      ...prevHospital,
      [name]: value,
    }));
  };
const validate = () => {
    let isValid=true;
    const errors = {};
    if (!hospital.hospitalName) {
      errors.hospitalName = "Hospital name is required";
    } 
    else if (hospital.hospitalName.length < 3) {
      errors.hospitalName = "Hospital name must be at least 3 characters long";
      isValid=false;
    }
    if (!hospital.hospitalAddress) {
      errors.hospitalAddress = "Hospital address is required";
      isValid=false;
    }
    if (!hospital.startingTime) {
      errors.startingTime = "Starting time is required";
      isValid=false;
    }
    if (!hospital.endingTime) {
      errors.endingTime = "Ending time is required";
    } else if (hospital.startingTime >= hospital.endingTime) {
      errors.startingTime = "Starting time must be before ending time";
      errors.endingTime = "Ending time must be after starting time";
      isValid=false;
    }
    setErrors(errors);
    return isValid;
  };
const onSubmit = async (e) => {
    e.preventDefault();
    if(validate()){

    
      try {
        await axios.post(
          "http://localhost:8585/Hospital/insertHospital",
          hospital
        );
        alert("Added successfully");
        navigate("/hospitals");
      } catch (error) {
        console.log(error);
      }
    }
  };
return (
    <>
      <NavbarAdmin />
      <div className="add-vaccine">
        <div className="row">
          <div className="col-md-12 offset-md-1 border rounded p-4 mt-2 shadow">
            <h2>Add Hospital</h2>
            <form onSubmit={onSubmit}>
              <div>
                <label htmlFor="hospitalName">Hospital Name:</label>
                <input
                  type="text"
                  id="hospitalName"
                  name="hospitalName"
                  value={hospital.hospitalName}
                  onChange={onInputChange}
                  onBlur={validate}
                />
                {errors.hospitalName && (
                  <div className="error">{errors.hospitalName}</div>
                )}
              </div>
              <div>
                <label htmlFor="hospitalAddress">Hospital Address:</label>
                <input
                  type="text"
                  id="hospitalAddress"
                  name="hospitalAddress"
                  value={hospital.hospitalAddress}
                  onChange={onInputChange}
                  onBlur={validate}
                />
                {errors.hospitalAddress && (
                  <div className="error">{errors.hospitalAddress}</div>
                )}
              </div>
              <div>
                <label htmlFor="startingTime">Starting Time:</label>
                <input
                  type="time"
                  id="startingTime"
                  name="startingTime"
                  value={hospital.startingTime}
                  onChange={onInputChange}
                  onBlur={validate}
                />
                {errors.startingTime && (
                  <div className="error">{errors.startingTime}</div>
                )}
              </div>
              <div>
                <label htmlFor="endingTime">Ending Time:</label>
                <input
                  type="time"
                  id="endingTime"
                  name="endingTime"
                  value={hospital.endingTime}
                  onChange={onInputChange}
                  onBlur={validate}
                  />
                {errors.endingTime && (
                  <div className="error">{errors.endingTime}</div>
                )}
              </div>
              <button type="submit">Add Hospital</button>
        </form>
      </div>
    </div>
  </div>  
    </>
  );
}

export default AddHospital;
