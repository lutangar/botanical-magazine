import React, { Component, PropTypes } from 'react';
import Link from '../Link'
import VolumeLink from '../Volume/VolumeLink'
import FlowerLink from '../Flower/FlowerLink'

class Flower extends Component {
  static propTypes = {
    flower: PropTypes.object.isRequired,
    params: React.PropTypes.shape({
      volumeNumber: React.PropTypes.number,
      flowerSlug: React.PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    flower: {
      genericCharacters: [],
      synonyms: [],
      pages: [],
    },
  };

  render() {
    return (
      <div className="flower">
        <ol itemScope itemType="http://schema.org/BreadcrumbList" role="nav">
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

        <section itemScope itemType="http://schema.org/Thing">
          <div className="sheet">
            <h1 itemProp="name">{this.props.flower.latinName}</h1>
            {this.props.flower.commonName &&
              <em itemProp="alternateName">{this.props.flower.commonName}</em>
            }
            <dl>
              {this.props.flower.classAndOrder &&
                <dt>Class and Order</dt>
              }
              {this.props.flower.classAndOrder &&
                <dd itemProp="category">{this.props.flower.classAndOrder}</dd>
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
          <figure className="illustration">
            <img itemProp="image" src={`/img/${this.props.flower.image}`} alt={this.props.flower.latinName} />
            <figcaption>
              Illustration of <em>{this.props.flower.latinName}</em> drawn from the living plant and coloured as near to nature.
            </figcaption>
          </figure>

          <footer>
            <div>
              Originally appears at pages
              {this.props.flower.pages.length > 0 &&
                <ul>
                  {this.props.flower.pages.map(page =>
                    <li>{page}</li>
                  )}
                </ul>
              } of <Link itemProp="item" to="/">The Botanical Magazine</Link>&nbsp;-&nbsp;
              <VolumeLink itemProp="item" number={this.props.flower.volume} />
              &nbsp;by&nbsp;
              <a itemProp="author" href="https://en.wikipedia.org/wiki/William_Curtis">
                William Curtis
              </a>
            </div>
            <div>
              <a itemProp="sameAs" href={this.props.flower.sameAs}>See the original pages at Gutemberg.org</a>
            </div>
          </footer>
        </section>
      </div>
    );
  }
}

export default Flower;
