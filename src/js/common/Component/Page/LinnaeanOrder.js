import React, { Component, PropTypes } from 'react';
import { routerShape } from 'react-router';
import Helmet from 'react-helmet';
import { BASE_URL } from '../../Constant';
import CustomPropTypes from '../../PropTypes';
import FlowerCard from '../Flower/FlowerCard';
import Link from '../Link';
import Home from '../Page/Home';

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

  get title() {
    return `${this.props.order.name} - The Linnæan System of Botany`;
  }

  get description() {
    return this.props.order.description;
  }

  get keywords() {
    return [
      this.props.order.name,
      'pistil',
      'pistils',
      ...Home.keywords,
    ].concat(', ');
  }

  get URL() {
    return `${BASE_URL}/order/${this.props.order.slug}`;
  }

  render() {
    return (
      <div className="order">
        <Helmet
          htmlAttributes={{ lang: 'en', amp: undefined }}
          title={this.title}
          base={{ target: '_blank', href: BASE_URL }}
          meta={[
            { name: 'description', content: this.description },
            { name: 'keywords', content: this.keywords },

            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:creator', content: '@lutangar' },
            { name: 'twitter:url', content: this.URL },
            { name: 'twitter:title', content: this.title },
            { name: 'twitter:description', content: this.description },

            { name: 'og:url', content: this.URL },
            { name: 'og:description', content: this.description },
            { name: 'og:title', content: this.title },
            { name: 'og:site_name', content: 'The Botanical Magazine' },
            { name: 'og:see_also', content: BASE_URL },
          ]}
          link={[
            { rel: 'canonical', href: this.URL },
          ]}
        />
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
