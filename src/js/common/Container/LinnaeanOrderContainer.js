import { connect } from 'react-redux';
import LinnaeanOrder from '../Component/Page/LinnaeanOrder';

function mapStateToProps(state, ownProps) {
  const order = state.orders.find(order => order.slug === ownProps.params.orderSlug);

  return {
    order,
    flowers: order.flowers.map(id => ({ ...state.flowers.find(flower => flower.id === id) })),
  };
}

export default connect(mapStateToProps)(LinnaeanOrder);
