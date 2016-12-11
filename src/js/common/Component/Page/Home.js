import React, { Component, PropTypes } from 'react';
import CustomPropTypes from '../../PropTypes';
import VolumeIndex from '../Volume/VolumeIndex';
import VolumeLink from '../Volume/VolumeLink';
import PersonLink from '../PersonLink';
import Link from '../Link';

class Home extends Component {
  static propTypes = {
    volumes: PropTypes.arrayOf(CustomPropTypes.flower).isRequired,
  };

  static defaultProps = {
    volumes: [],
  };

  render() {
    return (
      <div className="home" itemScope itemType="https://schema.org/Periodical">
        <link itemProp="additionalType" href="http://schema.org/DataCatalog" />
        <header>
          <h1 itemProp="name">
            <span className="small-uppercase">The</span> <span>Botanical Magazine;</span>
          </h1>
          <p className="small-uppercase">OR,</p>
          <p itemProp="alternativeHeadline"><em>Flower-Garden Displayed</em>:</p>

          <p className="small-uppercase">IN WHICH</p>
          <p itemProp="about">
            The most Ornamental <em>Foreign Plants</em>, cultivated in the Open Ground,
            the Green-House, and the Stove, are accurately represented in their natural Colours.
          </p>

          <p className="smaller-uppercase">TO WHICH ARE ADDED,</p>

          <p>
            Their Names, Class, Order, Generic and Specific Characters, according to
          the celebrated <em>
            <PersonLink prop="mentions" name="Linn&aelig;us" url="https://en.wikipedia.org/wiki/Carl_Linnaeus" /></em> ;
            their Places of Growth, and Times of Flowering :
          </p>

          <p className="smaller-uppercase">TOGETHER WITH</p>

          <p className="small-uppercase">THE MOST APPROVED METHODS OF CULTURE.</p>

          <p className="small-uppercase">A WORK</p>

          <p>
            Intended for the Use of such <em itemProp="audience">Ladies, Gentlemen, and Gardeners</em>,
            as wish to become scientifically acquainted with the Plants they cultivate.
          </p>

          <hr />

          <p>
            By&nbsp;
            <PersonLink
              prop="author"
              name="WILLIAM CURTIS"
              url="https://en.wikipedia.org/wiki/William_Curtis"
            />,
          </p>

          <p>
            Author of the <a itemProp="citation" itemScope itemType="https://schema.org/CreativeWork" href="https://en.wikipedia.org/wiki/Flora_Londinensis">
            <em itemProp="name">Flora Londinensis</em>
          </a>.
          </p>

          <hr className="double" />

          <p className="small-uppercase">LONDON:</p>
          <p className="small-uppercase">Printed by Couchman and Fry, Throgmorton-Street,</p>
          <p>For <em>W. CURTIS</em>, at his Botanic-Garden, Lambeth-Marsh;</p>
          <p>And Sold by the principal Booksellers in Great-Britain and Ireland.</p>
          <p>M DCC CCII.</p>
        </header>

        <section>
          <hr className="frieze" />
          <h2>Preface</h2>
          <p className="initial">
            <span className="first-word">The</span> present periodical publication owes its commencement to the repeated solicitations
            of several Ladies and Gentlemen, Subscribers to the Author's <em>Botanic Garden</em>,
            who were frequently lamenting the want of a work, which might enable them,
            not only to acquire a systematic knowledge of the Foreign Plants growing in their
            gardens, but which might at the same time afford them the best information
            respecting their culture&#8212;in fact, a work, in which Botany and Gardening
            (so far as relates to the culture of ornamental Plants) or the labours of&nbsp;
            <a href="https://en.wikipedia.org/wiki/Carl_Linnaeus"><em>Linnæus</em></a> and&nbsp;
            <a href="https://en.wikipedia.org/wiki/Philip_Miller"><em>Miller</em></a>,
            might happily be combined.
          </p>
          <p className="indentation">
            In compliance with their wishes, he has endeavoured to present them with the united
            information of both authors, and to illustrate each by a set of new figures,
            drawn always from the living plant, and coloured as near to nature, as the imperfection
            of colouring will admit.
          </p>
          <p className="indentation">
            He does not mean, however, to confine himself solely to the Plants contained in the
            highly esteemed works of those luminaries of Botany and Gardening,
            but shall occasionally introduce new ones, as they may flower
            in his own garden, or those of the curious in any part of Great-Britain.
          </p>
          <p className="indentation">
            At the commencement of this publication, he had no design of entering on the province
            of the Florist, by giving figures of double or improved Flowers, which sometimes owe
            their origin to culture, more frequently to the sportings of nature;
            but the earnest entreaties of many of his Subscribers, have induced him so far to
            deviate from his original intention, as to promise them one, at least, of the Flowers
            most esteemed by Florists.
          </p>
          <p className="indentation">
            The encouragement given to this work, great beyond the Author's warmest expectations,
            demands his most grateful acknowledgements, and will excite him to persevere in
            his humble endeavours to render Botany a lasting source of rational amusement;
            and public utility.
          </p>
          <p>
            <em>Botanic Garden</em>,<br />
            Lambeth-Marsh,<br />
            <span itemProp="startDate">1787</span>.
          </p>
        </section>
        {this.props.volumes.map((volume, i) =>
          <section itemScope itemProp="hasPart" itemType="http://schema.org/PublicationVolume">
            <link itemProp="additionalType" href="http://schema.org/DataCatalog" />
            <h2 itemProp="name"><VolumeLink number={volume.number} /></h2>
            <VolumeIndex key={i} number={volume.number} flowers={volume.flowers} />
          </section>
        )}

        <footer>
          <p>
            Flowers displayed in The Botanical Magazine are classified using &nbsp;
            <Link to='/linnaean-system'>
              The Classes and orders of the Linn&aelig;an System of Botany.
            </Link>
          </p>
          <p itemProp="inLanguage">en-GB</p>
          <p itemProp="isAccessibleForFree">true</p>
          <p>
            <a href="http://www.gutenberg.org/ebooks/author/7233">
              More freed works from <span itemProp="author">William Curtis</span> can be found at Gutemberg.org
            </a>
          </p>
          <p>
          <a itemProp="sameAs" href="https://en.wikipedia.org/wiki/Curtis's_Botanical_Magazine">
            Curtis's Botanical Magazine
          </a>
          </p>
        </footer>
      </div>
    );
  }
}

export default Home;
