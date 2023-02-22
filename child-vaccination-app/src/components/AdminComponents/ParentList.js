
import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import axios from 'axios';
import NavbarAdmin from '../../layout/NavbarAdmin';

function ParentList() {
  const [parents, setParents] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortProperty, setSortProperty] = useState('userName');
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    fetchParents();
  }, [pageNumber, pageSize, sortProperty]);

  const fetchParents = async () => {
    try {
      const response = await axios.get(`http://localhost:8585/parent/pagingAndSortingParent/${pageNumber}/${pageSize}/${sortProperty}`);
      setParents(response.data.content);
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
      <h1>Parent List</h1>
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
          <option value="userName">User Name</option>
          <option value="address">Addresss</option>
          <option value="email">Email</option>
        </select>
      </div>
      <br/>
      <div>
      <table className='table table-bordered' style={{border: "2px"}}>
        <thead class="thead-dark">
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Address</th>
            <th>Mobile Number</th>
          </tr>
        </thead>
        <tbody class="thead-light">
          {parents.map(parent => (
            <tr key={parent.id}>
              <td>{parent.userName}</td>
              <td>{parent.email}</td>
              <td>{parent.password}</td>
              <td>{parent.address}</td>
              <td>{parent.mobileNo}</td>
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

export default ParentList;
