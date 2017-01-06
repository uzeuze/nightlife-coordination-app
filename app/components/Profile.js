import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios from 'axios';
import { getUser } from '../actions';
import spinnerImg from '../../public/assets/spinner.svg';

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
      <div key={business} className="BusinessItem_business">
        <span className="BusinessItem_business_name">{business}</span>
        <button className="btn btn-danger" onClick={this.handleLeave.bind(this, business)}>I WON'T GO</button>
      </div>
    );
  }

  render() {
    if(!this.props.user) {
      return (
        <div className="text-center">
          <img src={spinnerImg} />
        </div>
      );
    }
    const { email, lastSearch, events } = this.props.user;

    return (
      <div className="Profile container">
        <h1 className="Profile__email">Email: <span>{email}</span></h1>
        <div className="Profile__last_search_container">
          <span className="Profile__last_search">Last search:</span>
          <Link to='/' className="Profile__last_search_link">{lastSearch}</Link>
        </div>
        <div>
          <h2 className="Profile__events">My Events</h2>
          <div>
            { events.length <= 0 ? <div>You haven't joined to any event</div> : null }
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
