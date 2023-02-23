import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/AddVaccine.css"; // import the CSS file
import NavbarCustomer from "../../layout/NavbarCustomer";

function ChildUpdate() {
    const [child, setChild] = useState({
        name: "",
        age: 0,
        gender:"",
        weight:0.0
      });
    
      const { id } = useParams();
      const navigate = useNavigate();
    
      useEffect(() => {
        const fetchChild = async () => {
          try {
            const response = await axios.get(`http://localhost:8585/child/viewChild/${id}`);
            setChild(response.data);
          } catch (error) {
            console.error(error);
          }
        };
        fetchChild();
      }, [id]);
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setChild((prevState) => ({ ...prevState, [name]: value }));
      };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        await axios.put(`http://localhost:8585/child/updateChild/${id}`, child);
        navigate("/getChildDetails");
        } catch (error) {
            console.error(error);
        }
    };

    return (
    <>
    <NavbarCustomer />
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Update Child Details</h2>
          <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="vaccineName" className="form-label">
                  name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Child name"
                  name="name"
                  value={child.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Age" className="form-label">
                  Age
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter child Age"
                  name="age"
                  value={child.age}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
              <label htmlFor="Age" className="form-label">
                  weight
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="weight"
                  name="weight"
                  value={child.weight}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                Gender
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter gender"
                  name="gender"
                  value={child.gender}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary me-2">
                Update
              </button>
              <button className="btn btn-secondary" onClick={() => navigate("/getChildDetails")}>
                Cancel
              </button>
          </form>
        </div>
      </div>
    </div>
  </>
);
}

export default ChildUpdate;
