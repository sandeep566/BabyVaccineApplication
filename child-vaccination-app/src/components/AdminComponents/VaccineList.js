
import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import axios from 'axios';
import NavbarAdmin from '../../layout/NavbarAdmin';

function VaccineList() {
  const [vaccines, setVaccines] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortProperty, setSortProperty] = useState('vaccineName');
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    fetchVaccines();
  }, [pageNumber, pageSize, sortProperty]);

  const fetchVaccines = async () => {
    try {
      const response = await axios.get(`http://localhost:8585/vaccine/pagingAndSortingVaccine/${pageNumber}/${pageSize}/${sortProperty}`);
      setVaccines(response.data.content);
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
      <h1>Vaccine List</h1>
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
          <option value="vaccineName">Vaccine Name</option>
          <option value="agelimit">Age Limit</option>
          <option value="price">Price</option>
        </select>
      </div>
      <br/>
      <div>
      <table className='table table-bordered' style={{border: "2px"}}>
        <thead class="thead-dark">
          <tr>
            <th>Vaccine Name</th>
            <th>Available in Hospital</th>
            <th>Age Limit</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody class="thead-light">
          {vaccines.map(vaccine => (
            <tr key={vaccine.id}>
              <td>{vaccine.vaccineName}</td>
              <td>{vaccine.hospital.hospitalName}</td>
              <td>{vaccine.agelimit}</td>
              <td>{vaccine.price}</td>
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

export default VaccineList;
