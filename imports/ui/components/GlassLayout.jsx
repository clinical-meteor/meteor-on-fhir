import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData, createContainer } from 'meteor/react-meteor-data';

import style from './appbar';

import AppBar from 'react-toolbox/lib/app_bar';
import Checkbox from 'react-toolbox/lib/checkbox';
import IconButton from 'react-toolbox/lib/button';

import Layout from '../../client/layout/Layout';
import NavDrawer from '../../client/layout/NavDrawer';
import Sidebar from '../../client/layout/Sidebar';
import Panel from '../layouts/Panel';
import { Header } from './Header';
import { Footer } from './Footer';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

import { Session } from 'meteor/session';

Session.setDefault('backgroundImagePath', 'url(\"images\/ForestInMist.jpg\")');
Session.setDefault('backgroundColor', "#eeeeee");
Session.setDefault('darkroomEnabled', false);
Session.setDefault('glassBlurEnabled', false);
Session.setDefault('backgroundBlurEnabled', false);

Session.setDefault("drawerActive", false);
Session.setDefault("drawerPinned", false);
Session.setDefault("sidebarPinned", false);

export class GlassLayout extends React.Component {
  constructor(props) {
    super(props);
  };
  getMeteorData() {
    return {
      drawerActive: Session.get("drawerActive"),
      drawerPinned: Session.get("drawerPinned"),
      sidebarPinned: Session.get("sidebarPinned")
    };
  };

  render(){
    let appStyle = {
      "width": "100%",
      "height": "100%",
      "position": "absolute",
      "backgroundSize": "cover",
      "WebkitBackgroundSize": "cover"
      // "MozBackgroundSize": "cover",
      // "OBackgroundSize": "cover",
    }

    if (Session.get('backgroundColor')) {
      appStyle.background = Session.get('backgroundColor');
    }

    if (Session.get('backgroundImagePath')) {
      appStyle.WebkitBackgroundSize = "cover";
      appStyle.MozBackgroundSize = "cover";
      appStyle.OBackgroundSize = "cover";
      appStyle.backgroundSize = "cover";
      appStyle.backgroundImagePath = Session.get('backgroundImagePath');
    }


    return (
      <Layout>
        <NavDrawer active={this.data.drawerActive}
          pinned={this.data.drawerPinned} permanentAt='xxxl'
          onOverlayClick={ this.toggleDrawerActive }
          >

           <CardTitle
             avatar="https://placeimg.com/80/80/animals"
             title="Avatar style title"
             subtitle="Subtitle here"
           />
          <p>
              Navigation, account switcher, etc. go here.
          </p>
        </NavDrawer>
        <Panel pinned={this.data.drawerPinned} >
          <div style={{ flex: 1, overflowY: 'auto', width: '100%' }}>
            {this.props.children}
          </div>
        </Panel>
        <Sidebar pinned={ this.data.sidebarPinned } width={ 5 }>
          <div><IconButton icon='close' onClick={ this.toggleSidebar }/></div>
          <div style={{ flex: 1 }}>
            <p>Supplemental content goes here.</p>
          </div>
        </Sidebar>
      </Layout>
    );
  };
}



GlassLayout.propTypes = {};
GlassLayout.defaultProps = {};
ReactMixin(GlassLayout.prototype, ReactMeteorData);
