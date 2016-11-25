import { connect } from 'react-redux'
import Flower from '../Component/Page/Flower';

function mapStateToProps(state, ownProps) {
  console.log(state, ownProps);
  return {
    flower: state.flowers.find(flower => {

      console.log(flower.slug);
      console.log(ownProps.flowerSlug);

      return flower.slug === ownProps.params.flowerSlug
    }),
  }
}

export default connect(mapStateToProps)(Flower);
