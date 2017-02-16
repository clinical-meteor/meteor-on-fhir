import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Tabs, Tab } from 'material-ui/Tabs';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardTitle, CardText } from 'material-ui/Card';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

import { Meteor } from 'meteor/meteor';
import Glass from '/imports/ui/Glass';

import { Table } from 'react-bootstrap';
import Checkbox from 'material-ui/Checkbox';


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
        },
        cell: {
          lineHeight: '24px'
        },
        rowText: Glass.darkroom({cursor: 'pointer'})
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
        <tr key={i} style={this.data.style.rowText} selected={ this.data.entry[i].selected } selectable={true} onClick={this.rowClick.bind(this)}>
          <td style={this.data.style.cell}>
            <Checkbox checked={this.data.entry[i].selected} onClick={this.toggleTask.bind('this', i)} />
          </td>
          <td style={this.data.style.cell}>{ moment(this.data.entry[i].date).format("YYYY-MM-DD") }</td>
          <td style={this.data.style.cell}>{this.data.entry[i].flag.text ? this.data.entry[i].flag.text : ''}</td>
          <td style={this.data.style.cell}>{this.data.entry[i].item.display}</td>
        </tr>
      );
    }

    return (
      <div className="checklist">
        <Table hover onRowSelection={this.toggleTask.bind(this)}>
          <thead>
            <tr >
              <th>Checkbox</th>
              <th style={{width: '100px'}}>Created</th>
              <th>Flag</th>
              <th>Task</th>
            </tr>
          </thead>
          <tbody>
            { listRows }
          </tbody>
        </Table>
      </div>
    );
  }
}



ReactMixin(Checklist.prototype, ReactMeteorData);
