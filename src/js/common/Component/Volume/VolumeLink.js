import React, { PropTypes, Component } from 'react';
import roman from 'roman-decimal';
import Link from '../Link';

class VolumeLink extends Component {
  static propTypes = {
    number: React.PropTypes.number.isRequired,
    itemProp: React.PropTypes.string,
  };

  render() {
    const linkProps = {};
    if (this.props.itemProp) {
      linkProps.itemProp = this.props.itemProp;
    }
    const spanProps = {};
    if (this.props.itemProp) {
      spanProps.itemProp = 'name';
    }
    return (
      <Link {...linkProps} to={`/volume/${this.props.number}`}>
        <span {...spanProps}>
          <span className="itemProp">The Botanical Magazine, </span>
          Volume {roman.roman(this.props.number)}
        </span>
      </Link>
    );
  }
}

export default VolumeLink;
