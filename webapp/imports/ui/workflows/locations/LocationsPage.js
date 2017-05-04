import { CardText, CardTitle } from 'material-ui/Card';
import { Tab, Tabs } from 'material-ui/Tabs';

import Glass from '/imports/ui/Glass';
import { GlassCard } from '/imports/ui/components/GlassCard';
import GoogleMapReact from 'google-map-react';
import LocationDetail from '/imports/ui/workflows/locations/LocationDetail';
import LocationTable from '/imports/ui/workflows/locations/LocationsTable';
import { Meteor } from 'meteor/meteor';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

Session.setDefault('locationPageTabIndex', 1); Session.setDefault('locationSearchFilter', ''); Session.setDefault('selectedLocation', false);


export class LocationsPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        },
        page: {
          position: 'fixed',
          top: '0px',
          left: '0px',
          height: Session.get('appHeight'),
          width: Session.get('appWidth')
        }
      },
      state: {
        isLoggedIn: false
      },
      tabIndex: Session.get('locationPageTabIndex'),
      locationSearchFilter: Session.get('locationSearchFilter'),
      currentLocation: Session.get('selectedLocation'),
      center: {
        lat: 41.8359496, 
        lng: -87.8317244
      },
      zoom: 12, 
      layers: ShapeFiles.find().fetch(),
      markers: Locations.find({}, {sort: {name: 1}}).fetch()
    };

    if (Meteor.user()) {
      data.state.isLoggedIn = true;
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("LocationsPage[data]", data);
    return data;
  }

  handleTabChange(index){
    Session.set('locationPageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedLocation', false);
    Session.set('locationUpsert', false);
  }

  render() {
    var self = this;
    var markers = [];

    this.data.markers.forEach(function(location){
      markers.push(
        <div lat={location.position.latitude} lng={ location.position.longitude} style={{width: '200px'}}>
          <div style={{backgroundColor: 'red', opacity: '.8', height: '20px', width: '20px', borderRadius: '80%'}}></div>
          {location.name}
        </div>)
    });

          



    return (
      <div id="locationsPage" style={this.data.style.page}> 
        <GoogleMapReact
           id="googleMap"
           defaultCenter={this.data.center}
           defaultZoom={this.data.zoom}           
           onGoogleApiLoaded={function({map, maps}){

             //map.data.loadGeoJson(self.data.layer[0]);
             //console.log(map, maps)
          }}
         >

          <VerticalCanvas width={768} >
            <GlassCard height='auto'>
              <CardTitle
                title="Locations"
              />
              <CardText>
                <Tabs id="locationsPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}> <Tab className="newLocationTab" label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0} >
                    <LocationDetail id='newLocation' />
                  </Tab>
                  <Tab className="locationListTab" label='Locations' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                    <LocationTable />
                  </Tab>
                  <Tab className="locationDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                    <LocationDetail id='locationDetails' />
                  </Tab>
                </Tabs>
              </CardText>
            </GlassCard>
          </VerticalCanvas>

          {markers}

        </GoogleMapReact>
         
        
      </div>
    );
  }
}



ReactMixin(LocationsPage.prototype, ReactMeteorData);
