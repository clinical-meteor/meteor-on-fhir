import React  from 'react'
import ReactMixin  from 'react-mixin'
import { ReactMeteorData } from 'meteor/react-meteor-data'

import { PageContainer } from '/imports/ui/components/PageContainer'
import Spacer  from '/imports/ui/components/Spacer'
import DynamicSpacer  from '/imports/ui/components/DynamicSpacer'
import DocumentsList  from '/imports/ui/containers/documents-list.js'
import PostsList  from '/imports/ui/containers/posts-list.js'

import { AddPost } from '/imports/ui/workflows/posts/AddPost.js'
import PostsDeck  from '/imports/ui/workflows/posts/PostsDeck.js'

export class Weblog extends React.Component {
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

    return data;
  }

  renderAuthenticatedUserControls(isLoggedIn) {

    // user should be able to see the addPost component if they're logged in and looking at their
    // own profile; otherwise,
    if (isLoggedIn) {
      if (!this.props.routeParams.userId) {
        return (
          <div>
            <AddPost />
            <Spacer />
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div id="weblogPage">
        <PageContainer>
          { this.renderAuthenticatedUserControls(this.data.state.isLoggedIn) }
          <PostsDeck userId={this.props.routeParams.userId} />
        </PageContainer>
      </div>
    );
  }
}


Weblog.propTypes = {
  children: React.PropTypes.any
};
ReactMixin(Weblog.prototype, ReactMeteorData);
