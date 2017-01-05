import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import SearchForm from './SearchForm';

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      businesses: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(term) {
    const searchTerm = term.trim();
    axios.post(`http://localhost:3000/api/search?q=${searchTerm}`)
      .then((response) => {
        this.setState({ businesses: response.data.businesses });
      });
  }

  renderBusinesses() {
    const businesses = this.state.businesses.map((business) => {
      return (
        <li key={business.id}>{business.name}</li>
      );
    });
    return businesses;
  }

  render() {
    return (
      <div className="Welcome">
        <div className="Welcome_search container">
          <SearchForm onSubmit={this.handleSubmit} />
        </div>
        <ul>
          {this.renderBusinesses()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps)(Welcome);
