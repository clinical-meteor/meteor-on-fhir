import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardHeader, CardText, CardActions, CardTitle } from 'material-ui/Card';
import { Link } from 'react-router';
import { Table } from 'react-bootstrap';

import LinearProgress from 'material-ui/LinearProgress';
import {orange500, blue500} from 'material-ui/styles/colors';

import TextField from 'material-ui/TextField';

// should probably replace these with static variables
// don't need reactivity here
Session.setDefault('truePositives', 0);
Session.setDefault('falseNegatives', 0);
Session.setDefault('falsePositives', 0);
Session.setDefault('trueNegatives', 0);

export class SpecificitySensitivityCard extends React.Component {
  constructor(props) {
    super(props);
  }
  changeInput(variable, event, value){
    var newNum = parseInt(value);
    console.log(newNum);

    if (typeof newNum !== "NaN") {
      Session.set(variable, value);
    }
  }

  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      truePositives: Session.get('truePositives'),
      falsePositives: Session.get('falsePositives'),
      trueNegatives: Session.get('trueNegatives'),
      falseNegatives: Session.get('falseNegatives'),
      positiveTests: 0,
      negativeTests: 0,
      haveDisease: 0,
      notHaveDisease: 0,
      totalTested: 0,
      sensitivity: 0,
      specificity: 0,
      positiveLikelihood: 0,
      negativeLikelihood: 0,
      odds: 0,
      probability: 0
    };


      data.positiveTests = parseInt(Session.get('truePositives')) + parseInt(Session.get('falsePositives'));
      data.negativeTests = parseInt(Session.get('trueNegatives')) + parseInt(Session.get('falseNegatives'));

      data.haveDisease = parseInt(Session.get('truePositives')) + parseInt(Session.get('falseNegatives'));
      data.notHaveDisease = parseInt(Session.get('falsePositives')) + parseInt(Session.get('trueNegatives'));

      data.totalTested = data.positiveTests + data.negativeTests;

      data.sensitivity = data.truePositives / (data.truePositives + data.falseNegatives);
      data.specificity = data.trueNegatives / (data.falsePositives + data.trueNegatives);

      data.positiveLikelihood = data.sensitivity / ( 1 - data.specificity);
      data.negativeLikelihood = (1 - data.sensitivity) / data.specificity;


    if(process.env.NODE_ENV === "test") console.log("data", data);
    return data;
  };

  render(){
    return (
      <div>
        <VerticalCanvas>
          <GlassCard>
            <CardTitle
              title="Specificity / Sensitivity Calculator"
            />
             <CardText>

               <Table responses >
                 <tbody>
                   <tr className='keybindingRow' style={{cursor: 'pointer'}} >
                     <td>Tests</td>
                     <td>Disease (+)</td>
                     <td>Disease (-)</td>
                     <td>Totals</td>
                   </tr>
                   <tr className='themingRow' style={{cursor: 'pointer'}} >
                     <td>Test (+)</td>
                     <td>
                      <TextField hintText="True positives (TP)" onChange={this.changeInput.bind(this, 'truePositives')} value={this.data.truePositives} />
                    </td>
                     <td>
                      <TextField hintText="False positives (FN)"  onChange={this.changeInput.bind(this, 'falsePositives')} value={this.data.falsePositives}/>
                     </td>
                     <td>{this.data.positiveTests}</td>
                   </tr>

                   <tr className='keybindingRow' style={{cursor: 'pointer'}} >
                     <td>Test (-)</td>
                     <td>
                      <TextField hintText="False negatives (FP)"  onChange={this.changeInput.bind(this, 'falseNegatives')} value={this.data.falseNegatives}/>
                     </td>
                     <td>
                      <TextField hintText="True negatives (TN)"  onChange={this.changeInput.bind(this, 'trueNegatives')} value={this.data.trueNegatives}/>
                     </td>
                     <td>{this.data.negativeTests}</td>
                   </tr>
                   <tr className='keybindingRow' style={{cursor: 'pointer'}} >
                     <td>Totals</td>
                     <td>{this.data.haveDisease}</td>
                     <td>{this.data.notHaveDisease}</td>
                     <td>{this.data.totalTested}</td>
                   </tr>
                 </tbody>
               </Table>

               <br /><br />

               <b>Sensitivity</b>
               <LinearProgress mode="determinate" value={this.data.sensitivity * 100} max={100} color={orange500} />
               {this.data.sensitivity} <br /><br />

               <b>Specficity</b>
               <LinearProgress mode="determinate" value={this.data.specificity * 100} max={100} color={orange500} />
               {this.data.specificity} <br /><br />

               <b>Positive Likelihood</b><br />
               {this.data.positiveLikelihood} <br /><br />

               <b>Negative Likelihood</b><br />
               {this.data.negativeLikelihood} <br /><br />


            </CardText>
          </GlassCard>
        </VerticalCanvas>


      </div>
    );
  }
}

ReactMixin(SpecificitySensitivityCard.prototype, ReactMeteorData);
