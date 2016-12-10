import { connect } from 'react-redux';
import LinnaeanClass from '../Component/Page/LinnaeanClass';
import { withRouter } from 'react-router'

function mapStateToProps(state, ownProps) {
  const classe = state.classes.find(c => c.slug === ownProps.params.classSlug);

  if (!classe) {
    return {};
  }

  return {
    class: classe,
    flowers: classe.flowers.map(id => ({ ...state.flowers.find(flower => flower.id === id) })),
  };
}

export default connect(mapStateToProps)(withRouter(LinnaeanClass));
