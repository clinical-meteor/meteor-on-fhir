Package.describe({
  name: 'clinical:landing-page',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4');

  api.use('ecmascript');
  api.use('react-meteor-data');
  api.use('session');
  api.use('ecmascript');
  api.use('meteor-platform');
  
  api.mainModule('index.jsx', 'client');
});
                                                                                                                                                                                                 
// This lets you use npm packages in your package:
Npm.depends({
  'react': '15.4.1',
  'react-mixin': '3.0.5',
  'material-ui': '0.16.5'  
});