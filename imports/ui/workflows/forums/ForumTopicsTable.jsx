import React from 'react';
import ReactMixin from 'react-mixin';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Topics } from '/imports/api/topics/topics';

import Avatar from 'react-toolbox/lib/avatar';

import { Table } from 'react-bootstrap';
import { browserHistory } from 'react-router';


export default class ForumTopicsTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      topics: Topics.find().map(function(record){
        return {
          _id: record._id,
          name: record.name,
          cateogry: record.cateogry,
          replies: record.replies,
          views: record.views,
          activity: record.activity,
          createdAt: moment(record.createdAt).format('YYYY-MM-DD'),
          photo: record.photo ? record.photo[0].url: ''
        };
      })
    };

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

    //console.log("data", data);

    return data;
  }

  handleChange(row, key, value) {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
  }

  handleSelect(selected) {
    this.setState({selected});
  }
  getDate(){
    return 'YYYY/MM/DD';
  }
  noChange(){
    return '';
  }
  rowClick(id){

    // alert(id);
    console.log('/topic/' + id);

    // browserHistory.push('/topic/' + id);
    // // set the user
    // Session.set('selectedPatient', id);
    //
    // // set which tab is selected
    // let state = Session.get('patientCardState');
    // state['index'] = 2;
    // Session.set('patientCardState', state);
  }

  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.topics.length; i++) {
      tableRows.push(
        <tr key={i} className='patientRow' style={{cursor: 'pointer'}} onClick={ this.rowClick.bind('this', this.data.topics[i]._id)} >

          <td>{this.data.topics[i].name }</td>
          <td>{this.data.topics[i].category}</td>
          <td>
            <Avatar><img src={this.data.topics[i].photo }/></Avatar>
          </td>

          <td>{this.data.topics[i].createdAt }</td>
          <td>{this.data.topics[i].replies}</td>
          <td>{this.data.topics[i].views}</td>
          <td>{this.data.topics[i].activity}</td>
        </tr>
      );
    }

    return(
      <Table responses hover >
        <thead>
          <tr>
            <th>Topic</th>
            <th>Category</th>
            <th>Users</th>
            <th>Created On</th>
            <th>Replies</th>
            <th>Views</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}


ForumTopicsTable.propTypes = {};
ReactMixin(ForumTopicsTable.prototype, ReactMeteorData);
