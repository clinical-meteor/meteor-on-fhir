import LandingPage from './client/LandingPage.jsx';
import RatesPage from './client/RatesPage.jsx';

var DynamicRoutes = [{
  'name': 'LandingPage',
  'path': '/landing-page',
  'component': LandingPage
}, {
  'name': 'RatesPage',
  'path': '/rates-page',
  'component': RatesPage
}];

export { DynamicRoutes, LandingPage, RatesPage };
