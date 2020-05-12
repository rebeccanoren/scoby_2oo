import React, { Component } from 'react'
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";

class ProfileSettings extends Component {
  componentDidMount() {
    apiHandler.profileSettings(this.props.authContext.user._id).then((apiResponse) => {
      this.setState({ user: apiResponse })
    }).catch()
  }

  render() {
    console.log(this.props)
    return (
      <div>
        {/* {this.state.user.name} */}
      </div>
    )
  }
}

export default withUser(ProfileSettings);