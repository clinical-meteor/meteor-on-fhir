import { CardMedia, CardText, CardTitle, CardHeader } from 'material-ui/Card';
import { GlassCard, VerticalCanvas, Glass } from 'meteor/clinical:glass-ui';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { browserHistory } from 'react-router';

import { get, has } from 'lodash';

import { Session } from 'meteor/session';


// import Ideogram from 'ideogram';


export class IdeogramPage extends React.Component {
  constructor(props) {
    super(props);
  }
  // componentDidMount() {

  //   return new Ideogram({
  //     organism: 'human',
  //     dataDir: 'https://unpkg.com/ideogram@0.13.0/dist/data/bands/native/',
  //     container: '#ideo-container'

  //   });
  // }
  getMeteorData() {
    let data = {};

    // if(process.env.NODE_ENV === "test") console.log("IdeogramPage[data]", data);

    if(process.env.NODE_ENV === "test") console.log("IdeogramPage[data]", data);
    return data;
  }
  render() {

    return (
      <div id='indexPage'>
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle 
              title="This is a different page" 
              subtitle="IMPORT THE IDEOGRAM: Welcome to Meteor on FHIR!  A web framework for building HIPAA secure, FDA ready, and EHR ready applications."
              style={{fontSize: '100%'}} />
            <CardText style={{fontSize: '100%'}}>
                 {/* <div id="ideo-container"></div>  */}
                 <p> This is the a test of the inscrutable errors system.</p>
            
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }




  openLink(url){
    console.log("openLink", url);
    browserHistory.push(url);
  }
}



ReactMixin(IdeogramPage.prototype, ReactMeteorData);
export default IdeogramPage;