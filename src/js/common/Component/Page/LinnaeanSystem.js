import React, { Component, PropTypes } from 'react';
import roman from 'roman-decimal';
import Link from '../Link';

class LinnaeanSystem extends Component {
  static propTypes = {
    classes: PropTypes.array.isRequired,
  };

  static defaultProps = {
    classes: [],
  };

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
        </ol>

        <h1 itemProp="name">The Linnæan System of Botany</h1>

        <div itemScope itemType="http://schema.org/DataCatalog">
          <div className="mdl-grid">
            <div className="sheet mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet">
              <header>
                <h2>Classes and Orders</h2>
              </header>

              <section itemProp="description">
                <p className="indentation">
                  This system of Botanical arrangement which, although founded upon a distinction in nature,
                  so far as it regards the Stamina and Pistil,
                  does not otherwise imply any natural affinity ; consequently arranging plants together by these characters,
                  is to be regarded in the economy of nature, as purely artificial.
                </p>

                <p className="indentation">
                  The Classes of Linnaeus are twenty-four, twenty-three of which have their distinctions
                  founded on the number and situation or arrangement of the Stamina ; and the twenty-fourth is made to include all those plants which,
                  from the obscurity or uncertainty of their fructification did not allow of being included in either of the preceding Classes.
                </p>
              </section>

              <ol className="taxonomy">
              {this.props.classes.map((classe, i) =>
                <li>
                  <Link to={`/class/${classe.slug}`}>
                    <span>{classe.name}</span>
                  </Link>
                  <ol>
                    {classe.orders.map((order, i) =>
                    <li>
                      <Link to={`/order/${order.slug}`}>
                        <span>{order.name}</span>
                      </Link>
                    </li>
                    )}
                    {classe.classes.map((c, i) =>
                        <li>
                      <Link to={`/class/${c.slug}`}>
                        <span>{c.name}</span>
                      </Link>
                    </li>
                    )}
                  </ol>
                </li>
              )}
              </ol>
            </div>

            <figure className="illustration mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet">
              <img
                id="image"
                itemProp="image"
                src={`/img/linnaean_system_character_first_ten_classes.jpg`}
                alt="The character of the first ten classes of the Linnaean System of Botany"
              />
              <figcaption>The character of the first ten classes of The Linnaean System of Botany</figcaption>
            </figure>
          </div>

          <footer>
            <p>See also <a href="https://books.google.fr/books?id=y1JDAQAAMAAJ">The Classes and Orders of the Linnaean System of Botany</a> on google books.</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default LinnaeanSystem;
