import React, { Component, PropTypes } from 'react';
import Link from '../Link';
import VolumeLink from '../Volume/VolumeLink';
import FlowerLink from '../Flower/FlowerLink';

class Flower extends Component {
  static propTypes = {
    flower: PropTypes.object.isRequired,
    params: React.PropTypes.shape({
      volumeNumber: React.PropTypes.number,
      flowerSlug: React.PropTypes.string,
    }).isRequired,
    class: PropTypes.object,
    order: PropTypes.object,
    router: PropTypes.object,
  };

  static defaultProps = {
    flower: {
      genericCharacters: [],
      synonyms: [],
      pages: [],
    },
  };

  constructor(props) {
    super(props);

    if (!props.flower.id) {
      props.router.replace('/404');
    }
  }

  render() {
    // parse description for: flower names, country, reference (what kind?)
    return (
      <div className="flower">
        <ol itemScope itemType="http://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            <Link itemProp="item" to="/">The Botanical Magazine</Link>
            <meta itemProp="position" content="1" />
          </li>
          <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            <VolumeLink itemProp="item" number={this.props.flower.volume} />
            <meta itemProp="position" content="2" />
          </li>
          <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            <FlowerLink itemProp="item" flower={this.props.flower} />
            <meta itemProp="position" content="3" />
          </li>
        </ol>

        <article itemScope itemType="http://schema.org/Dataset">
          <meta itemProp="position" content={this.props.flower.id} />

          <div className="mdl-grid">
            <div className="sheet mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet">
              <div id="title">
                <h1 itemProp="name">{this.props.flower.latinName}</h1>
                {this.props.flower.commonName &&
                  <em itemProp="alternateName">{this.props.flower.commonName}</em>
                }
              </div>
              <dl>
                {this.props.flower.classAndOrder &&
                  <dt>Class and Order</dt>
                }
                {this.props.flower.class && this.props.flower.order &&
                  <dd id="category" className="class-and-order" itemProp="genre">
                    <Link to={`/class/${this.props.class.slug}`}>
                      {this.props.class.name}
                    </Link> <Link to={`/order/${this.props.order.slug}`}>
                      {this.props.order.name}
                    </Link>
                  </dd>
                }

                {this.props.flower.genericCharacters.length > 0 &&
                  <dt>Generic Character</dt>
                }
                {this.props.flower.genericCharacters.map(genericCharacter =>
                  <dd>{genericCharacter}</dd>
                )}

                {this.props.flower.synonyms.length > 0 &&
                <dt>Specific Character and Synonyms</dt>
                }
                {this.props.flower.synonyms.map(synonym =>
                  <dd>{synonym}</dd>
                )}
              </dl>

              <hr />

              <section itemProp="description">
                {this.props.flower.description.split('\n').map(paragraph =>
                  <p className="indentation">{paragraph}</p>
                )}
              </section>
            </div>
            <figure className="illustration mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet">
              <img
                id="image"
                itemProp="image"
                src={`/img/flower/${this.props.flower.image}`}
                alt={this.props.flower.latinName}
              />
              <figcaption>
                Illustration of <em>{this.props.flower.latinName}</em> drawn from the living plant and coloured as near to nature.
              </figcaption>
            </figure>
            <nav>
              <FlowerLink className="page-link page-link--next" flower={this.props.flower}>{`Next page >`}</FlowerLink>
              <FlowerLink className="page-link page-link--previous" flower={this.props.flower}>{`< Previous page`}</FlowerLink>
            </nav>
          </div>
          <footer>
            <div>
              Originally appears at pages
              {this.props.flower.pages.length > 0 &&
                <ul>
                  {this.props.flower.pages.map(page =>
                    <li>{page}</li>
                  )}
                </ul>
              } of <Link to="/">The Botanical Magazine</Link>&nbsp;-&nbsp;
              <VolumeLink itemProp="isPartOf" number={this.props.flower.volume} />
              &nbsp;by&nbsp;
              <a
                itemScope
                itemProp="author"
                itemType="https://schema.org/Person"
                href="https://en.wikipedia.org/wiki/William_Curtis"
              >
                <span id="author" itemProp="name">William Curtis</span>
              </a> published in <span className="datePublished" itemProp="datePublished">{this.props.flower.datePublished}</span>
            </div>
            <div>
              <a itemProp="sameAs" href={this.props.flower.sameAs}>See the original pages at Gutemberg.org</a>
            </div>
          </footer>
        </article>
      </div>
    );
  }
}

export default Flower;
