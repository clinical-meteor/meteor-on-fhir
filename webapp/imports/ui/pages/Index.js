import { CardTitle } from 'react-toolbox/lib/card';
import React from 'react';
import ReactMixin from 'react-mixin';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import Spacer from '/imports/ui/components/Spacer';

import { GlassCard } from '../components/GlassCard';
import { PageContainer } from '../components/PageContainer';

import { browserHistory } from 'react-router';

export class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
      style: {}
    };

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

    return data;
  }
  render() {
    let style = {
      inactive: {
        opacity: .5
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
      <div id='indexPage'>
        <PageContainer>

          <div style={style.indexCardPadding}>
            <GlassCard onClick={ this.openDiscussionForum } style={style.indexCard} >
              <CardTitle
                title='Discussion Forum'
                subtitle='Get help developing healthcare apps using Meteor.js'
              />
            </GlassCard>
          </div>

          <div style={style.indexCardPadding}>
            <GlassCard onClick={ this.openWeblog } style={style.indexCard} >
              <CardTitle
                title='Weblog'
                subtitle='Post public thoughts using a Wordpress/Twitter style format.'
              />
            </GlassCard>
          </div>

          <Spacer />


          <div style={style.indexCardPadding}>
            <GlassCard style={style.inactive} >
              <CardTitle
                title='Data Management'
                subtitle='Import/export data.'
              />
            </GlassCard>
          </div>

          <div style={style.indexCardPadding}>
            <GlassCard onClick={ this.openUserManagement } style={style.indexCard} >
              <CardTitle
                title='User Management'
                subtitle='Admin controls for user accounts.'
              />
            </GlassCard>
          </div>

          <Spacer />


          <div style={style.indexCardPadding}>
            <GlassCard onClick={ this.openPatients } style={style.indexCard} >
              <CardTitle
                title='Patients'
                subtitle='Browse patient in system.'
              />
            </GlassCard>
          </div>
          <div style={style.indexCardPadding}>
            <GlassCard onClick={ this.openPractitioners } style={style.indexCard} >
              <CardTitle
                title='Practitioners'
                subtitle='Browse practitioners in system.'
              />
            </GlassCard>
          </div>

        </PageContainer>
      </div>
    );
  }

  openDiscussionForum(){
    browserHistory.push('/forums');
  }
  openWeblog(){
    browserHistory.push('/weblog');
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
    console.log('openDataManagementPage');
  }
}



Index.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(Index.prototype, ReactMeteorData);



// <GlassCard>
//   <CardTitle
//     title='Imaging'
//     subtitle='Radiology, pathology, and anatomical images.'
//   />
// </GlassCard>
// <Spacer />
//
// <GlassCard>
//   <CardTitle
//     title='Medications'
//     subtitle='Medication inventory and tracking.'
//   />
// </GlassCard>
// <Spacer />
//
// <GlassCard>
//   <CardTitle
//     title='Laboratory'
//     subtitle='Observations and reports from laboratories.'
//   />
// </GlassCard>
// <Spacer />
//
// <GlassCard>
//   <CardTitle
//     title='Biometrics'
//     subtitle='Biometrics tracking and device management.'
//   />
// </GlassCard>
// <Spacer />
//
// <GlassCard>
//   <CardTitle
//     title='Genomics'
//     subtitle='Genetic profiles and analysis.'
//     disabled
//   />
// </GlassCard>
