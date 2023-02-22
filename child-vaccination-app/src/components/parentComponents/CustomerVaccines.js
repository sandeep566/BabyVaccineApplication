import { useNavigate } from "react-router-dom";
import NavbarCustomer from "../../layout/NavbarCustomer";
import { useState,useEffect } from "react";
import axios from "axios";
import '../../styles/Vaccines.css';


function CustomerVaccines(){

    const [vaccines, setVaccines] = useState([]);
    const [searchOption, setSearchOption] = useState('default');
    const [searchValue, setSearchValue] = useState('');
  
    const navigate = useNavigate();
    
  
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

    
const obj = localStorage.getItem("userInfo");
const {userName} = JSON.parse(obj);


const handleBooking = (vaccineId, hospitalId) =>{
  const booking = {
    vaccineId:vaccineId,
    hospitalId:hospitalId,
    userName:userName
  }

  const response =  axios.post("http://localhost:8585/vaccineapp/addbooking", booking);
    navigate('/customerBookings');
    alert('Vaccine Appointment Booked Successfully')
    console.log(booking);
    console.log(response.data);
    
}
  
  
    
    
    return (
      <>
      <NavbarCustomer/>
      <div className="vaccines-container">
      <div className="search-container">
              <h1 align="center"><u>Book Vaccine</u></h1>
            <select value={searchOption} onChange={handleSearchOptionChange} style={{marginLeft: '50rem'}}>
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
            <div className="vaccine-card" key={vaccine.vaccineId}>
                <center><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcX_zsP3ikwP8kwgwybtHiEzVuyAunj0eMQ_KKqUU6eracFZsDNCLh5iah1EErKM3f2AA&usqp=CAU" height={"200px"}width={"200px"}></img></center>
                <hr></hr>
              <h2 style={{fontFamily:'rubik'}}>{vaccine.vaccineName} VACCINE</h2>
              <hr></hr>
              <p><b>Description: </b>{vaccine.vaccineDescription}</p>
              <p><b>AgeLimit: </b>{vaccine.agelimit}</p>
              <p><b>Doses: </b>{vaccine.totaldoses}</p>
              <p><b>Price: </b>{vaccine.price}</p>
              <p><b>available in : </b>{vaccine.hospital.hospitalName} Hospital</p>
              <button className="book-button"onClick={() => handleBooking(vaccine.vaccineId,vaccine.hospital.hospitalid)} style={{backgroundColor:'#5EB95E'}}>Book</button>
            </div>
          ))}
        </div>
      </div>
      </>
    )

}
export default CustomerVaccines;