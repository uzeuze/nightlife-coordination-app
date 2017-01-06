import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import spinnerImg from '../../public/assets/spinner.svg';
import { getUser } from '../actions';

import BusinessList from './BusinessList';
import SearchForm from './SearchForm';
import { API_URL } from '../../config';

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      businesses: [],
      lastSearch: '',
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.authenticated && this.props.user === null) {
      this.props.getUser();
    }

    if (this.props.user && this.props.user.lastSearch && !this.state.lastSearch ) {
      this.handleSubmit(this.props.user.lastSearch);
    }
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.authenticated && nextProps.user === null) {
      this.props.getUser();
    }

    if (nextProps.authenticated && this.state.lastSearch) {
      this.handleSubmit(this.state.lastSearch);
    }

    if (nextProps.user && nextProps.user.lastSearch && !this.state.lastSearch ) {
      this.handleSubmit(nextProps.user.lastSearch);
    }
  }

  handleSubmit(term) {
    const searchTerm = term.trim();
    this.setState({ lastSearch: searchTerm, loading: true });
    if (searchTerm) {
      if (this.props.authenticated) {
        axios.get(`${API_URL}/api/auth/search?q=${searchTerm}`,
          {
            headers: { authorization: localStorage.getItem('token') }
          }
        )
          .then((response) => {
            this.setState({ businesses: response.data.businesses, loading: false });
          });
      } else {
        axios.get(`${API_URL}/api/search?q=${searchTerm}`)
          .then((response) => {
            this.setState({ businesses: response.data.businesses, loading: false });
          });
      }
    }
  }

  renderBusinesses() {
    if (this.state.loading) {
      return (
        <div className="text-center">
          <img src={spinnerImg} />
        </div>
      );
    } else {
      return (
        <BusinessList businesses={this.state.businesses} />
      );
    }
  }

  render() {
    return (
      <div className="Welcome">
        <div className="Welcome__header">
          <h1 className="Welcome__header_text text-center">DISCOVER BEST PLACES IN YOUR AREA</h1>
        </div>
        <div className="Welcome_search container">
          <SearchForm onSubmit={this.handleSubmit} lastSearch={this.state.lastSearch}/>
        </div>
        {this.renderBusinesses()}
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
