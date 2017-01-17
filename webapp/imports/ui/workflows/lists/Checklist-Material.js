import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Tabs, Tab } from 'material-ui/Tabs';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardTitle, CardText } from 'material-ui/Card';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

import { Table, TableRow, TableBody, TableHeader, TableHeaderColumn, TableRowColumn } from 'material-ui/Table';

import { Meteor } from 'meteor/meteor';
import Glass from '/imports/ui/Glass';

Session.setDefault('checklistPageTabIndex', 0);
Session.setDefault('checklistSearchFilter', '');
Session.setDefault('selectedChecklist', false);


export class Checklist extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        }
      },
      tabIndex: Session.get('checklistPageTabIndex'),
      checklistSearchFilter: Session.get('checklistSearchFilter'),
      currentChecklist: Session.get('selectedChecklist'),
      entry: []
    };

    var list = Lists.findOne({_id: Session.get('selectedChecklist')});
    if (list) {
      data.entry = [];
      list.entry.forEach(function(task){
        if (task.flag.text == "Completed") {
          task.selected = true;
        } else {
          task.selected = false;
        }
        data.entry.push(task);
      });
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("Checklist[data]", data);
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

  rowClick(row,column,event, foo){
    console.log("click", row,column,event, foo);
  }
  toggleTask(index){
    var list = Lists.findOne({_id: Session.get('selectedChecklist')});
    if (list) {

      var query = {};
      if (list.entry[index]) {
        if ( list.entry[index].flag.text === "Pending") {
          list.entry[index].flag.text = "Completed";
        } else {
          list.entry[index].flag.text = "Pending";
        }
      }

      list.date = new Date();

      delete list._id;
      delete list._document;

      console.log("list", list);


      Lists.update({_id: Session.get('selectedChecklist')},{$set: list }, function(error, result){
        if (error) {
          console.log("error", error);
        }
      });

    }
  }
  render() {
    let listRows = [];
    for (var i = 0; i < this.data.entry.length; i++) {
      listRows.push(
        <TableRow key={i} style={{cursor: 'pointer'}} selected={ this.data.entry[i].selected } selectable={true}>
          <TableRowColumn>{ moment(this.data.entry[i].date).format("YYYY-MM-DD") }</TableRowColumn>
          <TableRowColumn>{this.data.entry[i].flag.text ? this.data.entry[i].flag.text : ''}</TableRowColumn>
          <TableRowColumn>{this.data.entry[i].item.display}</TableRowColumn>
        </TableRow>
      );
    }

    return (
      <div className="checklist">
        <Table onCellClick={this.rowClick.bind(this)} onRowSelection={this.toggleTask.bind(this)} selectable={true}>
          <TableHeader displaySelectAll={true} adjustForCheckbox={true}>
            <TableRow >
              <TableHeaderColumn>Created At</TableHeaderColumn>
              <TableHeaderColumn>Flag</TableHeaderColumn>
              <TableHeaderColumn>Task</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={true} showRowHover={true}>
            { listRows }
          </TableBody>
        </Table>
      </div>
    );
  }
}



ReactMixin(Checklist.prototype, ReactMeteorData);
