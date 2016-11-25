import { connect } from 'react-redux'
import Home from '../Component/Page/Home';

function mapStateToProps(state, ownProps) {
  const volumes = state.volumes.map((volume) => ({
    ...volume,
    flowers: volume.flowers.map(id => ({ ...state.flowers.find(flower => flower.id === id) }))
  }));

  return {
    volumes,
  }
}

export default connect(mapStateToProps)(Home);
