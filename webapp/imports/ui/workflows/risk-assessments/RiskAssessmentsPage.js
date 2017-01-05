import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardTitle, CardText } from 'material-ui/Card';

import RiskAssessmentDetail from '/imports/ui/workflows/risk-assessments/RiskAssessmentDetail';
import RiskAssessmentsTable from '/imports/ui/workflows/risk-assessments/RiskAssessmentsTable';
import {Tabs, Tab} from 'material-ui/Tabs';

import { Meteor } from 'meteor/meteor';

export class RiskAssessmentsPage extends React.Component {
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
      tabIndex: Session.get('riskAssessmentPageTabIndex'),
      riskAssessmentSearchFilter: Session.get('riskAssessmentSearchFilter'),
      currentRiskAssessment: Session.get('selectedRiskAssessment')
    };

    if (Meteor.user()) {
      data.state.isLoggedIn = true;
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    return data;
  }

  handleTabChange(index){
    Session.set('riskAssessmentPageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedRiskAssessment', false);
    Session.set('riskAssessmentUpsert', false);
  }

  render() {
    if(process.env.NODE_ENV === "test") console.log('In RiskAssessmentsPage render');
    return (
      <div id='riskAssessmentsPage'>
        <VerticalCanvas>
          <GlassCard>
            <CardTitle title='RiskAssessments' />
            <CardText>
              <Tabs id="riskAssessmentsPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
               <Tab className='newRiskAssessmentTab' label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
                 <RiskAssessmentDetail id='newRiskAssessment' />
               </Tab>
               <Tab className="riskAssessmentListTab" label='RiskAssessments' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                <RiskAssessmentsTable />
               </Tab>
               <Tab className="riskAssessmentDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                 <RiskAssessmentDetail id='riskAssessmentDetails' />
               </Tab>
             </Tabs>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}

ReactMixin(RiskAssessmentsPage.prototype, ReactMeteorData);
