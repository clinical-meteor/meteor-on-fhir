//  Sensitivity and Specificity
//  https://en.wikipedia.org/wiki/Sensitivity_and_specificity
//  https://en.wikipedia.org/wiki/Pre-_and_post-test_probability

//  Note: This calculator currently doesn't calculate the number of significant digits correctly
//  and may produce results that are overly precise

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
Session.setDefault('pretestProbability', 0);

export class SpecificitySensitivityCard extends React.Component {
  constructor(props) {
    super(props);
  }
  changeInput(variable, event, value){
    //var newNum = parseFloat(value);
    //console.log(newNum);

    //if (typeof newNum !== "NaN") {
      Session.set(variable, value);
    //}
  }

  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      truePositives: parseInt(Session.get('truePositives')),
      falsePositives: parseInt(Session.get('falsePositives')),
      trueNegatives: parseInt(Session.get('trueNegatives')),
      falseNegatives: parseInt(Session.get('falseNegatives')),
      positiveTests: 0,
      negativeTests: 0,
      haveDisease: 0,
      notHaveDisease: 0,
      totalTested: 0,
      sensitivity: 0,
      specificity: 0,
      positiveLikelihood: 0,
      negativeLikelihood: 0,
      positivePredictiveValue: 0,
      negativePredictiveValue: 0,
      odds: 0,
      probability: 0,
      pretestProbability: Session.get('pretestProbability'),
      pretestOdds: 0,
      postTestProbability: 0,
      postTestOdds: 0
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

      data.positivePredictiveValue = data.truePositives / (data.truePositives + data.falsePositives);
      data.negativePredictiveValue = data.trueNegatives / (data.trueNegatives + data.falseNegatives);

      data.pretestOdds = data.pretestProbability / (1 - data.pretestProbability);

      data.postTestOdds = data.pretestOdds * data.positiveLikelihood;
      data.postTestProbability = data.postTestOdds / (data.postTestOdds + 1);

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
               { (100 * this.data.sensitivity).toString().substring(0, 4)} %<br /><br />

               <b>Specficity</b>
               <LinearProgress mode="determinate" value={this.data.specificity * 100} max={100} color={orange500} />
               { (100 * this.data.specificity).toString().substring(0, 4)} %<br /><br />

               <b>Positive Predictive Value</b><br />
               { (100 * this.data.positivePredictiveValue).toString().substring(0, 5)} %<br /><br />

               <b>Negative Predictive Value</b><br />
               { (100 * this.data.negativePredictiveValue).toString().substring(0, 5)} %<br /><br />

               <b>Positive Likelihood Ratio</b><br />
               {this.data.positiveLikelihood}<br /><br />

               <b>Negative Likelihood Ratio</b><br />
               {this.data.negativeLikelihood}<br /><br />


              <TextField hintText="Pretest Probability (%)"  onChange={this.changeInput.bind(this, 'pretestProbability')} value={this.data.pretestProbability}/>
              <br /><br />

               <b>Pre-Test Probability</b><br />
               { (100 * this.data.pretestProbability).toString().substring(0, 5)} %<br /><br />

               <b>Pre-Test Odds</b><br />
               {this.data.pretestOdds}<br /><br />

               <b>Post-Test Probability</b><br />
               { (100 * this.data.postTestProbability).toString().substring(0, 5)} %<br /><br />

               <b>Post-Test Odds</b><br />
               { this.data.postTestOdds}<br /><br />

            </CardText>
          </GlassCard>
        </VerticalCanvas>


      </div>
    );
  }
}

ReactMixin(SpecificitySensitivityCard.prototype, ReactMeteorData);
