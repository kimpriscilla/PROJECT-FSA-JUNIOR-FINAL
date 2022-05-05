import React, { Component } from "react";
import { connect } from "react-redux";
import { _editStudent } from "../store";

class UpdateStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      imageUrl: "",
      gpa: "",

      campusId: "",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(ev) {
    ev.preventDefault();
    this.props.updateStudent(this.props.student.id, this.state);
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      gpa: 0,
      imageUrl: "",
      campusId: "",
    });
  }
  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  render() {
    const { onSubmit, onChange } = this;
    const { firstName, lastName, email, gpa, campusId, imageUrl } = this.state;

    return (
      <>
        <form onSubmit={onSubmit}>
          <h5>Edit Student:</h5>
          <input
            value={firstName || ""}
            name="firstName"
            onChange={onChange}
            placeholder="FIRST NAME"
          />
          <input
            value={lastName || ""}
            name="lastName"
            onChange={onChange}
            placeholder="LAST NAME"
          />
          <input
            value={email || ""}
            name="email"
            onChange={onChange}
            placeholder="EMAIL"
          />
          <input
            value={imageUrl || ""}
            name="imageUrl"
            onChange={onChange}
            placeholder="IMAGEURL"
          />

          <input
            value={gpa || ""}
            name="gpa"
            onChange={onChange}
            placeholder="GPA"
          />

          <select value={campusId} name="campusId" onChange={onChange}>
            <option value="">--------------</option>
            {this.props.campuses.map((campus) => {
              campus.id = parseInt(campus.id);
              return (
                <option value={campus.id} key={campus.id}>
                  {campus.name}
                </option>
              );
            })}
          </select>

          <button
            className="btn btn-outline-success"
            disabled={
              !firstName ||
              !lastName ||
              !email ||
              !imageUrl ||
              !gpa ||
              !campusId
            }
          >
            SAVE
          </button>
        </form>
      </>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateStudent: (id, student) => {
      dispatch(_editStudent(id, student));
    },
  };
};

export default connect(null, mapDispatch)(UpdateStudent);
