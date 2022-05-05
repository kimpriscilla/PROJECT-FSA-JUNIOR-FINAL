import React, { Component } from "react";
import { connect } from "react-redux";
import { _unregisterId } from "../store";
import { Link } from "react-router-dom";
import UpdateCampus from "./updateCampus";

class SingleCampus extends Component {
  constructor() {
    super();
  }

  render() {
    const { campus, students } = this.props;

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

        <section id="singleCampus">
          <div>
            {" "}
            <img className="card-img-top" alt="..." src={campus.imageUrl} />
          </div>
          <div className="campus-details">
            <h3>{campus.name}</h3>
            <p className="mt-3">
              <strong>Address:{""} </strong>
              {campus.address}
            </p>
            <p className="mt-3">
              <strong>Description:{""} </strong>
              {campus.description}
            </p>
            <div className="mt-3">
              <strong>Enrolled Students: {""}</strong>
              {students.length
                ? students.map((student) => (
                    <div key={student.id}>
                      <div>
                        <Link to={`/students/${student.id}`}>
                          {student.firstName}
                        </Link>{" "}
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => {
                            this.props.unregisterStudent(student); //send student, not just their id
                          }}
                        >
                          unregister{" "}
                        </button>
                      </div>
                    </div>
                  ))
                : "Currently no students enrolled"}
            </div>
          </div>
          <div>
            <UpdateCampus campus={campus} campuses={this.props.campuses} />
          </div>
        </section>
      </>
    );
  }
}

const mapState = (state, ownProps) => {
  const campusId = ownProps.match.params.id * 1;

  const campus = state.campuses.find((campus) => campus.id === campusId) || {};

  const students = state.students.filter(
    (student) => student.campusId === campusId
  );

  return {
    campuses: state.campuses,
    students,
    campus,
    ownProps,
  };
};
const mapDispatch = (dispatch) => {
  return {
    unregisterStudent: (id) => {
      dispatch(_unregisterId(id));
    },
  };
};

export default connect(mapState, mapDispatch)(SingleCampus);
