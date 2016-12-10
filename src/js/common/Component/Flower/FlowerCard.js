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
        className="plate plate--thumbnail"
        itemScope
        isPartOf
      >
        <div
          className="plate__background"
          style={{ background: `url('/img/flower/${this.props.flower.image.name}') top / cover` }}
        >
          <span className="plate__number" itemProp="position">{this.props.flower.id}</span>
        </div>
        <div className="plate__text">
          <h3 className="plate__title" itemProp="name">{this.props.flower.latinName}</h3>
          {this.props.flower.commonName &&
            <em itemProp="alternateName">{this.props.flower.commonName}</em>
          }
        </div>
      </FlowerLink>
    );
  }
}

export default FlowerCard;
