import React, { Component, PropTypes } from 'react';
import { Router } from 'react-router';
import Link from '../Link';
import VolumeLink from '../Volume/VolumeLink';
import FlowerLink from '../Flower/FlowerLink';
import PersonLink from '../PersonLink';

class Flower extends Component {
  static propTypes = {
    flower: PropTypes.object.isRequired,
    params: React.PropTypes.shape({
      classAndOrderSlug: React.PropTypes.number,
      flowerSlug: React.PropTypes.string,
    }).isRequired,
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
              <div className="title--full">
                <h1 itemProp="name">{this.props.flower.latinName}</h1>
                {this.props.flower.commonName &&
                  <em itemProp="alternateName">{this.props.flower.commonName}</em>
                }
              </div>
              <dl>
                {this.props.flower.classAndOrder &&
                  <dt>Class and Order</dt>
                }
                {this.props.flower.classAndOrder &&
                  <dd className="class-and-order" itemProp="genre">
                    {this.props.flower.classAndOrder}
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
              <p itemProp="description">{this.props.flower.description}</p>
            </div>
            <figure className="illustration mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet">
              <img
                itemProp="image"
                src={`/img/flower/${this.props.flower.image}`}
                alt={this.props.flower.latinName}
              />
              <figcaption>
                Illustration of <em>{this.props.flower.latinName}</em> drawn from the living plant and coloured as near to nature.
              </figcaption>
            </figure>
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
              <PersonLink
                id="author"
                className="author"
                prop="author"
                name="William Curtis"
                url="https://en.wikipedia.org/wiki/William_Curtis"
              /> published in <span className="datePublished" itemProp="datePublished">{this.props.flower.datePublished}</span>
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
