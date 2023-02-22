import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Vaccines.css';
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import NavbarAdmin from '../../layout/NavbarAdmin';

function Hospitals() {
  const [hospitals, setHospitals] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8585/Hospital/hospital/getAllHospital')
      .then(response => {
        setHospitals(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [hospitals]);

  const deleteHospital = async (hospitalId) => {
    await axios.delete(`http://localhost:8585/Hospital/hospital/delete/${hospitalId}`);
  }

  return (
    <>
      <NavbarAdmin />
      <div>
        <Link className="btn btn-success mx-2" to={`/addHospitals`} style={{marginTop:'1rem',float:'right', marginBottom:'5rem' }}>Add Hospital</Link>
      </div>
      <div className="vaccines-container">
        <h2><u>Hospital Details</u></h2>
        <div className="vaccines-grid">
          {hospitals.map(hospital => (
            <div className="vaccine-card" key={hospital.hospitalid} style={{height:"350px"}}>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHQ7AXGqNl4CNxMtxquN03ZsS7q-EcOlu_7A&usqp=CAU' height="50px" width={"70px"}></img>
              <h2><b>Name: </b>{hospital.hospitalName}</h2>
              <p><b>Address: </b>{hospital.hospitalAddress}</p>
              <p><b>Timings: </b>{hospital.startingTime.slice(0, 5)} A.M-{hospital.endingTime.slice(0, 5)} P.M</p>
              <div className="vaccine-buttons">
                <Link className="btn btn-success mx-2" to={`/editHospital/${hospital.hospitalid}`}>
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
                  <div id="popText">Are you sure you want to delete this hospital record?</div>
                  <button className='btn btn-danger' onClick={() => deleteHospital(hospital.hospitalid)}>Yes</button>
                </Popup>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Hospitals;
