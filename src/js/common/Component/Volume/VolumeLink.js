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
    const spanProps = {};
    if (this.props.itemProp) {
      linkProps.itemProp = this.props.itemProp;
      linkProps.itemScope = 'itemScope';
      linkProps.itemType = 'https://schema.org/PublicationVolume';
      spanProps.itemProp = 'name';
    }

    return (
      <Link {...linkProps} to={`/volume/${this.props.number}`}>
        <link itemProp="additionalType" href="http://schema.org/DataCatalog" />
        <span {...spanProps}>
          <link itemProp="url" href={`/volume/${this.props.number}`} />
          <span className="itemProp">The Botanical Magazine, </span>
          Volume {roman.roman(this.props.number)}
        </span>
      </Link>
    );
  }
}

export default VolumeLink;
