import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { IndexLinkContainer } from 'react-router-bootstrap';
import MenuItem from '/imports/ui/components/MenuItem';
import MenuButton from '/imports/ui/components/MenuButton';

export class PublicNavigation extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        title: {
          color: 'black',
          cursor: 'pointer'
        }
      }
    };

    return data;
  }

  render () {
    return(
      <div id="publicNavigation">
        <IndexLinkContainer to="signin">
          <MenuButton id='signinLink' label="Signin" style={this.data.style.title} href='/signin' />
        </IndexLinkContainer>
        <IndexLinkContainer to="signup">
          <MenuButton id='signupLink' label="Register" style={this.data.style.title} href='/signup' />
      </IndexLinkContainer>
      </div>
    );
  }
}

ReactMixin(PublicNavigation.prototype, ReactMeteorData);
export default PublicNavigation;