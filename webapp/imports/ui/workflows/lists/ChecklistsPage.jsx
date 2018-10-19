import { CardText, CardTitle } from 'material-ui/Card';
import { Tab, Tabs } from 'material-ui/Tabs';
import { TextField, RaisedButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';

import { Checklist } from '/imports/ui/workflows/lists/Checklist';
import ChecklistTableRow from '/imports/ui/workflows/lists/ChecklistTableRow';
import { Meteor } from 'meteor/meteor';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import { VerticalCanvas, GlassCard, Glass } from 'meteor/clinical:glass-ui';

import { lightBaseTheme, darkBaseTheme } from 'material-ui/styles';
import { get } from 'lodash';

Session.setDefault('checklistPageTabIndex', 0);
Session.setDefault('checklistSearchFilter', '');
Session.setDefault('selectedChecklist', false);
Session.setDefault('newTask', '');


export class ChecklistsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTask: '',
      newChecklistTitle: ''
    }
  }
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        },
        rowText: Glass.darkroom({cursor: 'pointer'}),
        textColor: {
          color: lightBaseTheme.palette.textColor
        },
        inputStyle: {
          color: lightBaseTheme.palette.textColor
        },
        errorStyle: {
          color: lightBaseTheme.palette.accent1Color
        },
        hintStyle: {
          color: lightBaseTheme.palette.secondaryTextColor
        },
        underlineStyle: {
          borderColor: lightBaseTheme.palette.textColor
        },
        floatingLabelStyle: {
          color: lightBaseTheme.palette.secondaryTextColor
        },
        floatingLabelFocusStyle: {
          color: lightBaseTheme.palette.secondaryTextColor
        }
      },
      state: {
        isLoggedIn: false
      },
      tabIndex: Session.get('checklistPageTabIndex'),
      checklistSearchFilter: Session.get('checklistSearchFilter'),
      currentChecklist: Session.get('selectedChecklist'),
      currentChecklistTitle: false,
      lists: []
    };

    if ((typeof Lists === "object") && Lists.find().count() > 0) {
      data.lists = Lists.find().map(function(list){
        var result = {
          _id: list._id,
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

    if(Session.get('selectedChecklist')){
      let currentList = Lists.findOne({_id: Session.get('selectedChecklist')})
      data.currentChecklistTitle = get(currentList, 'code.text');
    }


    if (Meteor.user()) {
      data.state.isLoggedIn = true;
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "development") console.log("ChecklistsPage[data]", data);
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
    console.log("click", row,column,event);
  }

  fooClick(i){
    console.log("foo", i);
    Session.set('selectedChecklist', i);
    Session.set('checklistPageTabIndex', 1);
  }
  handleTouchTap(value){    
    console.log('handleTouchTap', value)

    console.log('selectedChecklistId', Session.get('selectedChecklist'))

    let selectedChecklist = Lists.findOne({_id: Session.get('selectedChecklist')});
    console.log('selectedChecklist', selectedChecklist)

    selectedChecklist.entry.push({
      "flag": {
        "text": "Pending",
        "coding": [
          {
            "system": "http://hl7.org/fhir/ValueSet/order-status",
            "code": "pending",
            "display": "Pending"
          }
        ]
      },
      "deleted": false,
      "date": new Date(),
      "item": {
        "display": value
      }
    });

    Lists.update({_id: Session.get('selectedChecklist')}, {$addToSet: {
      'entry': {
        "flag": {
          "text": "Pending",
          "coding": [
            {
              "system": "http://hl7.org/fhir/ValueSet/order-status",
              "code": "pending",
              "display": "Pending"
            }
          ]
        },
        "deleted": false,
        "date": new Date(),
        "item": {
          "display": value
        }
      }
    }})

    this.setState({
      newTask: ''
    })
  }
  handleKeyPress(e, value) {
    console.log('handleKeyPress', e.key)

    this.setState({
      newTask: this.state.newTask + e.key
    })
    if (e.key === 'Enter') {
      this.handleTouchTap(this.state.newTask);
    }
  }

  handleTitleTouchTap(value){    
    console.log('handleTitleTouchTap', value)
    console.log('selectedChecklistId', Session.get('selectedChecklist'))

    let selectedChecklist = Lists.findOne({_id: Session.get('selectedChecklist')});
    Lists.update({_id: Session.get('selectedChecklist')}, {$set: {
      'code.text': value
    }})

    this.setState({
      newChecklistTitle: ''
    })
  }
  titleKeyPress(e, value) {
    console.log('titleKeyPress', e.key)

    this.setState({
      newChecklistTitle: this.state.newChecklistTitle + e.key
    })
    if (e.key === 'Enter') {
      this.handleTitleTouchTap(this.state.newChecklistTitle);
    }
  }
  render() {
    let listRows = [];
    let checklistTitle = 'Checklists';

    if(this.data.currentChecklistTitle){
      checklistTitle = this.data.currentChecklistTitle;
    } else {
      checklistTitle = <TextField
        type="newChecklistTitle"
        name="newChecklistTitle"
        floatingLabelText="Checklist Name"
        onKeyPress={this.titleKeyPress.bind(this)}
        inputStyle={this.data.style.inputStyle}
        hintStyle={this.data.style.hintStyle}
        hintText='...'
        errorStyle={this.data.style.errorStyle}
        underlineStyle={this.data.style.underlineStyle}
        floatingLabelStyle={this.data.style.floatingLabelStyle}
        floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
        value={this.state.newChecklistTitle}
        fullWidth
      />
    }

    
    for (var i = 0; i < this.data.lists.length; i++) {
      listRows.push(
        <ChecklistTableRow key={i} style={this.data.style.rowText} onClick={this.fooClick.bind('this', this.data.lists[i]._id)} >
          <TableRowColumn style={{width: '100px'}}>{this.data.lists[i].status}</TableRowColumn>
          <TableRowColumn>{this.data.lists[i].date}</TableRowColumn>
          <TableRowColumn>{this.data.lists[i].code}</TableRowColumn>
          <TableRowColumn>{this.data.lists[i].note}</TableRowColumn>
        </ChecklistTableRow>);
    }
    return (
      <div id="checklistsPage">
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle
              title={checklistTitle}
              titleStyle={this.data.style.rowText}
            />
            <CardText>
              <Tabs id="checklistsPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={0}>
                <Tab className="checklistListTab" label='Checklists' onActive={this.handleActive} style={this.data.style.tab} value={0}>
                  <Table onCellClick={this.rowClick.bind(this)}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={this.data.style.rowText} >
                      <TableRow >
                        <TableHeaderColumn style={{width: '100px'}}>Status</TableHeaderColumn>
                        <TableHeaderColumn>Created At</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Note</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} showRowHover={true}>
                      { listRows }
                    </TableBody>
                  </Table>
                </Tab>
                <Tab className="checklistDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                  <TextField
                    type="newTask"
                    name="newTask"
                    floatingLabelText="New Task"
                    onKeyPress={this.handleKeyPress.bind(this)}
                    inputStyle={this.data.style.inputStyle}
                    hintStyle={this.data.style.hintStyle}
                    hintText='...'
                    errorStyle={this.data.style.errorStyle}
                    underlineStyle={this.data.style.underlineStyle}
                    floatingLabelStyle={this.data.style.floatingLabelStyle}
                    floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
                    value={this.state.newTask}
                    fullWidth
                  />
                  <Checklist />
                </Tab>
              </Tabs>

            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}



ReactMixin(ChecklistsPage.prototype, ReactMeteorData);
