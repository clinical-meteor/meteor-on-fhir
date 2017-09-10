import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';

import { GlassCard } from '/imports/ui/components/GlassCard';
import LinearProgress from 'material-ui/LinearProgress';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

export class MyAllergyIntolerances extends React.Component {

  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      allergyIntolerances: []
    };

    // mock data; replace with real data

    data.allergyIntolerances = [{
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
    Session.set('allergyIntolerancesUpsert', false);
    Session.set('selectedAllergyIntolerance', id);
    Session.set('allergyIntolerancePageTabIndex', 2);
  };
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.allergyIntolerances.length; i++) {
      tableRows.push(
        <tr key={i} className="allergyIntoleranceRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.allergyIntolerances[i]._id)} >

          <td className='text' style={{width: "300px", fontSize: "18"}}>{this.data.allergyIntolerances[i].text }</td>
          <td className='progressBar'>
            <LinearProgress mode="determinate" value={this.data.allergyIntolerances[i].risk} />
            {this.data.allergyIntolerances[i].risk }%
          </td>
        </tr>
      );
    }

    return(
      <div>
      <VerticalCanvas>
        <GlassCard>
          <CardTitle title='My AllergyIntolerances' />
          <CardText>
            <Table id='allergyIntolerancesTable' responses hover >
              <thead>
                <tr>
                  <th className='text'>allergyIntolerance</th>
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


ReactMixin(MyAllergyIntolerances.prototype, ReactMeteorData);
