import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import BusinessList from './BusinessList';
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

  render() {
    return (
      <div className="Welcome">
        <div className="Welcome_search container">
          <SearchForm onSubmit={this.handleSubmit} />
        </div>
        <BusinessList businesses={this.state.businesses} />
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
