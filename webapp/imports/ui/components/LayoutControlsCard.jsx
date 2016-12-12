import React from 'react';
import Checkbox from 'react-toolbox/lib/checkbox';
import { Card, CardTitle, CardText } from 'material-ui/Card';


LayoutControlsCard = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {

    // this should all be handled by props
    let cardStyle = {
      opacity: Session.get('globalOpacity'),
      drawerActive: Session.get("drawerActive"),
      drawerPinned: Session.get("drawerPinned"),
      sidebarPinned: Session.get("sidebarPinned")
    }

    // this could be a mixin
    if (Session.get('darkroomEnabled')) {
      cardStyle.color = "black";
      cardStyle.background = "white";
    } else {
      cardStyle.color = "white";
      cardStyle.background = "black";
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      cardStyle.filter = "blur(3px)";
      cardStyle.webkitFilter = "blur(3px)";
    }

    // this could be another mixin
    if (Session.get('backgroundBlurEnabled')) {
      cardStyle.backdropFilter = "blur(5px)";
    }

    return cardStyle;
  },
  toggleDrawerPinned() {
    Session.toggle("drawerPinned");
  },

  toggleSidebar() {
    Session.toggle("sidebarPinned");
  },
  render () {
    return(
     <Card style={this.data}>
       <CardTitle
         title="Layout Controls"
       />
       <CardText>
        <Checkbox label='Pin drawer' checked={this.data.drawerPinned} onChange={this.toggleDrawerPinned} />
        <Checkbox label='Show sidebar' checked={this.data.sidebarPinned} onChange={this.toggleSidebar} />
       </CardText>
     </Card>
    );
  }
});

export default LayoutControlsCard;
