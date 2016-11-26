import { connect } from 'react-redux';
import Flower from '../Component/Page/Flower';

function mapStateToProps(state, ownProps) {
  return {
    flower: state.flowers.find(flower => flower.slug === ownProps.params.flowerSlug),
  };
}

export default connect(mapStateToProps)(Flower);
