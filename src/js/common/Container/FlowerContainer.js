import { connect } from 'react-redux';
import Flower from '../Component/Page/Flower';
import { withRouter } from 'react-router'

function mapStateToProps(state, ownProps) {
  const flower = state.flowers.find(flower => flower.slug === ownProps.params.flowerSlug);

  return {
    flower,
    class: state.classes.find(c => c.id === flower.class),
    order: state.orders.find(o => o.id === flower.order),
  };
}

export default connect(mapStateToProps)(withRouter(Flower));
