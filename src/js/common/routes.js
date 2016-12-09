import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './Component/App';
import Home from './Container/HomeContainer';
import Volume from './Container/VolumeContainer';
import Flower from './Container/FlowerContainer';
import LinnaeanSystem from './Container/LinnaeanSystemContainer';
import LinnaeanClass from './Container/LinnaeanClassContainer';
import LinnaeanOrder from './Container/LinnaeanOrderContainer';
import NotFound from './Component/Page/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="volume/:volumeNumber" component={Volume} />
    <Route path="flower/:flowerSlug" component={Flower} />
    <Route path="flower/:flowerSlug" component={Flower} />
    <Route path="linnaean-system" component={LinnaeanSystem} />
    <Route path="class/:classSlug" component={LinnaeanClass} />
    <Route path="order/:orderSlug" component={LinnaeanOrder} />
    <Route path="404" status={404} component={NotFound}/>
  </Route>
);
