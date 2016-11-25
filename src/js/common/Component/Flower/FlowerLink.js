import React, { PropTypes, Component } from 'react';
import Link from '../Link';

class FlowerLink extends Component {
  static propTypes = {
    flower: React.PropTypes.shape({
      slug: React.PropTypes.string,
      latinName: React.PropTypes.string,
      volume: React.PropTypes.number,
    }).isRequired,
    itemProp: React.PropTypes.string,
  };

  render() {
    return (
      <Link itemProp={this.props.itemProp} to={`/flower/${this.props.flower.slug}`}>
        <span itemProp="name">{this.props.flower.latinName}</span>
      </Link>
    );
  }
}

export default FlowerLink;
