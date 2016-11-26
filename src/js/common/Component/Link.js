import React, { PropTypes, Component } from 'react';
import { Link as RouterLink } from 'react-router';

class Link extends Component {
  render() {
    return <RouterLink {...this.props} activeClassName="active" />
  }
}

export default Link;
