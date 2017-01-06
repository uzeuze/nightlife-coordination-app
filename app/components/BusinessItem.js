import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import { showAuthModal } from '../actions';

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

  showSignUpModal() {
    this.props.showAuthModal('signUp');
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
          { this.props.user ?
            <button className="BusinessItem__join_button btn btn-success" onClick={this.handleJoin.bind(this, business.name)}>JOIN</button>
            :
            <button className="BusinessItem__join_button btn btn-success" onClick={this.showSignUpModal.bind(this)}>JOIN</button>
          }
        </div>
      );
    }
  }

  render() {
    const { business } = this.props;
    return (
      <div className="BusinessItem well container">
        <Grid>
          <Row>
            <Col sm={2}>
              <img src={business.image_url} />
            </Col>
            <Col sm={10}>
              <h4>{business.name}</h4>
              <div><img src={business.rating_img_url} /></div>
              <p>{business.snippet_text}</p>
              {this.renderButton(business)}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, { showAuthModal })(BusinessItem);
