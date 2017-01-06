import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios from 'axios';
import { getUser } from '../actions';

class Profile extends Component {
  componentWillMount() {
      this.props.getUser();
  }

  handleLeave(business) {
    axios.post('http://localhost:3000/api/user/leave', { business },
      {
        headers: { authorization: localStorage.getItem('token') }
      }
    ).then(() => {
      this.props.getUser();
    });
  }

  renderBusiness(business) {
    return (
      <div key={business}>
        <span>{business}</span>
        <button className="btn btn-danger" onClick={this.handleLeave.bind(this, business)}>I WON'T GO</button>
      </div>
    );
  }

  render() {
    if(!this.props.user) {
      return <div>Loading...</div>
    }
    const { email, lastSearch, events } = this.props.user;

    return (
      <div className="Profile">
        <h1>{email}</h1>
        <div>
          <span>Last search:</span>
          <Link to='/'>{lastSearch}</Link>
        </div>
        <div>
          <h2>My Events</h2>
          <div>
            {events.map(business => this.renderBusiness(business)) }
          </div>
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
