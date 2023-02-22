import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Bookings.css';
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import NavbarCustomer from '../../layout/NavbarCustomer';

function GetChildDetails() {
  const [children, setChildren] = useState([]);

  const navigate = useNavigate();
  const obj = localStorage.getItem("userInfo")
  const {userName} = JSON.parse(obj);

  useEffect(() => {
    axios.get(`http://localhost:8585/child/viewAllChildByEmail/${userName}`)
      .then(response => {
        setChildren(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [children]);

  const deleteChild = async (id) => {
    await axios.delete(`http://localhost:8585/child/deleteChild/${id}`);
  }

  return (
    <>
      <NavbarCustomer />
      <div className="vaccines-container">
        <h2><u>Child Information</u></h2>
        <div className="vaccines-grid">
          {children.map(child => (
            <div className="booking-card" key={child.childId}>
              <h2><b>Name: </b>{child.name}</h2>
              <p><b>Age: </b>{child.age}</p>
              <p><b>Weight: </b>{child.weight} </p>
              <p><b>Gender: </b>{child.gender}</p>
              <div className="vaccine-buttons" style={{marginLeft:'0rem' }}>
              <Link className="btn btn-success mx-2" to={`/updatechild/${child.childId}`}>
                  Update
              </Link>
                <Popup
                  trigger={<button className='btn btn-danger'>Delete</button>}
                  position="top center"
                  modal
                  closeOnDocumentClick
                  contentStyle={{ background: "#36393f", border: "none" }}
                  className="custom-popup"
                >
                  <div id="popText">Are you sure you want to delete this booking?</div>
                  <button className='btn btn-danger' onClick={() => deleteChild(child.childId)}>Yes</button>
                </Popup>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default GetChildDetails;
