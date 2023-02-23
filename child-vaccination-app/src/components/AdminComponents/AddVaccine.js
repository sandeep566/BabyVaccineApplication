import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/AddVaccine.css";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../layout/NavbarAdmin";

function AddVaccine() {
  const [vaccine, setVaccine] = useState({
    vaccineName: "",
    vaccineDescription: "",
    agelimit: 0,
    totaldoses: 0,
    price: 0,
    hospitalName: "",
  });

  const [names, setNames] = useState([]);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const onInputChange = (e) => {
    setVaccine({ ...vaccine, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};
    const nameRegex = /^[a-zA-Z\s]*$/;

    if (!vaccine.vaccineName) {
      errors.vaccineName = "Vaccine Name is required";
      isValid = false;
    } else if (!nameRegex.test(vaccine.vaccineName)) {
      errors.vaccineName =
        "Vaccine Name should contain only alphabets and not numbers";
      isValid = false;
    } else if (vaccine.vaccineName.length < 3) {
      errors.vaccineName = "Vaccine Name should be at least 3 characters";
      isValid = false;
    }

    if (!vaccine.vaccineDescription) {
      errors.vaccineDescription = "Vaccine Description is required";
      isValid = false;
    } else if (vaccine.vaccineDescription.length < 3) {
      errors.vaccineDescription =
        "Vaccine Description should be at least 3 characters";
      isValid = false;
    }

    if (!vaccine.agelimit || vaccine.agelimit < 0) {
      errors.agelimit = "Age should not be less than 0";
      isValid = false;
    }

    if (!vaccine.totaldoses || vaccine.totaldoses <= 0) {
      errors.totaldoses = "Dose count should be greater than zero";
      isValid = false;
    }

    if (!vaccine.price || vaccine.price <= 0) {
      errors.price = "Price should be greater than 0";
      isValid = false;
    }

    if (!vaccine.hospitalName) {
      errors.hospitalName = "Hospital Name is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  useEffect(() => {
    fetchNames();
  }, []);

  const fetchNames = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8585/Hospital/getAllHospitalsNames`
      );
      setNames(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await axios.post("http://localhost:8585/vaccine/addVaccine", vaccine);
      alert("vaccine added successfully");
      navigate("/vaccines");
      setVaccine({
        vaccineName: "",
        vaccineDescription: "",
        agelimit: 0,
        totaldoses: 0,
        price: 0,
        hospitalName: "",
      });
    }
  };

  return (
    <>
      <NavbarAdmin />
      <div className="add-vaccine">
        <div className="row">
          <div className="col-md-12 offset-md-1 border rounded p-4 mt-2 shadow" style={{backgroundColor: 'white'}}>
            <h2>Add Vaccine</h2>
            <form onSubmit={onSubmit}>
              <div>
                <label htmlFor="vaccineName">Vaccine Name:</label>
                <input
                  type="text"
                  id="vaccineName"
                  name="vaccineName"
                  value={vaccine.vaccineName}
                  onChange={onInputChange}
                  onBlur={validateForm}
                />
                {errors.vaccineName && (
                  <span className="error">{errors.vaccineName}</span>
                )}
              </div>
              <div>
                <label htmlFor="vaccineDescription">Vaccine Description:</label>
                <input
                  type="text"
                  id="vaccineDescription"
                  name="vaccineDescription"
                  value={vaccine.vaccineDescription}
                  onChange={onInputChange}
                  onBlur={validateForm}
                />
                {errors.vaccineDescription && (
                  <span className="error">{errors.vaccineDescription}</span>
                )}
              </div>
              <div>
                <label htmlFor="agelimit">Age Limit:</label>
                <input
                  type="number"
                  id="agelimit"
                  name="agelimit"
                  value={vaccine.agelimit}
                  onChange={onInputChange}
                  onBlur={validateForm}
                />
                {errors.agelimit && (
                  <span className="error">{errors.agelimit}</span>
                )}
              </div>

              <div>
                <label htmlFor="totaldoses">Total Doses:</label>
                <input
                  type="number"
                  id="totaldoses"
                  name="totaldoses"
                  value={vaccine.totaldoses}
                  onChange={onInputChange}
                  onBlur={validateForm}
                />
                {errors.totaldoses && (
                  <span className="error">{errors.totaldoses}</span>
                )}
              </div>

              <div>
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={vaccine.price}
                  onChange={onInputChange}
                  onBlur={validateForm}
                />
                {errors.price && <span className="error">{errors.price}</span>}
              </div>

              <div>
                <label htmlFor="hospitalName">Hospital Name:</label>
                <select
                  id="hospitalName"
                  name="hospitalName"
                  value={vaccine.hospitalName}
                  onChange={onInputChange}
                  onBlur={validateForm}
                >
                  <option value="">Select Hospital Name</option>
                  {names.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                {errors.hospitalName && (
                  <span className="error">{errors.hospitalName}</span>
                )}
              </div>
              <button type="submit">Add Vaccine</button>
              <br></br>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/vaccines")}
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
export default AddVaccine;
