import { useEffect, useState } from "react";
import axios from "axios";
import '../../styles/AddVaccine.css';
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../layout/NavbarAdmin";

function AddVaccine() {
  const [vaccine, setVaccine] = useState({
    vaccineName: "",
    vaccineDescription: "",
    agelimit: 0,
    totaldoses: 0,
    price: 0,
    hospitalName: ""
  });

  const [names,setNames] = useState([]);

  const navigate = useNavigate();

  const onInputChange = (e) => {
    setVaccine({ ...vaccine, [e.target.name]: e.target.value });
  };

  useEffect (() => {
    fetchNames();
},[]);

const fetchNames = async () => {
    try {
      const response = await axios.get(`http://localhost:8585/Hospital/getAllHospitalsNames`);
      setNames(response.data)
    } catch (error) {
      console.error(error);
    }
};

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8585/vaccine/addVaccine", vaccine);
    alert("added successfully");
    navigate("/vaccines")
    setVaccine({
        vaccineName: "",
        vaccineDescription: "",
        agelimit: 0,
        totaldoses: 0,
        price: 0,
        hospitalName: ""
    });
  };

  return (
    <>
      <NavbarAdmin />
      <div className="add-vaccine">
        <div className="row">
          <div className="col-md-12 offset-md-1 border rounded p-4 mt-2 shadow">
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
                />
              </div>
              <div>
                <label htmlFor="vaccineDescription">Vaccine Description:</label>
                <input
                  type="text"
                  id="vaccineDescription"
                  name="vaccineDescription"
                  value={vaccine.vaccineDescription}
                  onChange={onInputChange}
                />
              </div>
              <div>
                <label htmlFor="ageLimit">Age-Limit:</label>
                <input
                  type="number"
                  id="agelimit"
                  name="agelimit"
                  value={vaccine.agelimit}
                  onChange={onInputChange}
                />
              </div>
              <div>
                <label htmlFor="totalDoses">Total-Doses:</label>
                <input
                  type="number"
                  id="totaldoses"
                  name="totaldoses"
                  value={vaccine.totaldoses}
                  onChange={onInputChange}
                />
              </div>
              <div>
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={vaccine.price}
                  onChange={onInputChange}
                />
              </div>
              <div>
                <label htmlFor="hospital">Hospital:</label>
                <select id="hospital" name="hospitalName" value={vaccine.hospitalName} onChange={onInputChange}>
                  <option value="">-- Select a Hospital --</option>
                  {names.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              <button type="submit">Add Vaccine</button><br></br>
              <button className="btn btn-danger" onClick={() => navigate("/vaccines")}>
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
