import { CardText, CardTitle } from 'material-ui/Card';
import {Tab, Tabs} from 'material-ui/Tabs';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { Meteor } from 'meteor/meteor';
import ProcedureDetail from '/imports/ui/workflows/procedures/ProcedureDetail';
import ProceduresTable from '/imports/ui/workflows/procedures/ProceduresTable';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

export class ProceduresPage extends React.Component {
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
      tabIndex: Session.get('procedurePageTabIndex'),
      procedureSearchFilter: Session.get('procedureSearchFilter'),
      currentProcedure: Session.get('selectedProcedure')
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
    Session.set('procedurePageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedProcedure', false);
    Session.set('procedureUpsert', false);
  }

  render() {
    if(process.env.NODE_ENV === "test") console.log('In ProceduresPage render');
    return (
      <div id='proceduresPage'>
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle title='Procedures' />
            <CardText>
              <Tabs id="proceduresPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
               <Tab className='newProcedureTab' label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
                 <ProcedureDetail id='newProcedure' />
               </Tab>
               <Tab className="procedureListTab" label='Procedures' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                <ProceduresTable />
               </Tab>
               <Tab className="procedureDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                 <ProcedureDetail id='procedureDetails' />
               </Tab>
             </Tabs>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}

ReactMixin(ProceduresPage.prototype, ReactMeteorData);
