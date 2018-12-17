import '/imports/startup/server';
import '/imports/api/users/methods';

const { exec } = require('child_process');


Meteor.startup(function(){
  console.log('Meteor.startup() is initializing....');

  // pick up version info
  try {
    var version = {};
    version = JSON.parse(Assets.getText("version.json"));    
    Meteor.settings.public.version = version;
  } catch(e) { 
    Meteor.settings.public.version = {};
  }

  // if OAuth is configured, load oauth configs into active memory
  if(Package['symptomtic:smart-on-fhir-client']){
    console.log('Resyncing OAuth configuration....');
    Meteor.call('resyncConfiguration');
  }

  // browser content policies are an important security measure 
  // to only allow connections to specific websites
  // we keep this section optional, because some people want to use 
  // meteor-on-fhir during hackathons, research, and various
  // projects where HIPAA grade security isn't always needed

  if(Package['browser-policy-common']){
    console.log('Configuring content-security-policy.');

    import { BrowserPolicy } from 'meteor/browser-policy-common';

    BrowserPolicy.content.allowSameOriginForAll();
    BrowserPolicy.content.allowDataUrlForAll()
    BrowserPolicy.content.allowOriginForAll('self');
    BrowserPolicy.content.allowObjectOrigin('self')
    BrowserPolicy.content.allowOriginForAll('font src');
    BrowserPolicy.content.allowOriginForAll('*.wikipedia.com');
    BrowserPolicy.content.allowOriginForAll('*.wikipedia.org');
    BrowserPolicy.content.allowOriginForAll('fonts.googleapis.com');
    BrowserPolicy.content.allowOriginForAll('fonts.gstatic.com');
    BrowserPolicy.content.allowImageOrigin("* data:")
    BrowserPolicy.content.allowOriginForAll('blob:');
    BrowserPolicy.content.allowImageOrigin("blob:")
    BrowserPolicy.content.allowEval();
    BrowserPolicy.content.allowInlineScripts()
    BrowserPolicy.content.allowInlineStyles()  
  
    BrowserPolicy.content.allowObjectOrigin( 'zygotebody.com' );
    BrowserPolicy.content.allowFrameOrigin('zygotebody.com');
    BrowserPolicy.content.allowObjectDataUrl('zygotebody.com');
    BrowserPolicy.content.allowOriginForAll('zygotebody.com');
    BrowserPolicy.content.allowConnectOrigin("zygotebody.com")
    BrowserPolicy.content.allowImageOrigin("zygotebody.com")   

    // BrowserPolicy.content.allowOriginForAll('fhir-timeline.meteorapp.com');
    // BrowserPolicy.content.allowFrameOrigin('fhir-timeline.meteorapp.com');
    // BrowserPolicy.content.allowObjectDataUrl('fhir-timeline.meteorapp.com');
    // BrowserPolicy.content.allowOriginForAll('fhir-timeline.meteorapp.com');
    // BrowserPolicy.content.allowConnectOrigin("fhir-timeline.meteorapp.com")
    // BrowserPolicy.content.allowImageOrigin("fhir-timeline.meteorapp.com")  
    // BrowserPolicy.content.allowObjectOrigin('fhir-timeline.meteorapp.com')

    // BrowserPolicy.content.allowOriginForAll('open-ic-epic.com');
    // BrowserPolicy.content.allowFrameOrigin('open-ic-epic.com');
    // BrowserPolicy.content.allowObjectDataUrl('open-ic-epic.com');
    // BrowserPolicy.content.allowOriginForAll('open-ic-epic.com');
    // BrowserPolicy.content.allowConnectOrigin("open-ic-epic.com")
    // BrowserPolicy.content.allowImageOrigin("open-ic-epic.com")  
    // BrowserPolicy.content.allowObjectOrigin('open-ic-epic.com')
  }



  // Detect the operating system.
  // possible values are: 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
  var isWin = process.platform === "win32";
  var isMac = process.platform === "darwin";

  console.log('Detecting operating system: ' + process.platform);
  
  // // Execute a child process...
  // exec('fsutil fsinfo volumeinfo c:', (err, stdout, stderr) => {
  //   if (err) {
  //     // node couldn't execute the command
  //     return;
  //   }

  //   // the *entire* stdout and stderr (buffered)
  //   console.log(`fsutil fsinfo volumeinfo c: ${stdout}`);
  // });

  // Execute a child process...
  exec('fdesetup status', (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`fdesetup status: ${stdout}`);

    if(stdout.includes("FileVault is On.")){
      console.log('Should tell the client that FileVault is on')
      Meteor.settings.public.fileVault = 'on';
    } else {
      Meteor.settings.public.fileVault = 'off';
    }
  });



  console.log('Meteor.startup() completed....');
})