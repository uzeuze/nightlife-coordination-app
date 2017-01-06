import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  InputGroup,
  Glyphicon,
} from 'react-bootstrap';

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.searchTerm && nextProps.lastSearch) {
      this.setState({ searchTerm: nextProps.lastSearch });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.searchTerm);
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="SearchForm">
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              value={this.state.searchTerm}
              onChange={this.handleChange}
              placeholder="Enter a city"
            />
            <InputGroup.Addon onClick={this.handleSubmit}>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
      </form>
    );
  }
}

export default SearchForm;
