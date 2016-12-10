import React, { Component, PropTypes } from 'react';
import FlowerCard from '../Flower/FlowerCard';
import Link from '../Link';

class LinnaeanClass extends Component {
  static propTypes = {
    params: PropTypes.shape({
      classSlug: React.PropTypes.string,
    }).isRequired,
    class: PropTypes.object.isRequired,
    orders: PropTypes.array.isRequired,
    flowers: PropTypes.arrayOf(PropTypes.shape({
      id: React.PropTypes.number,
      latinName: React.PropTypes.string,
    })).isRequired,
  };

  static defaultProps = {
    classes: [],
    orders: [],
    flowers: [],
  };

  render() {
    return (
      <div className="class">
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
            <Link itemProp="item" to={`/class/${this.props.class.slug}`}>
              Class <em itemProp="name">{this.props.class.name}</em>
            </Link>
            <meta itemProp="position" content="2" />
          </li>
        </ol>

        <div itemScope itemType="http://schema.org/DataCatalog">
          <header>
            <h1 itemProp="name">{this.props.class.name}</h1>
          </header>

          <section itemProp="description">
            {this.props.class.description.split('\n').map(paragraph =>
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
            <p>{this.props.class.source}</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default LinnaeanClass;
