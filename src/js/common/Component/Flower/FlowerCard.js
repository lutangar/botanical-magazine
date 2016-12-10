import React, { Component, PropTypes } from 'react';
import FlowerLink from './FlowerLink';

class FlowerCard extends Component {
  static propTypes = {
    flower: PropTypes.object.isRequired,
    hasPart: PropTypes.bool,
  };

  render() {
    return (
      <FlowerLink
        flower={this.props.flower}
        className="plate shadow--2d"
        itemProp="http://schema.org/Dataset"
        itemScope
        hasPart={this.props.hasPart}
      >
        <meta itemProp="position" content={this.props.flower.id} />
        <div
          className="plate__background"
          style={{ background: `url('/img/flower/${this.props.flower.image}') top / cover` }}
        >
          <span className="plate__number">{this.props.flower.id}</span>
        </div>
        <h3 className="plate__title" itemProp="name">{this.props.flower.latinName}</h3>
        {this.props.flower.commonName &&
          <em itemProp="alternateName">{this.props.flower.commonName}</em>
        }
      </FlowerLink>
    );
  }
}

export default FlowerCard;
