import { connect } from 'react-redux';
import Volume from '../Component/Page/Volume';

function mapStateToProps(state, ownProps) {
  let volume = state.volumes.find(
    volume => volume.number === parseInt(ownProps.params.volumeNumber, 10),
  );

  volume = {
    ...volume,
    flowers: volume.flowers.map(id => ({ ...state.flowers.find(flower => flower.id === id) })),
  };

  return { volume };
}

export default connect(mapStateToProps)(Volume);
