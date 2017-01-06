import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class BusinessItem extends Component {
  constructor() {
    super();
    this.state = {
      going: false
    }
  }
  componentWillMount() {
    if(this.props.user) {
      if(this.props.user.events.indexOf(this.props.business.name) !== -1 ) {
        this.setState({ going: true });
      }
    }
  }

  handleJoin(business) {
    axios.post('http://localhost:3000/api/user/going', { business },
      {
        headers: { authorization: localStorage.getItem('token') }
      }
    ).then(() => {
      this.setState({ going: !this.state.going });
    })
  }

  handleLeave(business) {
    axios.post('http://localhost:3000/api/user/leave', { business },
      {
        headers: { authorization: localStorage.getItem('token') }
      }
    ).then(() => {
      this.setState({ going: !this.state.going });
    })
  }

  renderButton(business) {
    if(this.state.going) {
      return(
        <div>
          <button className="btn btn-danger" onClick={this.handleLeave.bind(this, business.name)}>I WON'T GO</button>
        </div>
      );
    } else {
      return (
        <div>
          <span>Want to go?</span>
          <button className="btn btn-success" onClick={this.handleJoin.bind(this, business.name)}>JOIN</button>
        </div>
      );
    }
  }

  render() {
    const { business } = this.props;
    return (
      <div className="BusinessItem well container">
        <div>
          <img src={business.image_url} />
        </div>
        <div>
          {business.name}
        </div>
        <div><img src={business.rating_img_url} /></div>
        <p>{business.snippet_text}</p>
        {this.renderButton(business)}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(BusinessItem);
