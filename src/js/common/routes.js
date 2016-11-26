import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './Component/App';
import Home from './Container/HomeContainer';
import Volume from './Container/VolumeContainer';
import Flower from './Container/FlowerContainer';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="volume/:volumeNumber" component={Volume} />
    <Route path="flower/:flowerSlug" component={Flower} />
  </Route>
);
