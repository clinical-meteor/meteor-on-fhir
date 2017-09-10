import { CardText, CardTitle } from 'material-ui/Card';
import {Tab, Tabs} from 'material-ui/Tabs';

import DiagnosticReportDetail from '/imports/ui/workflows/diagnosticReports/DiagnosticReportDetail';
import DiagnosticReportsTable from '/imports/ui/workflows/diagnosticReports/DiagnosticReportsTable';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { Meteor } from 'meteor/meteor';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

export class DiagnosticReportsPage extends React.Component {
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
      tabIndex: Session.get('diagnosticReportPageTabIndex'),
      diagnosticReportSearchFilter: Session.get('diagnosticReportSearchFilter'),
      currentDiagnosticReport: Session.get('selectedDiagnosticReport')
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
    Session.set('diagnosticReportPageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedDiagnosticReport', false);
    Session.set('diagnosticReportUpsert', false);
  }

  render() {
    if(process.env.NODE_ENV === "test") console.log('In DiagnosticReportsPage render');
    return (
      <div id='diagnosticReportsPage'>
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle title='DiagnosticReports' />
            <CardText>
              <Tabs id="diagnosticReportsPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
               <Tab className='newDiagnosticReportTab' label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
                 <DiagnosticReportDetail id='newDiagnosticReport' />
               </Tab>
               <Tab className="diagnosticReportListTab" label='DiagnosticReports' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                <DiagnosticReportsTable />
               </Tab>
               <Tab className="diagnosticReportDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                 <DiagnosticReportDetail id='diagnosticReportDetails' />
               </Tab>
             </Tabs>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}

ReactMixin(DiagnosticReportsPage.prototype, ReactMeteorData);
