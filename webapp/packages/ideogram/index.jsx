import IdeogramPage from './client/IdeogramPage.jsx';
import PostcardPage from './client/PostcardPage.jsx';

var DynamicRoutes = [{
  'name': 'IdeogramPage',
  'path': '/ideogram-page',
  'component': IdeogramPage
}];

var SidebarElements = [{
  'primaryText': 'Example Page',
  'to': '/ideogram-page',
  'href': '/ideogram-page'
}];

export { SidebarElements, DynamicRoutes, IdeogramPage, PostcardPage };
