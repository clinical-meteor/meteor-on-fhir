import { AddPost } from '/imports/ui/workflows/posts/AddPost';
import { DynamicSpacer }  from '/imports/ui/components/DynamicSpacer';
import { Meteor } from 'meteor/meteor';
import PostsDeck  from '/imports/ui/workflows/posts/PostsDeck';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { VitalMeasurements } from '/imports/ui/components/VitalMeasurements';

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
        <VerticalCanvas>
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
