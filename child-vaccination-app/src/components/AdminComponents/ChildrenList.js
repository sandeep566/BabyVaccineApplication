import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import axios from 'axios';
import NavbarAdmin from '../../layout/NavbarAdmin';

function ChildrenList() {
  const [childs, setChilds] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortProperty, setSortProperty] = useState('name');
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    fetchChilds();
  }, [pageNumber, pageSize, sortProperty]);

  const fetchChilds = async () => {
    try {
      const response = await axios.get(`http://localhost:8585/child/pagingAndSortingChild/${pageNumber}/${pageSize}/${sortProperty}`);
      setChilds(response.data.content);
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
      <h1>Childrens List</h1>
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
          <option value="name">Child Name</option>
          <option value="age">Age</option>
          <option value="weight">Weight</option>
        </select>
      </div>
      <br/>
      <div>
      <table className='table table-bordered' style={{border: "2px"}}>
        <thead class="thead-dark">
          <tr>
            <th>Child Name</th>
            <th>Parent Name</th>
            <th>Age</th>
            <th>Weight</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody class="thead-light">
          {childs.map(child => (
            <tr key={child.id}>
              <td>{child.name}</td>
              <td>{child.parent.userName}</td>
              <td>{child.age}</td>
              <td>{child.weight}</td>
              <td>{child.gender}</td>
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

export default ChildrenList;