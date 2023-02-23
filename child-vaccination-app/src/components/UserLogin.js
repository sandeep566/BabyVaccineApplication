import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "./UserInfo";
import UserService from "../services/UserService";
import { Navbar } from "react-bootstrap";
import NavbarHome from "../layout/NavbarHome";

const initialData = { userName: "", password: "" };

const UserLogin = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    // Send login request to server
    UserService.userlogin(formData)
      .then((res) => {
        setUserInfo({ ...res.data, id: res.data.id });
        // alert(" Customer Login Successfully");
        // navigate("/addcustomer");

        if (res.data.role === "customer") {
          setIsLoggedIn(true);
          alert(" Customer Login Successfully");
          navigate("/customerHome");
        }
        if (res.data.role === "admin") {
          setIsLoggedIn(true);
          alert("Admin Login Successfully");
          navigate("/adminHome");
        }
      })
      .catch((error) => {
        alert("Invalid Username or Password");
        console.log(error);
      });
  };

  return (
    <>
    <NavbarHome/>
    <div
      style={{
        
        height: "100vh"
      }}
    >
      <div
        className="container"
        style={{
          minHeight: "85vh",
        }}
      >
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5" style={{
                  backgroundColor: "#d5f4d5"
                }}>
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5" style={{fontFamily: 'rubik'}}>
                  Login
                </h5>
                <form >
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      value={formData.userName}
                      className="form-control"
                      id="userName"
                      placeholder="jhonDoe69"
                      name="userName"
                      onChange={handleChange}
                      required={true}
                    />
                    <label htmlFor="floatingInput">User Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      value={formData.password}
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      required={true}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                      onClick={handleLogin}
                      style={{backgroundColor:"#5EB95E"}}
                    >
                      Login
                    </button>
                  </div>
                  <hr className="my-4" />
                  <div className="">
                    <p className="text-center">
                      Don't have an account? <a href="/signUp">Register</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default UserLogin;
