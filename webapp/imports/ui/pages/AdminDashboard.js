import { CardTitle } from 'material-ui/Card';
import React from 'react';
import ReactMixin from 'react-mixin';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import Spacer from '/imports/ui/components/Spacer';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

import { browserHistory } from 'react-router';
import Glass from '/imports/ui/Glass';

export class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
      style: {}
    };

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);

    return data;
  }
  render() {
    let style = {
      inactiveIndexCard: {
        opacity: .5,
        width: '50%',
        display: 'inline-block',
        paddingLeft: '20px',
        paddingRight: '20px'
      },
      indexCard: {
        cursor: 'pointer'
      },
      indexCardPadding: {
        width: '50%',
        display: 'inline-block',
        paddingLeft: '20px',
        paddingRight: '20px'
      }
    };
    return (
      <div id='indexPage' class='AdminDashboard'>
        <VerticalCanvas>

          <div style={style.indexCardPadding} onClick={ this.openPatients.bind(this) } >
            <GlassCard style={style.indexCard} >
              <CardTitle
                title='Patients'
                subtitle='Browse patient in system.'
              />
            </GlassCard>
          </div>

          <div id="practitionersTile" style={style.indexCardPadding} onClick={ this.openPractitioners.bind(this) } >
            <GlassCard style={style.indexCard} >
              <CardTitle
                title='Practitioners'
                subtitle='Browse practitioners in system.'
              />
            </GlassCard>
          </div>

          <div style={style.indexCardPadding} onClick={ this.openUserManagement.bind(this) } >
            <GlassCard style={style.indexCard} >
              <CardTitle
                title='User Management'
                subtitle='Admin controls for user accounts.'
              />
            </GlassCard>
          </div>

          <div style={style.indexCardPadding} onClick={ this.openObservationpage.bind(this) } >
            <GlassCard style={style.indexCard} >
              <CardTitle
                title='Observations'
                subtitle='Observations from devices.'
              />
            </GlassCard>
          </div>


        </VerticalCanvas>
      </div>
    );
  }

  openDiscussionForum(){
    browserHistory.push('/forum');
  }
  openHealthlog(){
    browserHistory.push('/weblog');
  }
  openDevicepage(){
    browserHistory.push('/devices');
  }
  openObservationpage(){
    browserHistory.push('/observations');
  }
  openUserManagement(){
    browserHistory.push('/users');
  }
  openMyProfile(){
    browserHistory.push('/myprofile');
  }
  openPatients(){
    browserHistory.push('/patients');
  }
  openPractitioners(){
    browserHistory.push('/practitioners');
  }
  openDataManagementPage(){
    if(process.env.NODE_ENV === "test") console.log('openDataManagementPage');
  }
}



AdminDashboard.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(AdminDashboard.prototype, ReactMeteorData);
