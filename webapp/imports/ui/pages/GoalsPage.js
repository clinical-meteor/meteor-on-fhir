import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { PageContainer } from '/imports/ui/components/PageContainer';

import ObservationsList  from '/imports/ui/workflows/observations/ObservationsList';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { GoalsCard } from '/imports/ui/components/GoalsCard';

import { Meteor } from 'meteor/meteor';

export class GoalsPage extends React.Component {
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
    return (
      <div id="goalsPage">
        <PageContainer>
          <GlassCard>
            <CardText>
              <GoalsCard />
            </CardText>
          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}


GoalsPage.propTypes = {
  children: React.PropTypes.any
};
ReactMixin(GoalsPage.prototype, ReactMeteorData);
