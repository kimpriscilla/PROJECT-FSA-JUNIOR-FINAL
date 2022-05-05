import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { _deleteCampus, _loadCampuses } from "../store";
import CampusForm from "./CampusForm";

class Campuses extends Component {
  constructor() {
    super();
  }

  render() {
    const { campuses, students } = this.props;

    return (
      <>
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <button type="button" className="btn btn-link">
              <Link to="/">HOME</Link>
            </button>
            <button type="button" className="btn btn-link">
              {" "}
              <Link to="/campuses">CAMPUSES </Link>
            </button>
            <button type="button" className="btn btn-link">
              <Link to="/students">STUDENTS</Link>
            </button>
          </div>
        </nav>

        <hr></hr>

        <section id="campuses">
          <div>
            <h3>
              {campuses.length
                ? `CAMPUSES: (${campuses.length})`
                : "There are currently no campuses"}
            </h3>

            {campuses.map((campus) => {
              let length = students.reduce((prevVal, student) => {
                return student.campusId === campus.id
                  ? (prevVal += 1)
                  : prevVal;
              }, 0);
              return (
                <div className="campusList" key={campus.id}>
                  {campus.name} {` (Enrolled: ${length})`}
                  <div>
                    <Link to={`/campuses/${campus.id}`}>
                      Details for {campus.name}
                    </Link>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => this.props.delete_Campus(campus.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <CampusForm />
          </div>
        </section>
      </>
    );
  }
}

const mapState = ({ campuses, students }) => {
  return { campuses, students };
};

const mapDispatch = (dispatch) => {
  return {
    load_Campuses: () => {
      dispatch(_loadCampuses());
    },
    delete_Campus: (id) => {
      dispatch(_deleteCampus(id));
    },
  };
};
export default connect(mapState, mapDispatch)(Campuses);
