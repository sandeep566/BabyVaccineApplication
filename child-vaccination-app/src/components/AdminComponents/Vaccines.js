import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Vaccines.css';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import NavbarAdmin from '../../layout/NavbarAdmin';

function Vaccines() {
  const [vaccines, setVaccines] = useState([]);
  const [searchOption, setSearchOption] = useState('default');
  const [searchValue, setSearchValue] = useState('');

  

  useEffect(() => {
    axios.get('http://localhost:8585/vaccine/view/all')
      .then(response => {
        setVaccines(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [vaccines]);

  // console.log(vaccines)

  const deleteVaccine = async (vaccineId) => {
    await axios.delete(`http://localhost:8585/vaccine/deleteVaccine/${vaccineId}`);
  }

  const handleSearchOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filters = (vaccine) => {
    if (searchOption === 'default') {
      return true;
    } else if (searchOption === 'ageLimit') {
      return vaccine.agelimit === Number(searchValue);
    } else if (searchOption === 'price') {
      return vaccine.price === Number(searchValue);
    } else if (searchOption === 'totalDoses') {
      return vaccine.totaldoses === Number(searchValue);
    }
  };


  
  
  return (
    <>
    <NavbarAdmin/>
    <div>
        <Link className="btn btn-success mx-2" to={`/addVaccines`} style={{marginTop:'1rem',float:'right'}}>Add vaccine</Link>
      </div>
    <div className="vaccines-container">
    <div className="search-container">
            <h1 align="center">Vaccine</h1>
          <select value={searchOption} onChange={handleSearchOptionChange}>
            <option value="default">View Vaccine</option>
            <option value="ageLimit">Search by Age Limit</option>
            <option value="price">Search by Price</option>
            <option value="totalDoses">Search by Total Doses</option>
          </select>
          {(searchOption === 'ageLimit' || searchOption === 'price' || searchOption === 'totalDoses') && (
            <input type="number" value={searchValue} onChange={handleSearchInputChange} />
          )}
        </div>
      <div className="vaccines-grid">
        {vaccines.filter(filters).map(vaccine => (
          <div className="vaccine-card" key={vaccine.vaccineId} style={{height:'350px'}}>
            <h2><b>Name: </b>{vaccine.vaccineName}</h2>
            <p><b>Description: </b>{vaccine.vaccineDescription}</p>
            <p><b>Age: </b>{vaccine.agelimit}</p>
            <p><b>Doses: </b>{vaccine.totaldoses}</p>
            <p><b>Price: </b>{vaccine.price}</p>
            <p><b>Available in: </b>{vaccine.hospital.hospitalName}</p>
            <div className="vaccine-buttons">
            <Link className="btn btn-success mx-2" to={`/updateVaccine/${vaccine.vaccineId}`}>
                  Update
            </Link>
            <Popup
                  trigger={<button className='btn btn-danger'>Delete</button>}
                  position="top center"
                  modal
                  closeOnDocumentClick
                  contentStyle={{ background: "#36393f", border: "none", borderColor: "ActiveBorder" }}
                  className="custom-popup"
                >
                  <div id="popText">Are you sure you want to delete "{vaccine.vaccineName}" Vaccine ?</div>
                  <button className='btn btn-danger' onClick={() => deleteVaccine(vaccine.vaccineId)}>Yes</button>
            </Popup>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Vaccines;
