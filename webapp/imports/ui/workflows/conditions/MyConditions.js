import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';

import { Table } from 'react-bootstrap';

import LinearProgress from 'material-ui/LinearProgress';

export class MyConditions extends React.Component {

  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      conditions: []
    };

    // mock data; replace with real data

    data.conditions = [{
      text: "Delayed Mylinization",
      risk: 100
    }, {
      text: "Asthma",
      risk: 100
    }, {
      text: "Post Nasal Drip",
      risk: 100
    }, {
      text: "Multiple Sclerosis",
      risk: 70
    }, {
      text: "Cancer",
      risk: 10
    }]

    if(process.env.NODE_ENV === "test") console.log("data", data);
    return data;
  }


  rowClick(id){
    Session.set('conditionsUpsert', false);
    Session.set('selectedCondition', id);
    Session.set('conditionPageTabIndex', 2);
  };
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.conditions.length; i++) {
      tableRows.push(
        <tr key={i} className="conditionRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.conditions[i]._id)} >

          <td className='text' style={{width: "300px", fontSize: "18"}}>{this.data.conditions[i].text }</td>
          <td className='progressBar'>
            <LinearProgress mode="determinate" value={this.data.conditions[i].risk} />
            {this.data.conditions[i].risk }%
          </td>
        </tr>
      );
    }

    return(
      <div>
      <VerticalCanvas>
        <GlassCard>
          <CardTitle title='My Conditions' />
          <CardText>
            <Table id='conditionsTable' responses hover >
              <thead>
                <tr>
                  <th className='text'>condition</th>
                  <th className='progressBar'>risk</th>
                </tr>
              </thead>
              <tbody>
                { tableRows }
              </tbody>
            </Table>
          </CardText>
        </GlassCard>
      </VerticalCanvas>
      </div>

    );
  }
}


ReactMixin(MyConditions.prototype, ReactMeteorData);
