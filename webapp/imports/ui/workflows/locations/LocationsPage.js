import { CardText, CardTitle } from 'material-ui/Card';
import { Tab, Tabs } from 'material-ui/Tabs';

import Checkbox from 'material-ui/Checkbox';
import { EJSON } from 'meteor/ejson';
import Glass from '/imports/ui/Glass';
import { GlassCard } from '/imports/ui/components/GlassCard';
import GoogleMapReact from 'google-map-react';
import LocationDetail from '/imports/ui/workflows/locations/LocationDetail';
import LocationTable from '/imports/ui/workflows/locations/LocationsTable';
import { Meteor } from 'meteor/meteor';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import {ScatterplotChart} from 'react-easy-chart';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

// if(process.env.NODE_ENV !== 'test'){
//   import GoogleMapReact from 'google-map-react';
// }


Session.setDefault('locationPageTabIndex', 1); Session.setDefault('locationSearchFilter', ''); Session.setDefault('selectedLocation', false);
Session.setDefault('shapefileDataLayer', false);

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};
const demoData = [
    {
      type: 'One',
      x: 1,
      y: 5
    },
    {
      type: 'Two',
      x: 3,
      y: 1
    },
    {
      type: 'Three',
      x: 0,
      y: 6
    },
    {
      type: 'Four',
      x: 5,
      y: 2
    },
    {
      type: 'Five',
      x: 4,
      y: 4
    },
    {
      type: 'Six',
      x: 5,
      y: 9
    },
    {
      type: 'Seven',
      x: 9,
      y: 1
    },
    {
      type: 'Eight',
      x: 5,
      y: 6
    },
    {
      type: 'Nine',
      x: 3,
      y: 9
    },
    {
      type: 'Ten',
      x: 7,
      y: 9
    }
  ];

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
      zoom: 7, 
      layers: {
        heatmap: false,
        reimbursements: false,
        mortality: false,
        eyeexams: false,
        diabetes: false,
        lipidPanels: false,
        outpatientReimbursement: false
      },
      shapefileDataLayer: [],
      markers: Locations.find({}, {sort: {name: 1}}).fetch(),
      options: {
        panControl: false,
        mapTypeControl: false,
        scrollwheel: false,
        styles: [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "strokeWeight": 1
              }
            ]
          },
          {
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#616161",
                "strokeWeight": 1
              }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bdbdbd"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#bbdaa4"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bbdaa4"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dadada"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#99b3cc"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#99b3cc"
              }
            ]
          }
        ]
      }
    };

    if (Meteor.user()) {
      data.state.isLoggedIn = true;
    }

    if(Session.get('shapefileDataLayer')){
      data.shapefileDataLayer = Session.get('shapefileDataLayer');
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

    // we know that the vertical canvas with locations will be displayed regardless of whether
    // we load the background map; so lets create a variable to set it up
    var canvas = <VerticalCanvas width={768} >
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
            <Tab className="layersDetail" label='Layers' onActive={this.handleActive} style={this.data.style.tab} value={3}>
              <CardText>      
                    <h4>Map Types</h4>
                    <Checkbox label="Points" style={styles.checkbox} />
                    <Checkbox label="Heatmap" style={styles.checkbox} />
                    <br/>

                    <h4>Health Statistics</h4>
                    <Checkbox label="Hospital Referral Regions" style={styles.checkbox} />
                    <Checkbox label="Health Service Areas" style={styles.checkbox} />                        
                    <br/>
                
                    <h4>Public Services</h4>
                    <Checkbox label="Hospitals" style={styles.checkbox} />
                    <Checkbox label="Police Departments" style={styles.checkbox} />
                    <br/>
                
                    <h4>Medicare</h4>
                    <Checkbox label="Reimbursements" style={styles.checkbox} />
                    <Checkbox label="Total Mortality" style={styles.checkbox} />
                    <Checkbox label="Eye Exams" style={styles.checkbox} />
                    <Checkbox label="Diabetes" style={styles.checkbox} />
                    <Checkbox label="Lipid Panels" style={styles.checkbox} />
                    <Checkbox label="Outpatient Visits" style={styles.checkbox} />
              </CardText>
            </Tab>
            <Tab className="quickAnalysisTab" label='Analysis' onActive={this.handleActive} style={this.data.style.tab} value={4}>
              <CardText>
                <ScatterplotChart 
                  data={demoData} 
                  lineData={[
                    {
                      x: 'A',
                      y: 1
                    },
                    {
                      x: 'B',
                      y: 20
                    } 
                  ]}
                  />
              </CardText>
            </Tab>
          </Tabs>
        </CardText>
      </GlassCard>
    </VerticalCanvas>;


    var pageContent;
    // we only want to render the google map in certain environments
    // specifically, we don't want to render it while running QA tests
    if(process.env.NODE_ENV !== 'test'){
      // okay, we're not running QA tests,
      // so lets create a bunch of markers to draw on the map, and load them into a variable
      this.data.markers.forEach(function(location){
        markers.push(
          <div lat={location.position.latitude} lng={ location.position.longitude} style={{width: '200px'}}>
            <div style={{backgroundColor: 'orange', opacity: '.8', height: '10px', width: '10px', borderRadius: '80%'}}></div>
            {location.name}
          </div>)
      });

      // we're now going to draw our background map,
      // add the canvas with our locations CRUD user interface
      // and our map markers
      pageContent = <GoogleMapReact
          id="googleMap"
          defaultCenter={this.data.center}
          defaultZoom={this.data.zoom}           
          options={this.data.options}
          bootstrapURLKeys={{
            libraries: 'visualization'
          }}
          onGoogleApiLoaded={function({map, maps}){
            console.log('onGoogleApiLoaded', map)
  
            map.data.setStyle({
              // raw binary data (extremely fast!)
              //icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAiklEQVR42mNgQIAoIF4NxGegdCCSHAMzEC+NUlH5v9rF5f+ZoCAwHaig8B8oPhOmKC1NU/P//7Q0DByrqgpSGAtSdOCAry9WRXt9fECK9oIUPXwYFYVV0e2ICJCi20SbFAuyG5uiECUlkKIQmOPng3y30d0d7Lt1bm4w301jQAOgcNoIDad1yOEEAFm9fSv/VqtJAAAAAElFTkSuQmCC'
  
              // load from a content delivery network
              //icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'

              // load from Meteor server
              //icon: Meteor.absoluteUrl() + 'geodata/icons/purple-dot.png'

              // load from googleapis
              //icon: 'https://mts.googleapis.com/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png&text=A&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1'

              // load a Symbol
              icon: {
                // a custom designed path (must be less than 22x22 pixels)
                //path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',

                path: maps.SymbolPath.CIRCLE,
                fillColor: '#616161',
                fillOpacity: 0.5,
                strokeColor: '#bb5599',
                strokeWeight: 2,
                scale: 2
              },
              fillColor: '#ffffff',
              strokeColor: '#bb5599',
              strokeWeight: 1
              //icon: new maps.MarkerImage(
              //  'http://www.gettyicons.com/free-icons/108/gis-gps/png/24/needle_left_yellow_2_24.png',
              //  new maps.Size(24, 24),
              //  new maps.Point(0, 0),
              //  new maps.Point(0, 24)
              //)

              // and some labels 
              //label: {
              //  color: "blue",
              //  fontFamily: "Courier",
              //  fontSize: "24px",
              //  fontWeight: "bold",
              //  text: 'foo'
              //}
            });


            
            // heatmaps are special, and need to process the data from our geojson after it's received
            if(self.data.layers.heatmap){
              var dataLayer = [];
              HTTP.get(Meteor.absoluteUrl() + '/geodata/health_service_areas_detailed.geojson', function(error, data){
                var geojson = EJSON.parse(data.content);
                console.log('loadGeoJson', geojson);
                geojson.features.forEach(function(datum){
                  if(datum.geometry && datum.geometry.coordinates && datum.geometry.coordinates[0] && datum.geometry.coordinates[1]){
                    dataLayer.push(new maps.LatLng(datum.geometry.coordinates[1], datum.geometry.coordinates[0]));
                  }
                })
                console.log('dataLayer', dataLayer);

                // we sometimes also want to load the data twice
                // do we need to double fetch?  or can we just pass data in here?
                if(self.data.layers.points){
                  map.data.loadGeoJson(Meteor.absoluteUrl() + '/geodata/health_service_areas_detailed.geojson');
                  console.log('map.data', map.data);
                }

                var heatmap = new maps.visualization.HeatmapLayer({
                  data: dataLayer,
                  map: map
                });
                var gradient = [
                  'rgba(0, 255, 255, 0)',
                  'rgba(0, 255, 255, 1)',
                  'rgba(0, 191, 255, 1)',
                  'rgba(0, 127, 255, 1)',
                  'rgba(0, 63, 255, 1)',
                  'rgba(0, 0, 255, 1)',
                  'rgba(0, 0, 223, 1)',
                  'rgba(0, 0, 191, 1)',
                  'rgba(0, 0, 159, 1)',
                  'rgba(0, 0, 127, 1)',
                  'rgba(63, 0, 91, 1)',
                  'rgba(255, 0, 0, 1)'
                ]
                heatmap.set('gradient', gradient);
                heatmap.set('radius', 40);
                heatmap.set('opacity', 0.4);
                heatmap.setMap(map);

              });
            } else {
              map.data.loadGeoJson(Meteor.absoluteUrl() + '/geodata/health_service_areas_detailed.geojson');
              console.log('map.data', map.data);

              // reimbursements layer
              if(self.data.layers.reimbursements){
                map.data.setStyle(function(feature){
                  var reimbursements = feature.getProperty("Total_Reimbursements");
                  //console.log('reimbursements', reimbursements);
                  var color = '#ffffff';
                  if((1 < reimbursements) && (reimbursements < 7000)){
                     color = '#f0faf8';
                  } else if ((7001 < reimbursements) && (reimbursements < 8000)){
                     color = '#d0dfdd';
                  } else if ((8001 < reimbursements) && (reimbursements < 9000)){
                     color = '#b1c5c3';
                  } else if ((9001 < reimbursements) && (reimbursements < 10000)){
                     color = '#92aaa9';
                  } else if ((10001 < reimbursements) && (reimbursements < 11000)){
                     color = '#73908e';
                  } else if ((11001 < reimbursements) && (reimbursements < 12000)){
                     color = '#547574';
                  } else if (12001 < reimbursements){
                     color = '#355b5a';
                  }

                  return {
                    fillColor: color,
                    strokeColor: '#164140',
                    strokeWeight: 1
                  };
                })
              } 
              if(self.data.layers.mortality){
                map.data.setStyle(function(feature){
                  var reimbursements = parseFloat(feature.getProperty("Total Mort"));
                  console.log('reimbursements', reimbursements);
                  var color = '#ffffff';
                  if((1 < reimbursements) && (reimbursements < 3)){
                     color = '#fdd49e';
                  } else if ((3 < reimbursements) && (reimbursements <= 3.5)){
                     color = '#fdbb84';
                  } else if ((3.5 < reimbursements) && (reimbursements <= 4)){
                     color = '#fc8d59';
                  } else if ((4 < reimbursements) && (reimbursements <= 4.5)){
                     color = '#ef6548';
                  } else if ((4.5 < reimbursements) && (reimbursements <= 5)){
                     color = '#d7301f';
                  } else if ((5 < reimbursements) && (reimbursements <= 5.5)){
                     color = '#b30000';
                  } else if (5.5 <= reimbursements){
                     color = '#7f0000';
                  }

                  return {
                    fillColor: color,
                    strokeColor: '#164140',
                    strokeWeight: 1
                  };
                })
              }

              if(self.data.layers.outpatientReimbursement){
                map.data.setStyle(function(feature){
                  var reimbursements = parseFloat(feature.getProperty("Outpat$"));
                  console.log('reimbursements', reimbursements);
                  var color = '#ffffff';
                  if((1 < reimbursements) && (reimbursements < 1000)){
                     color = '#eee1eb';
                  } else if ((1001 < reimbursements) && (reimbursements <= 2000)){
                     color = '#d6c6e6';
                  } else if ((2001 < reimbursements) && (reimbursements <= 3000)){
                     color = '#b89ac5';
                  } else if ((3001 < reimbursements) && (reimbursements <= 4000)){
                     color = '#775599';
                  } else if ((4001 < reimbursements) && (reimbursements <= 5000)){
                     color = '#321272';
                  } else if ((5001 < reimbursements) && (reimbursements <= 6000)){
                     color = '#300042';
                  } else if (6001 <= reimbursements){
                     color = '#300042';
                  }

                  return {
                    fillColor: color,
                    strokeColor: '#164140',
                    strokeWeight: 0.5
                  };
                })
              }              
            }
          }}
        >          
        {markers}
        {canvas}
      </GoogleMapReact>
    } else {
      // but if we're in a test environment, we're just going to render the locations CRUD user interface
      pageContent = canvas;
    }
          
    return (
      <div id="locationsPage" style={this.data.style.page}> 
        {pageContent}                
      </div>
    );
  }
}



ReactMixin(LocationsPage.prototype, ReactMeteorData);
