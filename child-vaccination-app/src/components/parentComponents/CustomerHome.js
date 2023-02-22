import NavbarCustomer from "../../layout/NavbarCustomer";
import Home from "../../images/Home-pic.png";
import "../../styles/HomeCA.css";



function CustomerHome() {
  return (
    <>
      <NavbarCustomer />
      <section className="hero-section">
        <div className="hero">
          <div className="hero-info">
            <h1 className="hero-primary-heading">
              Why Follow The Recommended Vaccination Schedule?
            </h1>
            <p className="hero-descript">
              The{" "}
              <span className="hero-description-highlight">
                CDC’s recommended schedule (Birth through 6 years old)
              </span>{" "}
              is the ONLY vaccination schedule in the U.S. that is rigorously
              tested for safety and effectiveness. This same schedule is also
              recommended by the American Academy of Pediatrics (AAP) and the
              American Academy of Family Physicians (AAFP).
            </p>
          </div>
          <div className="hero-img">
            <img src={Home} alt="pic with woman and children"></img>
          </div>
        </div>
      </section>
      <footer
        style={{
          background: "#e5f3de",
          display: "block",
          marginTop: "0px",
          padding: "0.5rem",
        }}
      >
        <p>
          ©2019 BabyVaccination.com - <b>All rights reserved.</b>
        </p>
      </footer>
    </>
  );
}

export default CustomerHome;
