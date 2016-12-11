import { PropTypes } from 'react';

const image = PropTypes.shape({
  width: PropTypes.number,
  height: PropTypes.number,
  name: PropTypes.string,
});

const linnaeanClass = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
});

const linnaeanOrder = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
});

const flower = PropTypes.shape({
  id: PropTypes.number,
  latinName: PropTypes.string.isRequired,
  commonName: PropTypes.string,
  slug: PropTypes.string.isRequired,
  volume: PropTypes.number,
  class: PropTypes.number,
  order: PropTypes.number,
  image,
});

const volume = PropTypes.shape({
  number: PropTypes.number,
});

export default { flower, image, volume, linnaeanClass, linnaeanOrder };
