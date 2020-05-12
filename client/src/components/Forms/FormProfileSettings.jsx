import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import "../../styles/form.css";

class FormProfileSettings extends Component {
  state = {
    user: []
  };

  componentDidMount() {
    apiHandler.getProfileSettings(this.props.authContext.user._id).then((apiResponse) => {
      this.setState({ user: apiResponse })
    }).catch()
  }

  handleChange = (event) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { userInfo } = this.state;
    apiHandler
      .updateProfileSettings(this.props.authContext.user._id)
      .then((data) => {
        userInfo.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (

      <section className="form-section">
        <header className="header">
          <h1>
            Edit your profile
          </h1>
        </header>

        <form
          autoComplete="off"
          className="form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <div className="user-image round-image">
            <img src={this.state.user.profileImg} alt={this.state.user.firstName} /></div>
          <div className="form-group">
            <label className="custom-upload label" htmlFor="image">
              Upload new image
						</label>
            <input className="input" name="image" id="image" type="file" />
          </div>


          <div className="form-group">
            <label className="label" htmlFor="firstName">
              First name
            </label>
            <input
              className="input"
              id="firstName"
              type="text"
              name="firstName"
              defaultValue={this.state.user.firstName}
              placeholder="Enter first name"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="input"
              id="lastName"
              type="text"
              name="lastName"
              defaultValue={this.state.user.lastName}
              placeholder="Enter last name"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input className="input" id="email" type="email" name="email" defaultValue={this.state.user.email} disabled={true} />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              id="password"
              type="password"
              name="password"
              placeholder="Change password"
            />
          </div>

          <button className="btn-submit">Let's go!</button>
        </form>

      </section>
    );
  }
}

export default withRouter(withUser(FormProfileSettings));
