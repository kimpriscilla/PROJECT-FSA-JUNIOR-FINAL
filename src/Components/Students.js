import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import { _deleteStudent, _loadStudents, _loadCampuses } from "../store";
import StudentsForm from "./StudentsForm";

class Students extends Component {
  constructor() {
    super();
  }

  render() {
    const { students, campuses } = this.props;

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

        <section id="students">
          <div>
            <h3>
              {students.length
                ? `STUDENTS: (${students.length})`
                : "There are currently no students"}
            </h3>

            {students.map((student) => {
              return (
                <div key={student.id} className="studentList">
                  <div>
                    {student.firstName} {` `}
                    {}
                    {student.campusId === null
                      ? "no school currently"
                      : campuses.map((campus) =>
                          student.campusId === campus.id
                            ? "attends " + campus.name
                            : ""
                        )}{" "}
                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => {
                          this.props.delete_Student(student.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                    <div>
                      <Link to={`/students/${student.id}`}>
                        details for {student.firstName}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <Route exact path="/students" component={StudentsForm} />
          </div>
        </section>
      </>
    );
  }
}

const mapState = ({ students, campuses }) => {
  return { students, campuses };
};

const mapDispatch = (dispatch) => {
  return {
    delete_Student: (id) => {
      dispatch(_deleteStudent(id));
    },
    loadStudents: () => {
      dispatch(_loadStudents);
    },
  };
};

export default connect(mapState, mapDispatch)(Students);
