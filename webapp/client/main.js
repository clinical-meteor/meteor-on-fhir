

import '/imports/startup/client';
global.Buffer = global.Buffer || require("buffer").Buffer;

// hotfix for vis.js 
// not sure what side effects this may introduce....
document.ontouchmove = function(event){
    event.preventDefault();
}