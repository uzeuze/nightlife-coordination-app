import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getUser } from '../actions';

class Profile extends Component {
  componentWillMount() {
      this.props.getUser();
  }

  render() {
    if(!this.props.user) {
      return <div>Loading...</div>
    }
    const { email, lastSearch } = this.props.user;

    return (
      <div className="Profile">
        <h1>{email}</h1>
        <div>
          <span>Last search:</span>
          <Link to='/'>{lastSearch}</Link>
        </div>
        <div>
          <h2>My Events</h2>
        </div>
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
