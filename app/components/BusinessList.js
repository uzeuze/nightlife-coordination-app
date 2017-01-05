import React, { Component } from 'react';
import BusinessItem from './BusinessItem';

class BusinessList extends Component {
  renderBusinesses() {
    const businesses = this.props.businesses.map((business) => {
      return (
        <BusinessItem key={business.id} business={business} />
      );
    });
    return businesses;
  }

  render() {
    return (
      <div className="BusinessList">
        {this.renderBusinesses()}
      </div>
    );
  }
}

export default BusinessList;
