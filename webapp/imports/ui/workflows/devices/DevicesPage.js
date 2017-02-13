import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardTitle, CardText } from 'material-ui/Card';

import DeviceDetail from '/imports/ui/workflows/devices/DeviceDetail';
import DevicesTable from '/imports/ui/workflows/devices/DevicesTable';
import {Tabs, Tab} from 'material-ui/Tabs';

import { Meteor } from 'meteor/meteor';

export class DevicesPage extends React.Component {
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
      tabIndex: Session.get('devicePageTabIndex'),
      deviceSearchFilter: Session.get('deviceSearchFilter'),
      currentDevice: Session.get('selectedDevice')
    };

    if (Meteor.user()) {
      data.state.isLoggedIn = true;
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    return data;
  }

  handleTabChange(index){
    Session.set('devicePageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedDevice', false);
    Session.set('deviceUpsert', false);
  }

  render() {
    if(process.env.NODE_ENV === "test") console.log('In DevicesPage render');
    return (
      <div id='devicesPage'>
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle title='Devices' />
            <CardText>
              <Tabs id="devicesPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
               <Tab className='newDeviceTab' label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
                 <DeviceDetail id='newDevice' />
               </Tab>
               <Tab className="deviceListTab" label='Devices' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                <DevicesTable />
               </Tab>
               <Tab className="deviceDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                 <DeviceDetail id='deviceDetails' />
               </Tab>
             </Tabs>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}

ReactMixin(DevicesPage.prototype, ReactMeteorData);
