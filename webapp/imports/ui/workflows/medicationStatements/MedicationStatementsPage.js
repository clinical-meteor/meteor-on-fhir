import { CardText, CardTitle } from 'material-ui/Card';
import {Tab, Tabs} from 'material-ui/Tabs';

import { GlassCard } from '/imports/ui/components/GlassCard';
import MedicationStatementDetail from '/imports/ui/workflows/medicationStatements/MedicationStatementDetail';
import MedicationStatementsTable from '/imports/ui/workflows/medicationStatements/MedicationStatementsTable';
import { Meteor } from 'meteor/meteor';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

export class MedicationStatementsPage extends React.Component {
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
      tabIndex: Session.get('medicationStatementPageTabIndex'),
      medicationStatementSearchFilter: Session.get('medicationStatementSearchFilter'),
      currentMedicationStatement: Session.get('selectedMedicationStatement')
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
    Session.set('medicationStatementPageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedMedicationStatement', false);
    Session.set('medicationStatementFormUpsert', false);
  }

  render() {
    if(process.env.NODE_ENV === "test") console.log('In MedicationStatementsPage render');
    return (
      <div id='medicationStatementsPage'>
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle title='Medication Statements' />
            <CardText>
              <Tabs id="medicationStatementsPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
               <Tab className='newMedicationStatementTab' label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
                 <MedicationStatementDetail id='newMedicationStatement' />
               </Tab>
               <Tab className="medicationStatementListTab" label='MedicationStatements' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                <MedicationStatementsTable />
               </Tab>
               <Tab className="medicationStatementDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                 <MedicationStatementDetail id='medicationStatementDetails' />
               </Tab>
             </Tabs>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}

ReactMixin(MedicationStatementsPage.prototype, ReactMeteorData);
