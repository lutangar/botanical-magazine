import React, { PropTypes, Component } from 'react';
import Link from '../Link';

class FlowerLink extends Component {
  static propTypes = {
    flower: PropTypes.shape({
      slug: PropTypes.string,
      latinName: PropTypes.string,
      commonName: PropTypes.string,
      volume: PropTypes.number,
    }).isRequired,
    itemScope: PropTypes.bool,
    itemProp: PropTypes.string,
    isPartOf: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
      PropTypes.string,
    ])
  };

  static defaultProps = {
    isPartOf: false,
  };

  render() {
    const linkProps = {};
    linkProps.className = this.props.className;
    if (this.props.itemProp) {
      linkProps.itemScope = this.props.itemScope;
      linkProps.itemType = 'http://schema.org/Dataset';
      linkProps.itemProp = this.props.itemProp;
    }

    const spanProps = {};
    if (this.props.itemProp || this.props.isPartOf === true) {
      spanProps.itemProp = 'name';
      linkProps.itemProp = 'url';
    }

    return (
      <Link {...linkProps} to={`/flower/${this.props.flower.slug}`}>
        {this.props.children ||
          <span {...spanProps}>
            {`${this.props.flower.latinName}, ${this.props.flower.commonName}`}
          </span>
        }
      </Link>
    );
  }
}

export default FlowerLink;
