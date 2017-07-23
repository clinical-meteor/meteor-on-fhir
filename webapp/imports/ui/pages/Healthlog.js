import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { DynamicSpacer }  from '/imports/ui/components/DynamicSpacer';

import { AddPost } from '/imports/ui/workflows/posts/AddPost';
import PostsDeck  from '/imports/ui/workflows/posts/PostsDeck';
import { VitalMeasurements } from '/imports/ui/components/VitalMeasurements';

import { Meteor } from 'meteor/meteor';

export class Healthlog extends React.Component {
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

    return data;
  }

  renderAuthenticatedUserControls(isLoggedIn) {

    // user should be able to see the addPost component if they're logged in and looking at their
    // own profile; otherwise,
    if (isLoggedIn) {
      if (!this.props.routeParams.userId) {
        return (
          <div>
            <VitalMeasurements />
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div id="weblogPage">
        <VerticalCanvas width={600}>
          { this.renderAuthenticatedUserControls(this.data.state.isLoggedIn) }
          <PostsDeck userId={this.props.routeParams.userId} />
        </VerticalCanvas>
      </div>
    );
  }
}


Healthlog.propTypes = {
  children: React.PropTypes.any
};
ReactMixin(Healthlog.prototype, ReactMeteorData);
