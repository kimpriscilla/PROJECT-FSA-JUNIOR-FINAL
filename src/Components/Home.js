import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Home({ campuses, students }) {
  return (
    <>
      <nav className="navbar navbar-expand-md">
        <div className="container-fluid">
          <button type="button" className="btn btn-outline-light">
            <Link to="/campuses">CAMPUSES ({campuses.length})</Link>
          </button>
          <button type="button" className="btn btn-outline-light">
            <Link to="/students"> STUDENTS ({students.length})</Link>
          </button>
        </div>
      </nav>
      <div>
        <img src="CampusConnection.png" className="center" />
      </div>
    </>
  );
}

const mapstate = ({ campuses, students }) => {
  return { campuses, students };
};

export default connect(mapstate)(Home);
