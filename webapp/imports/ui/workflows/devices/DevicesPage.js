import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardTitle, CardText } from 'material-ui/Card';

import DeviceDetail from '/imports/ui/workflows/devices/DeviceDetail';
import {Tabs, Tab} from 'material-ui/Tabs';

import { Meteor } from 'meteor/meteor';

export class DevicesPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {},
      state: {
        isLoggedIn: false
      }
    };

    if (Meteor.user()) {
      data.state.isLoggedIn = true;
    }

    // this should all be handled by props
    // or a mixin!
    if (Session.get('darkroomEnabled')) {
      data.style.color = 'black';
      data.style.background = 'white';
    } else {
      data.style.color = 'white';
      data.style.background = 'black';
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = 'blur(3px)';
      data.style.webkitFilter = 'blur(3px)';
    }

    if (Session.get('appWidth') > 768) {
      Session.set('hasPageVerticalPadding', true);
      Session.set('mainPanelIsCard', true);
    } else {
      Session.set('hasPageVerticalPadding', false);
      Session.set('mainPanelIsCard', false);
    }

    return data;
  }


  render() {
    if(process.env.NODE_ENV === "test") console.log('In DevicesPage render');
    return (
      <div id='devicesPage'>
        <VerticalCanvas>
          <GlassCard>
            <CardTitle title='Devices' />
            <CardText>
              <Tabs default index={this.data.state.index} onChange={this.handleTabChange}>
               <Tab className='newDeviceTab' label='New' style={{padded: '20px', backgroundColor: 'white', color: 'black', borderBottom: '1px solid lightgray'}} onActive={ this.onNewTab } >
                 <DeviceDetail />
               </Tab>
               <Tab label='Devices' onActive={this.handleActive} style={{backgroundColor: 'white', color: 'black', borderBottom: '1px solid lightgray'}}>

               </Tab>
               <Tab label='Detail' onActive={this.handleActive} style={{padded: '20px', backgroundColor: 'white', color: 'black', borderBottom: '1px solid lightgray'}} >
                 <DeviceDetail />
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
