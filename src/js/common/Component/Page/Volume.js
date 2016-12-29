import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import roman from 'roman-decimal';
import { BASE_URL } from '../../Constant';
import CustomPropTypes from '../../PropTypes';
import VolumeIndex from '../Volume/VolumeIndex';
import VolumeLink from '../Volume/VolumeLink';
import Link from '../Link';
import Home from '../Page/Home';

class Volume extends Component {
  static propTypes = {
    params: PropTypes.shape({
      volumeNumber: React.PropTypes.string.isRequired,
    }).isRequired,
    volume: CustomPropTypes.volume.isRequired,
  };

  get title() {
    return `The Botanical Magazine Volume ${this.props.volume.number}`;
  }

  get description() {
    return `${this.title}. ${this.props.volume.quote}`;
  }

  get keywords() {
    return [
      this.title,
      this.props.volume.datePublished,
      ...Home.keywords,
    ].concat(', ');
  }

  get URL() {
    return `${BASE_URL}/volume/${this.props.volume.number}`;
  }

  render() {
    return (
      <div className="volume">
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
            <VolumeLink itemProp="item" number={this.props.volume.number} />
            <meta itemProp="position" content="2" />
          </li>
        </ol>

        <div itemScope itemType="http://schema.org/PublicationVolume">
          <meta itemProp="volumeNumber" content={this.props.volume.number} />
          <header>
            <link itemProp="additionalType" href="http://schema.org/DataCatalog" />
            <h1 itemProp="name">
              <span className="small-uppercase">The</span> <span>Botanical Magazine, </span>
              <span>Volume {roman.roman(this.props.volume.number)}</span>
            </h1>
            <p className="small-uppercase">OR,</p>
            <p itemProp="alternativeHeadline"><em>Flower-Garden Displayed</em></p>
            <p><em itemProp="author">William Curtis</em></p>
            <p><em itemProp="datePublished">{this.props.volume.datePublished}</em></p>
          </header>

          {this.props.volume.quote &&
            <figure>
              <blockquote>
                {this.props.volume.quote}
              </blockquote>
              <figcaption>{this.props.volume.quote.author}</figcaption>
            </figure>
          }

          <VolumeIndex number={this.props.volume.number} flowers={this.props.volume.flowers} />

          {this.props.volume.numberOfPages &&
            <dl>
              <dt>Original number of pages</dt>
              <dd itemProp="numberOfPages">{this.props.volume.numberOfPages}</dd>
            </dl>
          }

          <footer>
            <p>
              <span itemScope itemProp="isPartOf" itemType="https://schema.org/Periodical">
                <Link itemProp="url" to="/">
                  <span itemProp="name">The Botanical Magazine</span>
                </Link>&nbsp;-&nbsp;
              </span>

              <VolumeLink number={this.props.volume.number} />
              &nbsp;by&nbsp;
              <a href="https://en.wikipedia.org/wiki/William_Curtis">
                William Curtis
              </a>
            </p>
            <p>
              <a itemProp="sameAs" href={this.props.volume.sameAs}>
                See this book at Gutemberg.org
              </a>
            </p>
          </footer>
        </div>
      </div>
    );
  }
}

export default Volume;
