import React, { PropTypes, Component } from 'react';
import CustomPropTypes from '../../PropTypes';
import FlowerCard from '../Flower/FlowerCard';

class VolumeIndex extends Component {
  static propTypes = {
    flowers: PropTypes.arrayOf(CustomPropTypes.flower).isRequired,
  };

  static defaultProps = {
    flowers: [],
  };

  render() {
    return (
      <ol
        className="plates"
        start={this.props.flowers.length > 0 ? this.props.flowers[0].id : 0}
      >
        {this.props.flowers.map((flower, i) =>
          <li itemScope itemProp="hasPart" itemType="https://schema.org/Dataset">
            <FlowerCard flower={flower} />
          </li>
        )}
      </ol>
    );
  }
}

export default VolumeIndex;
