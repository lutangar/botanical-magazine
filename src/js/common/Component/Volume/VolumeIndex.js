import React, { PropTypes, Component } from 'react';
import FlowerLink from '../Flower/FlowerLink';

class VolumeIndex extends Component {
  static propTypes = {
    flowers: PropTypes.array.isRequired,
  };

  static defaultProps = {
    flowers: [],
  };

  render() {
    return (
      <ol
        className="volume-index"
        start={this.props.flowers.length > 0 ? this.props.flowers[0].id : 0}
      >
        {this.props.flowers.map((flower, i) =>
          <li itemScope itemProp="hasPart" itemType="https://schema.org/CreativeWork">
            <FlowerLink key={i} flower={flower} isPartOf />
          </li>
        )}
      </ol>
    );
  }
}

export default VolumeIndex;
