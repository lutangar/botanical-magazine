import React, { PropTypes, Component } from 'react';
import Link from '../Link';

class FlowerLink extends Component {
  static propTypes = {
    flower: React.PropTypes.shape({
      slug: React.PropTypes.string,
      latinName: React.PropTypes.string,
      commonName: React.PropTypes.string,
      volume: React.PropTypes.number,
    }).isRequired,
    itemProp: React.PropTypes.string,
    isPartOf: React.PropTypes.bool,
  };

  static defaultProps = {
    isPartOf: false,
  };


  render() {
    const linkProps = {};
    if (this.props.itemProp) {
      linkProps.itemProp = this.props.itemProp;
    }
    const spanProps = {};
    if (this.props.itemProp || this.props.isPartOf === true) {
      spanProps.itemProp = 'name';
    }

    return (
      <Link {...linkProps} to={`/flower/${this.props.flower.slug}`}>
        <span {...spanProps}>
          {this.props.flower.latinName}, {this.props.flower.commonName}
        </span>
      </Link>
    );
  }
}

export default FlowerLink;
