import { connect } from 'react-redux';
import LinnaeanSystem from '../Component/Page/LinnaeanSystem';

function mapStateToProps(state) {
  const classes = state.classes.sort((a, b) => a.id > b.id ? 1 : -1).map(classe => ({
    ...classe,
    orders: classe.orders.map(id => ({ ...state.orders.find(o => o.id === id) })),
    classes: classe.classes.map(id => ({ ...state.classes.find(c => c.id === id) })),
  }));

  return {
    classes
  };
}

export default connect(mapStateToProps)(LinnaeanSystem);
