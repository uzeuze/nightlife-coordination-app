import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../actions';

class Profile extends Component {
  componentWillMount() {
      this.props.getUser();
  }

  render() {
    if(!this.props.user) {
      return <div>Loading...</div>
    }
    return (
      <div className="Profile">
        <h1>{this.props.user.email}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { getUser })(Profile);
