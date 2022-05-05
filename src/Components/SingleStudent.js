import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import UpdateStudent from "./updateStudent";

class SingleStudent extends Component {
  render() {
    const { student, campus } = this.props;

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

        <section id="singleStudent">
          <div>
            {" "}
            <img className="card-img-top" alt="..." src={student.imageUrl} />
          </div>
          <div className="student-detail">
            <h3>
              {student.firstName} {student.lastName}
            </h3>
            <p className="mt-3">
              <strong>Email: {""}</strong>
              <>{student.email}</>
            </p>
            <p className="mt-3">
              <strong>GPA: {""}</strong>
              {student.gpa}
            </p>
            <p className="mt-3">
              <strong> Attends: </strong>
              {student.campusId ? (
                <Link to={`/campuses/${student.campusId}`}>{campus?.name}</Link>
              ) : (
                " Currently not enrolled "
              )}
            </p>
          </div>

          <div>
            <UpdateStudent
              student={student}
              campus={campus}
              campuses={this.props.campuses}
            />
          </div>
        </section>
      </>
    );
  }
}

const mapState = (state, ownProps) => {
  const student =
    state.students.find(
      (student) => student.id === ownProps.match.params.id * 1
    ) || {};

  const campus = state.campuses.find(
    (campus) => campus.id === student.campusId
  );

  return {
    student,
    campus,
    ownProps,
    campuses: state.campuses,
  };
};

export default connect(mapState, null)(SingleStudent);
