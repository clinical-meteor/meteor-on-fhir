import { Table } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import Avatar from 'material-ui/Avatar';
import React from 'react';
import ReactMixin from 'react-mixin';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Topics } from '/imports/api/topics/topics';
import IconButton from 'material-ui/IconButton';

import { removeTopicById } from '/imports/api/topics/methods';
import { Bert } from 'meteor/themeteorchef:bert';

export class ForumTopicsTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      state: {
        isAdmin: false
      },
      selected: [],
      topics: []
    };

    if (Meteor.user() && Meteor.user().roles && (Meteor.user().roles[0] === 'sysadmin')) {
      data.state.isAdmin = true;
    }

    if (Topics.find().count() > 0) {
      data.topics = Topics.find({},{sort: {activity: -1}}).map(function(record){
        return {
          _id: record._id,
          name: record.name,
          cateogry: record.cateogry,
          replies: record.replies,
          views: record.views,
          // activity: record.activity ?  moment(record.activity).format('YYYY-MM-DD hh:mm:ss') : '',
          activity: record.activity ?  moment(record.activity).fromNow() : '',
          createdAt: moment(record.createdAt).format('YYYY-MM-DD'),
          createdByAvatar: record.createdBy ? record.createdBy.avatar : '/thumbnail-blank.png',
          photo: record.photo ? record.photo[0].url : '/thumbnail-blank.png',
          initials: record.name[0]
        };
      });
    }

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

    // this could be another mixin
    if (Session.get('backgroundBlurEnabled')) {
      data.style.backdropFilter = 'blur(5px)';
    }

    // another mixin
    if (Session.get('appWidth') > 768) {
      Session.set('hasPageVerticalPadding', true);
      Session.set('mainPanelIsCard', true);
    } else {
      Session.set('hasPageVerticalPadding', false);
      Session.set('mainPanelIsCard', false);
    }

    //console.log("data", data);

    return data;
  }

  rowClick(id){
    browserHistory.push('/topic/' + id);
  }

  renderAdminControls(isAdmin, i) {
    if (isAdmin) {
      return (
        <td>
          <IconButton iconClassName="muidocs-icon-content-clear" onClick={ this.removeTopic.bind(this, this.data.topics[i]._id) } />
        </td>
      );
    }
  }
  renderAdminHeaders(isAdmin) {
    if (isAdmin) {
      return (
        <th>Remove</th>
      );
    }
  }

  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.topics.length; i++) {
      tableRows.push(
        <tr key={i} className='patientRow' style={{cursor: 'pointer'}} >

          <td onClick={ this.rowClick.bind('this', this.data.topics[i]._id)}>{this.data.topics[i].name }</td>
          <td onClick={ this.rowClick.bind('this', this.data.topics[i]._id)}> {this.data.topics[i].category}</td>
          <td onClick={ this.rowClick.bind('this', this.data.topics[i]._id)}>
            <Avatar src={this.data.topics[i].createdByAvatar}>
              {this.data.topics[i].initials}
            </Avatar>
          </td>

          <td onClick={ this.rowClick.bind('this', this.data.topics[i]._id)}>{this.data.topics[i].createdAt }</td>
          <td onClick={ this.rowClick.bind('this', this.data.topics[i]._id)}>{this.data.topics[i].replies}</td>
          <td onClick={ this.rowClick.bind('this', this.data.topics[i]._id)}>{this.data.topics[i].views}</td>
          <td onClick={ this.rowClick.bind('this', this.data.topics[i]._id)}>{this.data.topics[i].activity}</td>
          { this.renderAdminControls(this.data.state.isAdmin, i) }
        </tr>
      );
    }

    return(
      <Table responses hover >
        <thead>
          <tr>
            <th>Topic</th>
            <th>Category</th>
            <th>CreatedBy</th>
            <th>Created On</th>
            <th>Replies</th>
            <th>Views</th>
            <th>Last Activity</th>
          { this.renderAdminHeaders(this.data.state.isAdmin) }
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }

  removeTopic(topicId, event){
    event.preventDefault();
    console.log("removeTopic", topicId);

    removeTopicById.call({
      _id: topicId
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Topic removed!', 'success');
      }
    });
  }
}



ReactMixin(ForumTopicsTable.prototype, ReactMeteorData);
