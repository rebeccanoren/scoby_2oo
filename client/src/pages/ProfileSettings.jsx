import React, { Component } from 'react'
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import FormProfileSettings from '../components/Forms/FormProfileSettings';

class ProfileSettings extends Component {
  state = {
    user: [],
  };

  componentDidMount() {
    apiHandler.getProfileSettings(this.props.authContext.user._id).then((apiResponse) => {
      console.log(apiResponse)
      this.setState({ user: apiResponse })
    }).catch()
  }

  render() {

    return (
      <div>
        <FormProfileSettings user={this.state.user} />
      </div>
    )
  }
}

export default withUser(ProfileSettings);