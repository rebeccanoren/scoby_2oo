import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import "../../styles/form.css";

class FormProfileSettings extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.authContext.user !== state.user) {
      return {
        user: props.authContext.user,
        tempUrl: "",
        firstName: props.authContext.user.firstName,
        lastName: props.authContext.user.lastName,
        city: props.authContext.user.city,
        phoneNumber: props.authContext.user.phoneNumber,
      }
    } else return null
  }

  state = {
    user: null,
    tempUrl: "",
    firstName: "",
    lastName: "",
    city: "",
    phoneNumber: ""
  }

  // componentDidMount() {
  //   apiHandler.getProfileSettings(this.props.authContext.user._id).then((apiResponse) => {
  //     this.setState({ user: apiResponse })
  //   }).catch()
  // }

  handleChange = (event) => {
    const data = { [event.target.name]: event.target.value };
    if (event.target.type === "file") {
      data.tempUrl = URL.createObjectURL(event.target.files[0]);
      data[event.target.name] = event.target.files[0];
    }
    // const value =
    //   event.target.type === "file" ? event.target.files[0] : event.target.value;
    // const key = event.target.name;
    this.setState(data);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let errors = { is: false, messages: [] };
    console.log(this.state)
    if (this.state.firstName === "") {
      errors.is = true;
      errors.messages.push('enter first name');
    }

    if (this.state.lastName === "") {
      errors.is = true;
      errors.messages.push('enter last name');
    }

    if (this.state.city === "") {
      errors.is = true;
      errors.messages.push('enter city');
    }

    if (this.state.phoneNumber === "") {
      errors.is = true;
      errors.messages.push('enter phone number');
    }

    if (errors.is) {
      this.setState({ errors: errors.messages })
      console.log(this.state.errors)
      return;
    } else {
      const data = new FormData();

      if (this.state.firstName) {
        data.append("firstName", this.state.firstName)
      }

      if (this.state.lastName) {
        data.append("lastName", this.state.lastName)
      }

      if (this.state.city) {
        data.append("city", this.state.city)
      }

      if (this.state.phoneNumber) {
        data.append("phoneNumber", this.state.phoneNumber)
      }

      if (this.state.profileImg) {
        data.append("profileImg", this.state.profileImg)
      }

      apiHandler.updateProfileSettings(this.props.authContext.user._id, data)
        .then((data) => {
          // console.log(data)
          this.props.authContext.setUser(data);
          this.props.history.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    // if (this.state.user === null) {
    //   return <p>Loading..</p>
    // }
    console.log(this.state)
    let imgSrc = null
    if (this.state.tempUrl === '') imgSrc = this.props.authContext.user.profileImg
    else imgSrc = this.state.tempUrl

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
            <img src={imgSrc} alt={this.props.authContext.user.firstName} /></div>
          <div className="form-group">
            <label className="custom-upload label" htmlFor="image">
              Upload new image
						</label>
            <input className="input" name="profileImg" id="image" type="file" />
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
              defaultValue={this.props.authContext.user.firstName}
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
              defaultValue={this.props.authContext.user.lastName}
              placeholder="Enter last name"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="city">
              City
            </label>
            <input
              className="input"
              id="city"
              type="text"
              name="city"
              defaultValue={this.props.authContext.user.city}
              placeholder="Enter city"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="phoneNumber">
              Phone number
            </label>
            <input
              className="input"
              id="phoneNumber"
              type="text"
              name="phoneNumber"
              defaultValue={this.props.authContext.user.phoneNumber}
              placeholder="Enter phone number"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input className="input" id="email" type="email" name="email" defaultValue={this.props.authContext.user.email} disabled={true} />
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
