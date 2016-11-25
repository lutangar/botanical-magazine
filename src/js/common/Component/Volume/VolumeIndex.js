import React, { PropTypes, Component } from 'react';
import FlowerLink from '../Flower/FlowerLink';
import VolumeLink from '../Volume/VolumeLink';

class VolumeIndex extends Component {
  static propTypes = {
    number: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]).isRequired,
    flowers: PropTypes.array.isRequired,
  };

  static defaultProps = {
    flowers: [],
  };

  render() {
    return (
      <section className="volume-index">
        {this.props.flowers.length > 0 &&
          <ol start={this.props.flowers[0].id}>
            {this.props.flowers.map((flower, i) =>
              <li><FlowerLink key={i} flower={flower} /></li>
            )}
          </ol>
        }
      </section>
    );
  }
}

export default VolumeIndex;
