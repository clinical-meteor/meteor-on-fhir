//  documentation
//  https://www.npmjs.com/package/react-katex

import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { Card, CardTitle, CardText } from 'material-ui/Card';


import React from 'react';
import ReactMixin from 'react-mixin';

import { ReactMeteorData } from 'meteor/react-meteor-data';

import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ text }) => <GlassCard><CardText>{text}</CardText></GlassCard>;

export class GoogleMapsPage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
      style: {
        page: {
          position: 'fixed',
          top: '0px',
          left: '0px',
          height: Session.get('appHeight'),
          width: Session.get('appWidth')
        }
      },
      center: {lat: 39.66, lng: -104.95},
      zoom: 9
    };

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);

    return data;
  }
  render(){
    var mapOverlays = <GlassCard id='pinpointCard' lat={39.66} lng={-104.95}>
      <CardText>
       Foo
      </CardText>
    </GlassCard>;

    return(
      <div id="mapsPage" style={this.data.style.page}>
        <GoogleMapReact
           id="googleMap"
           defaultCenter={this.data.center}
           defaultZoom={this.data.zoom}
         >
         </GoogleMapReact>
      </div>
    );
  }
}

ReactMixin(GoogleMapsPage.prototype, ReactMeteorData);
