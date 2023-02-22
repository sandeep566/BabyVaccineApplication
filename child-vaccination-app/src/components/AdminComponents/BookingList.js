
import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import axios from 'axios';
import NavbarAdmin from '../../layout/NavbarAdmin';

function BookingList() {
  const [bookings, setBookings] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortProperty, setSortProperty] = useState('name');
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    fetchBookings();
  }, [pageNumber, pageSize, sortProperty]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:8585/vaccineapp/pagingAndSortingBooking/${pageNumber}/${pageSize}/${sortProperty}`);
      setBookings(response.data.content);
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
      <h1>Booking List</h1>
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
          <option value="name">User Name</option>
          <option value="bill">Bill</option>
          <option value="billingDate">Date</option>
        </select>
      </div>
      <br/>
      <div>
      <table className='table table-bordered' style={{border: "2px"}}>
        <thead class="thead-dark">
          <tr>
            <th>User Name</th>
            <th>Hospital Name</th>
            <th>Vaccine Name</th>
            <th>Child Name</th>
            <th>Bill</th>
            <th>Billing Date</th>
            <th>Billing Time</th>
          </tr>
        </thead>
        <tbody class="thead-light">
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.name}</td>
              <td>{booking.hospital.hospitalName}</td>
              <td>{booking.vaccine.vaccineName}</td>
              <td>{booking.parent.userName}</td>
              <td>{booking.bill}</td>
              <td>{booking.billingDate}</td>
              <td>{booking.billingTime}</td>
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

export default BookingList;

