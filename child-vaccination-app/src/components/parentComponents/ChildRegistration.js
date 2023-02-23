import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AddVaccine.css"; // import the CSS file
import NavbarCustomer from "../../layout/NavbarCustomer";


function ChildRegistration() {
  const obj = localStorage.getItem("userInfo");
  const { userName } = JSON.parse(obj);
  const [child, setChild] = useState({
    name: "",
    weight: 0,
    age: 0,
    gender: "",
  });

  const{name,weight,age,gender} = child;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setChild({ ...child, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
};
const validateForm = () => {
        let isValid = true;
        const errors = {};

        if (!child.name) {
            errors.name = "Child Name is required";
            isValid = false;
        }

        if (!child.age) {
            errors.age = "Child Age Should be less than 60 months";
            isValid = false;
        }

        if (!child.weight || child.weight < 0) {
            errors.weight = "weight should not be less than 0";
            isValid = false;
        }
        if (!child.gender) {
          errors.gender = "Child Gender is required";
          isValid = false;
      }
        setErrors(errors);
        return isValid;
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
          await axios.post(
          `http://localhost:8585/child/insertChild/${userName}`,
          child
        );
      alert("Child details added successfully");
      setChild({
        name: "",
        weight: 0,
        age: 0,
        gender: "",
    }); 
  }     
    };
  return (
    <>
      <NavbarCustomer />
      <button
        style={{ float: "right", marginTop: "3rem", marginRight: "5rem" ,backgroundColor:'#7cae7c',color:'#ffff'}}
        onClick={() => navigate("/getChildDetails")}
      >
        Show My Child Details
      </button>
      <div className="add-vaccine container">
        <div className="row">
          <div className="col-md-12 offset-md-1 border rounded p-4 mt-2 shadow" style={{backgroundColor:'white'}}>
            <h2>Child Registration</h2>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  CHILD-NAME
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter child name"
                  name="name"
                  value={name}
                  onChange={(e) => onInputChange(e)}
                  />
                  {errors.name && (
                                    <span className="error">{errors.name}</span>
                                )}
              </div>
              <div className="form-group">
                <label htmlFor="age" className="form-label">
                  AGE
                </label>
                <input
                  type="number"
                  step={"any"}
                  min={"0"}
                  max={"60"}
                  className="form-control"
                  placeholder="Enter age"
                  name="age"
                  value={age}
                  onChange={(e) => onInputChange(e)}
                />
                {errors.age && (
                                    <span className="error">{errors.age}</span>
                                )}
              </div>
              <div className="form-group">
                <label htmlFor="gender" className="form-label">
                  GENDER
                </label>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="gender"
                    value="Male"
                    checked={child.gender === "Male"}
                    onChange={(e) => onInputChange(e)}
                  />
                  
                  <label className="form-check-label">Male</label>
                  
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="gender"
                    value="Female"
                    checked={child.gender === "Female"}
                    onChange={(e) => onInputChange(e)}
                  />
                  
                  <label className="form-check-label">Female</label>
                  
                </div> 
                {errors.gender && (
                                    <span className="error">{errors.gender}</span>
                                )}  
              </div>
              
              <div className="form-group">
                <label htmlFor="weight" className="form-label">
                  WEIGHT
                </label>
                <input
                  type="number"
                  step={"any"}
                  min={"0"}
                  max={"40"}
                  className="form-control"
                  placeholder="Enter weight"
                  name="weight"
                  value={weight}
                  onChange={(e) => onInputChange(e)}
                />
                {errors.weight && (
                                    <span className="error">{errors.weight}</span>
                                )}
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary me-2">
                  ADD
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChildRegistration;