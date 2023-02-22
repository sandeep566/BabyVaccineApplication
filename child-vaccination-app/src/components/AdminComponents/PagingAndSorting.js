import NavbarAdmin from "../../layout/NavbarAdmin";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../../styles/AddVaccine.css";

function PagingAndSorting() {
  return (
    <>
      <NavbarAdmin />
      <div className="add-vaccine">
        <div>
          <Link to={`/hospitallist`}>
            <Button
              className="btn btn-success"
              style={{ float: "left", marginTop: "3rem",marginRight:'2rem' }}
            >
              View Hospitals
            </Button>
          </Link>
        </div>
        <div>
          <Link to={`/vaccinelist`}>
            <Button
              className="btn btn-success"
              style={{ float: "left", marginTop: "3rem" ,marginRight:'2rem'}}
            >
              View Vaccines
            </Button>
          </Link>
        </div>

        <div>
          <center>
            <span>
              <Link to={`/parentlist`}>
                <Button
                  className="btn btn-success"
                  style={{ float: "left", marginTop: "3rem",marginRight:'2rem' }}
                >
                  View Parents
                </Button>
              </Link>
            </span>

            <span>
              <Link to={`/bookinglist`}>
                <Button
                  className="btn btn-success"
                  style={{ float: "left", marginTop: "3rem",marginRight:'2rem' }}
                >
                  View Bookings
                </Button>
              </Link>
            </span>

            <span>
              <Link to={`/childrenlist`}>
                <Button
                  className="btn btn-success"
                  style={{ float: "left", marginTop: "3rem" ,marginRight:'2rem'}}
                >
                  View Childrens
                </Button>
              </Link>
            </span>
          </center>
        </div>
      </div>
    </>
  );
}
export default PagingAndSorting;
