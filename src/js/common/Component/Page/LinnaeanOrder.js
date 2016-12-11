import React, { Component, PropTypes } from 'react';
import { routerShape } from 'react-router';
import CustomPropTypes from '../../PropTypes';
import FlowerCard from '../Flower/FlowerCard';
import Link from '../Link';

class LinnaeanOrder extends Component {
  static propTypes = {
    params: PropTypes.shape({
      orderSlug: React.PropTypes.string.isRequired,
    }).isRequired,
    order: CustomPropTypes.linnaeanOrder.isRequired,
    flowers: PropTypes.arrayOf(CustomPropTypes.flower).isRequired,
    router: routerShape.isRequired,
  };

  static defaultProps = {
    order: {
      description: '',
    },
    flowers: [],
  };

  constructor(props) {
    super(props);

    if (!props.order.id) {
      props.router.replace('/404');
    }
  }

  render() {
    return (
      <div className="order">
        <ol itemScope itemType="http://schema.org/BreadcrumbList" role="nav">
          <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            <Link itemProp="item" to="/">
              <span name="The Botanical Magazine">The Botanical Magazine</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            <Link itemProp="item" to="/linnaean-system">
              <span itemProp="name">The Linnæan System of Botany</span>
            </Link>
            <meta itemProp="position" content="2" />
          </li>
          <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            <Link itemProp="item" to={`/order/${this.props.order.slug}`}>
              <em itemProp="name">{this.props.order.name}</em> order
            </Link>
            <meta itemProp="position" content="3" />
          </li>
        </ol>

        <div itemScope itemType="http://schema.org/DataCatalog">
          <header>
            <h1 itemProp="name">{this.props.order.name}</h1>
          </header>

          <section itemProp="description">
            {this.props.order.description.split('\n').map(paragraph =>
              <p className="indentation">{paragraph}</p>
            )}
          </section>

          <ul className="plates">
            {this.props.flowers.map((flower, i) =>
              <li itemScope itemProp="hasPart" itemType="https://schema.org/Dataset">
                <FlowerCard flower={flower} />
              </li>
            )}
          </ul>

          <footer>
            <p>{this.props.order.source}</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default LinnaeanOrder;
