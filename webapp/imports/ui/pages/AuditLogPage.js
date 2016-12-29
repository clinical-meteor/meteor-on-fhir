import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Tabs, Tab } from 'material-ui/Tabs';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardTitle, CardText } from 'material-ui/Card';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
// import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {List, ListItem} from 'material-ui/List';

import { Meteor } from 'meteor/meteor';
import Glass from '/imports/ui/Glass';

import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';

import { blue500, yellow600 } from 'material-ui/styles/colors';


Session.setDefault('checklistPageTabIndex', 1);
Session.setDefault('checklistSearchFilter', '');
Session.setDefault('selectedChecklist', false);


export class AuditLogPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {},
      events: []
    };

    if (HipaaLog.find().count() > 0) {
      data.events = HipaaLog.find().map(function(event){
        var result = {
          text: '',
          date: ''
        }
        if (event.timestamp) {
          result.date = moment(event.date).format("MMM DD, YYYY");
        }

        if (event.eventType === "init") {
          result.text = event.userName + " initialized HIPAA Audit Log.";
        }
        if (event.eventType === "access") {
          result.text = event.userName + " accessed record(s) " + event.recordId + " in the " + event.collectionName + " collection.";
        }
        if (event.eventType === "create") {
          result.text = event.userName + " created record " + event.recordId + " in the " + event.collectionName + " collection.";
        }
        if (event.eventType === "update") {
          result.text = event.userName + " updated record " + event.recordId + " in the " + event.collectionName + " collection.";
        }
        if (event.eventType === "delete") {
          result.text = event.userName + " deleted record " + event.recordId + " in the " + event.collectionName + " collection.";
        }
        if (event.eventType === "denied") {
          result.text = event.userName + " was denied access to record " + event.recordId + " in the " + event.collectionName + " collection.";
        }
        if (event.eventType === "viewed") {
          result.text = event.userName + " published record " + event.recordId + " in the " + event.collectionName + " collection.";
        }
        if (event.eventType === "published") {
          result.text = event.userName + " unpublished record " + event.recordId + " in the " + event.collectionName + " collection.";
        }
        if (event.eventType === "unpublish") {
          result.text = event.userName + " initialized HIPAA Audit Log.";
        }

        return result;
      });
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("AuditLogPage[data]", data);
    return data;
  }

  // this could be a mixin
  handleTabChange(index){
    Session.set('checklistPageTabIndex', index); }

  // this could be a mixin
  onNewTab(){
    console.log("onNewTab; we should clear things...");

    Session.set('selectedChecklist', false);
    Session.set('checklistDetailState', false);
  }

  render() {
    let listRows = [];
    for (var i = 0; i < this.data.events.length; i++) {
      listRows.push(
        <ListItem
          key={i}
          leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
          primaryText={this.data.events[i].date}
          secondaryText={this.data.events[i].text}
          />);
    }
    return (
      <div id="auditLogPage">
        <VerticalCanvas>
          <GlassCard>
            <CardTitle
              title="Audit Log"
            />
            <CardText>

              <List >
                { listRows }
              </List>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}



ReactMixin(AuditLogPage.prototype, ReactMeteorData);
