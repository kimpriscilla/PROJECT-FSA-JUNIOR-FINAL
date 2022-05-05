import React, { Component } from "react";
import { connect } from "react-redux";
import { _addCampus } from "../store";

class CampusForm extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      imageUrl: "",
      address: "",
      description: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeUrl = this.changeUrl.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
  }

  changeName(ev) {
    this.setState({ name: ev.target.value });
  }
  changeUrl(ev) {
    this.setState({ imageUrl: ev.target.value });
  }
  changeAddress(ev) {
    this.setState({ address: ev.target.value });
  }
  changeDescription(ev) {
    this.setState({ description: ev.target.value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    this.props.addCampus(this.state);
    this.setState({
      name: "",
      imageUrl: "",
      address: "",
      description: "",
    });
  }
  render() {
    const { name, imageUrl, address, description } = this.state;
    const {
      changeName,
      onSubmit,
      changeUrl,
      changeAddress,
      changeDescription,
    } = this;

    return (
      <>
        <form onSubmit={onSubmit} className="form">
          <h6>Add Campus:</h6>
          <table>
            <tbody>
              <tr>
                <td>
                  {" "}
                  <input
                    value={name}
                    name="name"
                    onChange={changeName}
                    placeholder="Name"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <input
                    value={imageUrl}
                    name="imageUrl"
                    onChange={changeUrl}
                    placeholder="ImageUrl"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <input
                    value={address}
                    name="address"
                    onChange={changeAddress}
                    placeholder="Address"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    value={description}
                    name="description"
                    onChange={changeDescription}
                    placeholder="Description"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-outline-success">SAVE</button>
        </form>
      </>
    );
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    addCampus: (campus) => {
      dispatch(_addCampus(campus, history));
    },
  };
};

export default connect(null, mapDispatch)(CampusForm);
