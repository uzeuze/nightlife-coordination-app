import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { loginUser, clearAuthError } from '../actions';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group">
    <input className="form-control" {...input} placeholder={label} type={type} />
    { touched && error && <div className="error">{error}</div> }
  </div>
);

class LoginForm extends Component {
  componentWillMount() {
    this.props.clearAuthError();
  }

  handleFormSubmit({ email, password }) {
    this.props.loginUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="email" type="email" component={renderField} label="Email" />
        <Field name="password" type="password" component={renderField} label="Password" />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Log In</button>
      </form>
    );
  }
}

const validate = (formProps) => {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email address';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  } else if (formProps.password.length < 6) {
    errors.password = 'Password should be at least 6 characters';
  }

  return errors;
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.error
  };
};

export default connect(mapStateToProps, { loginUser, clearAuthError })(reduxForm({
  form: 'login',
  validate
})(LoginForm));
