import { connect } from 'react-redux';
import Flower from '../Component/Page/Flower';
import { withRouter } from 'react-router'

function mapStateToProps(state, ownProps) {
  const flower = state.flowers.find(flower => flower.slug === ownProps.params.flowerSlug);

  if (!flower) {
    return {};
  }

  return {
    previousFlower: state.flowers.find(f => f.id === flower.id - 1),
    flower,
    nextFlower: state.flowers.find(f => f.id === flower.id + 1),
    class: state.classes.find(c => c.id === flower.class),
    order: state.orders.find(o => o.id === flower.order),
    genus: state.genera.find(g => g.id === flower.genus),
    species: flower.species.map(s => state.flowers.find(f => f.id === s)),
  };
}

export default connect(mapStateToProps)(withRouter(Flower));
