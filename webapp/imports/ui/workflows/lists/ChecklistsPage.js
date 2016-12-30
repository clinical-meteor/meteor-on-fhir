import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Tabs, Tab } from 'material-ui/Tabs';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardTitle, CardText } from 'material-ui/Card';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import { Meteor } from 'meteor/meteor';
import Glass from '/imports/ui/Glass';

Session.setDefault('checklistPageTabIndex', 1);
Session.setDefault('checklistSearchFilter', '');
Session.setDefault('selectedChecklist', false);


export class ChecklistsPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        }
      },
      state: {
        isLoggedIn: false
      },
      tabIndex: Session.get('checklistPageTabIndex'),
      checklistSearchFilter: Session.get('checklistSearchFilter'),
      currentChecklist: Session.get('selectedChecklist'),
      lists: []
    };

    if (Lists.find().count() > 0) {
      data.lists = Lists.find().map(function(list){
        var result = {
          status: list.status,
          date: '',
          code: '',
          note: list.note
        }
        if (list.code && list.code.text) {
          result.code = list.code.text;
        }
        if (list.date) {
          result.date = list.date.toString();
        }
        return result;
      });
    }

    if (Meteor.user()) {
      data.state.isLoggedIn = true;
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("ChecklistsPage[data]", data);
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
    for (var i = 0; i < this.data.lists.length; i++) {
      listRows.push(
        <TableRow key={i}>
          <TableRowColumn>{this.data.lists[i].status}</TableRowColumn>
          <TableRowColumn>{this.data.lists[i].date}</TableRowColumn>
          <TableRowColumn>{this.data.lists[i].code}</TableRowColumn>
          <TableRowColumn>{this.data.lists[i].note}</TableRowColumn>
        </TableRow>);
    }
    return (
      <div id="checklistsPage">
        <VerticalCanvas>
          <GlassCard>
            <CardTitle
              title="Checklists"
            />
            <CardText>

              <Table >
                <TableHeader displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn>Status</TableHeaderColumn>
                    <TableHeaderColumn>Created At</TableHeaderColumn>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Note</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  { listRows }
                </TableBody>
              </Table>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}



ReactMixin(ChecklistsPage.prototype, ReactMeteorData);
