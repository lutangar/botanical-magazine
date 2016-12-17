import React, { Component, PropTypes } from 'react';
import { routerShape } from 'react-router';
import Helmet from 'react-helmet';
import { BASE_URL } from '../../Constant';
import CustomPropTypes from '../../PropTypes';
import Link from '../Link';
import Home from '../Page/Home';
import VolumeLink from '../Volume/VolumeLink';
import FlowerLink from '../Flower/FlowerLink';
import FlowerCard from '../Flower/FlowerCard';

class Flower extends Component {
  static propTypes = {
    previousFlower: CustomPropTypes.flower,
    flower: CustomPropTypes.flower.isRequired,
    nextFlower: CustomPropTypes.flower,
    params: React.PropTypes.shape({
      flowerSlug: React.PropTypes.string.isRequired,
    }).isRequired,
    class: CustomPropTypes.linnaeanClass,
    order: CustomPropTypes.linnaeanOrder,
    router: routerShape.isRequired,
  };

  static defaultProps = {
    flower: {
      genericCharacters: [],
      synonyms: [],
      pages: [],
      description: '',
    },
  };

  constructor(props) {
    super(props);

    if (!props.flower.id) {
      props.router.replace('/404');
    }
  }

  get title() {
    return `${this.props.flower.latinName} - ${this.props.flower.commonName}`;
  }

  get description() {
    return this.props.flower.description.split('\n')[0];
  }

  get keywords() {
    return [
      this.props.flower.latinName,
      this.props.flower.commonName,
      this.props.flower.datePublished,
      this.props.class.name,
      this.props.order.name,
      this.props.genus.name,
      `The Botanical Magazine Volume ${this.props.flower.volume}`,
      ...Home.keywords,
    ].concat(', ');
  }

  get imagePath() {
    return `${BASE_URL}/img/flower/${this.props.flower.image.name}`;
  }

  get URL() {
    return `${BASE_URL}/flower/${this.props.flower.slug}`;
  }

  render() {
    // parse description for: flower names, country, reference (what kind?)
    return (
      <div className="flower">
        <Helmet
          htmlAttributes={{ lang: 'en', amp: undefined }}
          title={this.title}
          base={{target: '_blank', href: BASE_URL }}
          meta={[
            { name: 'description', content: this.description },
            { name: 'keywords', content: this.keywords },

            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:creator', content: '@lutangar' },
            { name: 'twitter:url', content: this.URL },
            { name: 'twitter:title', content: this.title },
            { name: 'twitter:description', content: this.description },
            { name: 'twitter:image', content: this.imagePath },

            { name: 'og:url', content: this.URL },
            { name: 'og:image', content: this.imagePath },
            { name: 'og:description', content: this.description },
            { name: 'og:title', content: this.title },
            { name: 'og:site_name', content: 'The Botanical Magazine' },
            { name: 'og:see_also', content: BASE_URL },
          ]}
          link={[
            { rel: 'canonical', href: this.URL },
          ]}
        />

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
              <div className="flower__full-name">
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
                  <dd className="class-and-order" itemProp="genre">
                    <Link className="class" to={`/class/${this.props.class.slug}`}>
                      {this.props.class.name}
                    </Link>&nbsp;<Link className="order" to={`/order/${this.props.order.slug}`}>
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
            <figure
              className="plate illustration mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet"
              style={{ maxWidth: `${this.props.flower.image.width}px`}}
            >
              <span className="plate__number" itemProp="position">{this.props.flower.id}</span>
              <img
                itemProp="image"
                src={this.imagePath}
                alt={this.props.flower.latinName}
              />
              <figcaption className="plate__text">
                <div className="plate__title" itemProp="name">{this.props.flower.latinName}</div>
                {this.props.flower.commonName &&
                <em className="plate__alternate">{this.props.flower.commonName}</em>
                }
              </figcaption>
            </figure>
          </div>

          {this.props.species.length > 0 &&
            <section>
              <h2>Other species of the <em>{this.props.genus.name}</em> genus</h2>
              <div className="plates">
                 {this.props.species.map(s =>
                   <FlowerCard flower={s} />
                 )}
              </div>
            </section>
          }

          <nav>
            {this.props.nextFlower &&
              <FlowerLink className="page-link page-link--next" flower={this.props.nextFlower}>{`Next page >`}</FlowerLink>
            }
            {this.props.previousFlower &&
              <FlowerLink className="page-link page-link--previous" flower={this.props.previousFlower}>{`< Previous page`}</FlowerLink>
            }
          </nav>
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
                <span className="author" itemProp="name">William Curtis</span>
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
