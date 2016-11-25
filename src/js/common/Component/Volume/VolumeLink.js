import React, { PropTypes, Component } from 'react';
import Link from '../Link';
import roman from 'roman-decimal';

class VolumeLink extends Component {
  static propTypes = {
    number: React.PropTypes.number.isRequired,
    itemProp: React.PropTypes.string,
  };

  render() {
    return (
      <Link itemProp={this.props.itemProp} to={`/volume/${this.props.number}`}>
        <span itemProp="name">Volume {roman.roman(this.props.number)}</span>
      </Link>
    );
  }
}

export default VolumeLink;
