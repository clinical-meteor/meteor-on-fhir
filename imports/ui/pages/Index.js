import { CardTitle } from 'react-toolbox/lib/card';
import React from 'react';
import ReactMixin from 'react-mixin';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import Spacer from '/imports/ui/components/Spacer';

import { GlassCard } from '../components/GlassCard';
import { PageContainer } from '../components/PageContainer';



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
    return (
      <div id="indexPage">
        <PageContainer>
          <GlassCard>
            <CardTitle
              title="Data Management"
              subtitle="Import/export data."
            />
          </GlassCard>
          <Spacer />

          <GlassCard>
            <CardTitle
              title="User Management"
              subtitle="Admin controls for user accounts."
            />
          </GlassCard>

        </PageContainer>
      </div>
    );
  }
}



Index.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(Index.prototype, ReactMeteorData);



// <GlassCard>
//   <CardTitle
//     title="Imaging"
//     subtitle="Radiology, pathology, and anatomical images."
//   />
// </GlassCard>
// <Spacer />
//
// <GlassCard>
//   <CardTitle
//     title="Medications"
//     subtitle="Medication inventory and tracking."
//   />
// </GlassCard>
// <Spacer />
//
// <GlassCard>
//   <CardTitle
//     title="Laboratory"
//     subtitle="Observations and reports from laboratories."
//   />
// </GlassCard>
// <Spacer />
//
// <GlassCard>
//   <CardTitle
//     title="Biometrics"
//     subtitle="Biometrics tracking and device management."
//   />
// </GlassCard>
// <Spacer />
//
// <GlassCard>
//   <CardTitle
//     title="Genomics"
//     subtitle="Genetic profiles and analysis."
//     disabled
//   />
// </GlassCard>
