import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarAdmin from "../../layout/NavbarAdmin";

function EditHospital() {
  const [vaccine, setVaccine] = useState({
    vaccineName: "",
    vaccineDescription: "",
    agelimit: 0,
    totaldoses: 0,
    price: 0,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVaccine = async () => {
      try {
        const response = await axios.get(`http://localhost:8585/vaccine/getvaccine/${id}`);
        setVaccine(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVaccine();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVaccine((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8585/vaccine/updateVaccine/${id}`, vaccine);
      navigate("/vaccines");
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
            <h2 className="text-center m-4">Update Vaccine Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="vaccineName" className="form-label">
                  Vaccine name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Vaccine name"
                  name="vaccineName"
                  value={vaccine.vaccineName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="vaccineDescription" className="form-label">
                  Vaccine-Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter vaccine description"
                  name="vaccineDescription"
                  value={vaccine.vaccineDescription}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="agelimit" className="form-label">
                  age-limit
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="agelimit"
                  name="agelimit"
                  value={vaccine.agelimit}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="totaldoses" className="form-label">
                total-doses
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter totaldoses"
                  name="totaldoses"
                  value={vaccine.totaldoses}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                price
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter price"
                  name="price"
                  value={vaccine.price}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-success me-2">
                Update
              </button>
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

export default EditHospital;
