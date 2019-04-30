import Cache from './cache.js';

Accounts.onLogout(function(user){
    console.log('Accounts.onLogout');

    // clear local cache
    Cache.deleteLocalData();

    // clear session variables
    Session.set('dataContent', '');
    Session.set('exportBuffer', '');
    Session.set('importBuffer', '');

});