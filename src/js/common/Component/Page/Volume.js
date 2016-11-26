import React, { Component, PropTypes } from 'react';
import roman from 'roman-decimal';
import VolumeIndex from '../Volume/VolumeIndex';
import VolumeLink from '../Volume/VolumeLink';
import Link from '../Link';

class Volume extends Component {
  static propTypes = {
    params: PropTypes.shape({
      volumeNumber: React.PropTypes.string,
    }).isRequired,
    volume: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="volume">
        <ol itemScope itemType="http://schema.org/BreadcrumbList" role="nav">
          <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            <Link itemProp="item" to="/">
              <span name="The Botanical Magazine">The Botanical Magazine</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            <VolumeLink itemProp="item" number={this.props.volume.number} />
            <meta itemProp="position" content="2" />
          </li>
        </ol>

        <div itemScope itemType="http://schema.org/Book">
          <header>
            <link itemProp="additionalType" href="http://schema.org/Product"/>
            <h1 itemProp="name">
              <span className="small-uppercase">The</span> <span>Botanical Magazine, </span>
              <span>Volume {roman.roman(this.props.volume.number)}</span>
            </h1>
            <p className="small-uppercase">OR,</p>
            <p itemProp="alternativeHeadline"><em>Flower-Garden Displayed</em></p>
            <p><em itemProp="author">William Curtis</em></p>
          </header>

          {this.props.volume.quote &&
            <figure>
              <blockquote>
                {this.props.volume.quote}
              </blockquote>
              <figcaption>{this.props.volume.author}</figcaption>
            </figure>
          }

          <VolumeIndex number={this.props.volume.number} flowers={this.props.volume.flowers} />

          <dl>
            {this.props.volume.numberOfPages &&
              <dt>Original number of pages</dt>
            }

            {this.props.volume.numberOfPages &&
              <dd itemProp="numberOfPages">{this.props.volume.numberOfPages}</dd>
            }
          </dl>

          <footer>
            <div>
              <Link to="/">The Botanical Magazine</Link>&nbsp;-&nbsp;
              <VolumeLink number={this.props.volume.number}/>
              &nbsp;by&nbsp;
              <a href="https://en.wikipedia.org/wiki/William_Curtis">
                William Curtis
              </a>
            </div>
            <div>
              <a itemProp="sameAs" href={this.props.volume.sameAs}>
                See this book at Gutemberg.org
              </a>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default Volume;
