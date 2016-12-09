import React, { Component, PropTypes } from 'react';

class Person extends Component {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    prop: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
  };

  render() {
    return (
      <a
        id={this.props.id}
        className={this.props.className}
        itemScope
        itemProp={this.props.prop}
        itemType="https://schema.org/Person"
        href={this.props.url}
      >
        <span itemProp="name">{this.props.name}</span>
      </a>
    );
  }
}

export default Person;
