import { CardTitle } from 'react-toolbox/lib/card';
import React from 'react';
import ReactMixin from 'react-mixin';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import Spacer from '/imports/ui/components/Spacer';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { PageContainer } from '/imports/ui/components/PageContainer';

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
      <div id='indexPage'>
        <PageContainer>

          <div style={style.indexCardPadding} onClick={ this.openDiscussionForum.bind(this) }>
            <GlassCard style={style.indexCard} >
              <CardTitle
                title='Discussion Forum'
                subtitle='Get help developing healthcare apps using Meteor.js'
              />
            </GlassCard>
          </div>

          <div style={style.indexCardPadding} onClick={ this.openWeblog.bind(this) } >
            <GlassCard style={style.indexCard} >
              <CardTitle
                title='Weblog'
                subtitle='Post public thoughts using a Wordpress/Twitter style format.'
              />
            </GlassCard>
          </div>

          <Spacer />

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

          <Spacer />

          <div style={style.inactiveIndexCard}>
            <GlassCard >
              <CardTitle
                title='Data Management'
                subtitle='Import/export data.'
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


        </PageContainer>
      </div>
    );
  }

  openDiscussionForum(){
    browserHistory.push('/forum');
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
