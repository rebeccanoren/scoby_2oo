import React, { Component } from 'react'
import { withUser } from "../components/Auth/withUser";
import FormProfileSettings from '../components/Forms/FormProfileSettings';

class ProfileSettings extends Component {


  render() {

    return (
      <div>
        <FormProfileSettings />
      </div>
    )
  }
}

export default withUser(ProfileSettings);