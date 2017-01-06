import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOutUser } from '../actions';

class SignOut extends Component {
  componentWillMount() {
    this.props.signOutUser();
  }

  render() {
    return (
      <div className="SignOut">
        <h1 className="text-center">Sorry to see you go</h1>
      </div>
    );
  }
}

export default connect(null, { signOutUser })(SignOut);
