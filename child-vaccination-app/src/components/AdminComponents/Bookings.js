import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Bookings.css';
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import NavbarAdmin from '../../layout/NavbarAdmin';

function Bookings() {
  const [bookings, setBookings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8585/vaccineapp/getallbookings')
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [bookings]);

  const deleteBooking = async (bookingId) => {
    await axios.delete(`http://localhost:8585/vaccineapp/deletebooking/${bookingId}`);
  }

  return (
    <>
      <NavbarAdmin />
      <div className="vaccines-container">
      <center><h2><b><u>Bookings</u></b></h2></center>
        <div className="vaccines-grid">
          {bookings.map(booking => (
            <div className="booking-card" key={booking.bookingId}>
              <h2><b>Name: </b>{booking.name}</h2>
              <p><b>Hospital Name: </b>{booking.hospital.hospitalName}</p>
              <p><b>Vaccine Name: </b>{booking.vaccine.vaccineName} </p>
              <p><b>Slot-Timings </b>{booking.hospital.startingTime.slice(0, 5)}A.M-{booking.hospital.endingTime.slice(0, 5)}P.M</p>
              <p><b>Bill: </b>{booking.bill}</p>
              <p><b>Billed at:</b>{booking.billingTime} {booking.billingDate}</p>
              <div className="vaccine-buttons" style={{marginLeft:'0rem' }}>
                <Popup
                  trigger={<button className='btn btn-danger'>Delete</button>}
                  position="top center"
                  modal
                  closeOnDocumentClick
                  contentStyle={{ background: "#36393f", border: "none" }}
                  className="custom-popup"
                >
                  <div id="popText">Are you sure you want to delete this booking?</div>
                  <button className='btn btn-danger' onClick={() => deleteBooking(booking.bookingId)} style={{}}>Yes</button>
                </Popup>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Bookings;
