import { connect } from 'react-redux';
import Home from '../Component/Page/Home';

function mapStateToProps(state) {
  const volumes = state.volumes.sort((a, b) => a.number > b.number ? 1 : -1).map(volume => ({
    ...volume,
    flowers: volume.flowers.map(id => ({ ...state.flowers.find(flower => flower.id === id) })),
  }));

  return {
    volumes,
  };
}

export default connect(mapStateToProps)(Home);
