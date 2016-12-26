import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Tabs, Tab } from 'material-ui/Tabs';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardTitle, CardText } from 'material-ui/Card';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

import LocationDetail from '/imports/ui/workflows/locations/LocationDetail';
import LocationTable from '/imports/ui/workflows/locations/LocationsTable';
import { Meteor } from 'meteor/meteor';
import Glass from '/imports/ui/Glass';

Session.setDefault('locationPageTabIndex', 1); Session.setDefault('locationSearchFilter', ''); Session.setDefault('selectedLocation', false);


export class LocationsPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        }
      },
      state: {
        isLoggedIn: false
      },
      tabIndex: Session.get('locationPageTabIndex'),
      locationSearchFilter: Session.get('locationSearchFilter'),
      currentLocation: Session.get('selectedLocation')
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
    return (
      <div id="locationsPage"> <VerticalCanvas>
          <GlassCard>
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
      </div>
    );
  }
}



ReactMixin(LocationsPage.prototype, ReactMeteorData);
