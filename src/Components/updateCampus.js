import React, { Component } from "react";
import { connect } from "react-redux";
import { _editCampus } from "../store";

class UpdateCampus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageUrl: "",
      address: "",
      description: "",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  onSubmit(ev) {
    ev.preventDefault();
    this.props.updateCampus(this.props.campus.id, this.state);
    this.setState({
      name: "",
      imageUrl: "",
      address: "",
      description: "",
    });
  }
  changeName(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  render() {
    const { onSubmit, changeName } = this;
    const { name, imageUrl, address, description } = this.state;

    return (
      <>
        <form onSubmit={onSubmit}>
          <h5>Edit Campus:</h5>
          <input
            value={name || ""}
            name="name"
            onChange={changeName}
            placeholder="EDIT NAME"
          />
          <input
            value={imageUrl || ""}
            name="imageUrl"
            onChange={changeName}
            placeholder="EDIT IMAGEURL"
          />
          <input
            value={address || ""}
            name="address"
            onChange={changeName}
            placeholder="EDIT ADDRESS"
          />
          <input
            value={description || ""}
            name="description"
            onChange={changeName}
            placeholder=" EDIT DESCRIPTION"
          />
          <button
            className="btn btn-outline-success"
            disabled={!name || !imageUrl || !address || !description}
          >
            Save
          </button>
        </form>
      </>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateCampus: (id, campus) => {
      dispatch(_editCampus(id, campus, history));
    },
  };
};
export default connect(null, mapDispatch)(UpdateCampus);
