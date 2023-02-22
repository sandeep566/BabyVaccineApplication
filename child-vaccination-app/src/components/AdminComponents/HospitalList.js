import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import axios from 'axios';
import NavbarAdmin from '../../layout/NavbarAdmin';

function HospitalList() {
  const [hospitals, setHospitals] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortProperty, setSortProperty] = useState('hospitalName');
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    fetchHospitals();
  }, [pageNumber, pageSize, sortProperty]);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get(`http://localhost:8585/Hospital/pagingAndSortingHospital/${pageNumber}/${pageSize}/${sortProperty}`);
      setHospitals(response.data.content);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (event, value) => {
    setPageNumber(value - 1);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value));
    setPageNumber(0);
  };

  const handleSortChange = (event) => {
    setSortProperty(event.target.value);
    setPageNumber(0);
  };

  return (
    <div>
      <div>
        <NavbarAdmin />
        </div>
      <h1>Hospital List</h1>
      <center>
      <div>
        <label htmlFor="pageSize">Page Size:</label>
        <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <div>
        <label htmlFor="sortProperty">Sort by:</label>
        <select id="sortProperty" value={sortProperty} onChange={handleSortChange}>
          <option value="hospitalName">Hospital Name</option>
          <option value="hospitalAddress">Addresss</option>
        </select>
      </div>
      <br/>
      <div>
      <table className='table table-bordered' style={{border: "2px"}}>
        <thead class="thead-dark">
          <tr>
            <th>Hospital Name</th>
            <th>Address</th>
            <th>Starting Time</th>
            <th>Ending Time</th>
          </tr>
        </thead>
        <tbody class="thead-light">
          {hospitals.map(hospital => (
            <tr key={hospital.id}>
              <td>{hospital.hospitalName}</td>
              <td>{hospital.hospitalAddress}</td>
              <td>{hospital.startingTime}</td>
              <td>{hospital.endingTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div>
        Page {pageNumber + 1} of {totalPages} ({totalElements} items)
      </div>
      <div>
        <Pagination
          count={totalPages}
          page={pageNumber + 1}
          onChange={handlePageChange}
        />
      </div>
      </center>
    </div>
    
  );
}

export default HospitalList;
