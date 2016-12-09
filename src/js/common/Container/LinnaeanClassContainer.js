import { connect } from 'react-redux';
import LinnaeanClass from '../Component/Page/LinnaeanClass';

function mapStateToProps(state, ownProps) {
  const classe = state.classes.find(c => c.slug === ownProps.params.classSlug);

  return {
    class: classe,
    flowers: classe.flowers.map(id => ({ ...state.flowers.find(flower => flower.id === id) })),
  };
}

export default connect(mapStateToProps)(LinnaeanClass);
