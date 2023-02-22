import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/Home.css';
import baby from '../images/baby4.jpg';
import NavbarHome from '../layout/NavbarHome';
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/login')
  }

  return (
    <>
    <NavbarHome/>
    <section className="section-hero hero-body">
    <div className="hero">
    <div className="hero-logo">
    <h1 className="hero-primary-heading">Why child should get vaccinated ?</h1>
    <p className="hero-description">
    "Vaccines prevent deadly illnesses like measles and whooping cough, protecting children and adults from harm."
    </p>
    <a className="login-btn" onClick={handleSubmit}>
    Login →
    </a>
    </div>
    <div className="hero-btn">
     {/* <img className ="hero-baby-img" src={baby} alt="baby"></img> */}
    </div>
    </div>
    </section>
    </>
    );
    }
    
export default Home;
    
    
    
    
    
