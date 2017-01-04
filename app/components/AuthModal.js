import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { showAuthModal, hideAuthModal } from '../actions';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

class AuthModal extends Component {
  constructor() {
    super();
    this.handleModalHide = this.handleModalHide.bind(this);
    this.handleModalChange = this.handleModalChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authenticated) {
      this.handleModalHide();
    }
  }

  handleModalHide() {
    this.props.hideAuthModal();
  }

  handleModalChange() {
    if (this.props.modal === 'login') {
      this.props.showAuthModal('signUp');
    } else if (this.props.modal === 'signUp') {
      this.props.showAuthModal('login');
    }
  }

  renderForm() {
    if (this.props.modal === 'login') {
      return (
          <LoginForm />
      );
    } else if (this.props.modal === 'signUp') {
      return (
          <SignUpForm />
      );
    }
  }

  render() {
    let title;
    let linkText;
    let show = false;

    if (this.props.modal === 'login') {
      title = 'Log In';
      linkText = 'Don\'t have an account? Register.';
      show = true;
    } else if (this.props.modal === 'signUp') {
      title = 'Let\'s get started';
      linkText = 'Already have an account? Login.';
      show = true;
    }

    return (
      <Modal
        show={show}
        onHide={this.handleModalHide}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderForm()}
          <a onClick={this.handleModalChange}>{linkText}</a>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    modal: state.auth.modal
  };
};

export default connect(mapStateToProps, { showAuthModal, hideAuthModal })(AuthModal);
