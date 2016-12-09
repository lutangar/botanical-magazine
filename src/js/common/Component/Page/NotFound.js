import React, { Component, PropTypes } from 'react';
import Link from '../Link';

class NotFound extends Component {
  render() {
    return (
      <div className="notFound">
        <ol itemScope itemType="http://schema.org/BreadcrumbList" role="nav">
          <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            <Link itemProp="item" to="/">
              <span name="The Botanical Magazine">The Botanical Magazine</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            <Link itemProp="item">
              <span name="Not Found">Not Found</span>
            </Link>
            <meta itemProp="position" content="2" />
          </li>
        </ol>

        <article>
          <header>
            <h1>Not Found</h1>
          </header>
          <p>
            While following a narrow path in the Botanical garden of Lambert Marsh, you find yourself contemplating at an old ivy covered brick wall;
            There's nothing else here.
          </p>
          <p>You turn around and go back to <Link to="/">
            <em>The Botanical Magazine</em>
          </Link> reading.
          </p>
        </article>
      </div>
    );
  }
}

export default NotFound;
