import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../actions';

import BusinessList from './BusinessList';
import SearchForm from './SearchForm';

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      businesses: [],
      lastSearch: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.authenticated && this.props.user === null) {
      this.props.getUser();
      console.log('did get')
    }

    if (this.props.user && this.props.user.lastSearch && !this.state.lastSearch ) {
      this.handleSubmit(this.props.user.lastSearch);
      console.log('did submit')
    }
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.authenticated && nextProps.user === null) {
      this.props.getUser();
      console.log('props get')
    }

    if (nextProps.authenticated && this.state.lastSearch) {
      this.handleSubmit(this.state.lastSearch);
    }

    if (nextProps.user && nextProps.user.lastSearch && !this.state.lastSearch ) {
      this.handleSubmit(nextProps.user.lastSearch);
      console.log('props submit')
    }
  }

  handleSubmit(term) {
    const searchTerm = term.trim();
    this.setState({ lastSearch: searchTerm });
    if (searchTerm) {
      if (this.props.authenticated) {
        axios.get(`http://localhost:3000/api/auth/search?q=${searchTerm}`,
          {
            headers: { authorization: localStorage.getItem('token') }
          }
        )
          .then((response) => {
            this.setState({ businesses: response.data.businesses });
          });
      } else {
        axios.get(`http://localhost:3000/api/search?q=${searchTerm}`)
          .then((response) => {
            this.setState({ businesses: response.data.businesses });
          });
      }
    }
  }

  render() {
    return (
      <div className="Welcome">
        <div className="Welcome_search container">
          <SearchForm onSubmit={this.handleSubmit} lastSearch={this.state.lastSearch}/>
        </div>
        <BusinessList businesses={this.state.businesses} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { getUser })(Welcome);
