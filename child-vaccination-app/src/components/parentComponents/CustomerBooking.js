import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Bookings.css";

import Popup from "reactjs-popup";

import NavbarCustomer from "../../layout/NavbarCustomer";

function CustomerBooking() {
  const obj = localStorage.getItem("userInfo");
  const { userName } = JSON.parse(obj);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8585/vaccineapp/getbookingsbyuser/${userName}`)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bookings]);

  const deleteBooking = async (bookingId) => {
    await axios.delete(
      `http://localhost:8585/vaccineapp/deletebooking/${bookingId}`
    );
  };

  return (
    <>
      <NavbarCustomer />
      <div className="vaccines-container">
        <div className="vaccines-grid">
          {bookings.map((booking) => (
            <div className="booking-card" key={booking.bookingId}>
              <h2>
                <b>Name: </b>
                {booking.name}
              </h2>
              <p>
                <b>Hospital Name: </b>
                {booking.hospital.hospitalName}
              </p>
              <p>
                <b>Vaccine Name: </b>
                {booking.vaccine.vaccineName}{" "}
              </p>
              <p>
                <b>Parent Name: </b>
                {booking.parent.userName}
              </p>
              <p><b>Slot-Timings </b>{booking.hospital.startingTime.slice(0, 5)}A.M-{booking.hospital.endingTime.slice(0, 5)}P.M</p>
              <p>
                <b>Bill: </b>
                {booking.bill}
              </p>
              <p>
                <b>Booking-Time:</b>
                {booking.billingTime}
              </p>
              <p>
                <b>Booking-Date:</b>
                {booking.billingDate}
              </p>
              <div style={{color:'red'}}>
                *Note Booking is valid only for 5 days
              </div>
              <div className="vaccine-buttons" style={{ marginLeft: "0rem" }}>
                <Popup
                  trigger={<button className="btn btn-danger">Delete</button>}
                  position="top center"
                  modal
                  closeOnDocumentClick
                  contentStyle={{ background: "#36393f", border: "none" }}
                  className="custom-popup"
                >
                  <div id="popText">
                    Are you sure you want to delete this booking?
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteBooking(booking.bookingId)}
                  >
                    Yes
                  </button>
                </Popup>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CustomerBooking;
