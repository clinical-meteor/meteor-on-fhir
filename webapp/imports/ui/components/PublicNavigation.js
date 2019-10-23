import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import MenuItem from '/imports/ui/components/MenuItem';
import MenuButton from '/imports/ui/components/MenuButton';

import { Link } from "react-router-dom";


export class PublicNavigation extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        title: {
          color: 'black',
          cursor: 'pointer'
        },
        buttons: {
          marginTop: '6px'
        }
      }
    };

    return data;
  }

  render () {
    return(
      <div id="publicNavigation">
        {/* <Link to="/signin" style={this.data.style.buttons} > */}
          <MenuButton id='signinLink' label="Signin" style={this.data.style.title} href='/signin' />
        {/* </Link>
        <Link to="/signup" style={this.data.style.buttons} > */}
          <MenuButton id='signupLink' label="Register" style={this.data.style.title} href='/signup' />
      {/* </Link> */}
      </div>
    );
  }
}

ReactMixin(PublicNavigation.prototype, ReactMeteorData);
export default PublicNavigation;