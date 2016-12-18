import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { DynamicSpacer }  from '/imports/ui/components/DynamicSpacer';

//import ObservationsList  from '/imports/ui/containers/observations-list';

import ObservationDetail from '/imports/ui/workflows/observations/ObservationDetail';
import ObservationsDeck  from '/imports/ui/workflows/observations/ObservationsDeck';

import { Meteor } from 'meteor/meteor';

export class ObservationPage extends React.Component {
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

  renderAuthenticatedUserControls(isLoggedIn) {

    // user should be able to see the addObservation component if they're logged in and looking at their
    // own profile; otherwise,
    if (isLoggedIn) {
      if (!this.props.routeParams.userId) {
        return (
          <div>
            <ObservationDetail />
            <DynamicSpacer />
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div id="ObservationPage">
        <VerticalCanvas>
          { this.renderAuthenticatedUserControls(this.data.state.isLoggedIn) }
          <ObservationsDeck userId={this.props.routeParams.userId} />
        </VerticalCanvas>
      </div>
    );
  }
}


// ObservationPage.propTypes = {
//   children: React.PropTypes.any
// };
ReactMixin(ObservationPage.prototype, ReactMeteorData);
