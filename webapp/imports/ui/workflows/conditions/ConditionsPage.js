import { CardText, CardTitle } from 'material-ui/Card';
import {Tab, Tabs} from 'material-ui/Tabs';

import ConditionDetail from '/imports/ui/workflows/conditions/ConditionDetail';
import ConditionsTable from '/imports/ui/workflows/conditions/ConditionsTable';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { Meteor } from 'meteor/meteor';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

export class ConditionsPage extends React.Component {
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
      tabIndex: Session.get('conditionPageTabIndex'),
      conditionSearchFilter: Session.get('conditionSearchFilter'),
      currentCondition: Session.get('selectedCondition')
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
    Session.set('conditionPageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedCondition', false);
    Session.set('conditionUpsert', false);
  }

  render() {
    if(process.env.NODE_ENV === "test") console.log('In ConditionsPage render');
    return (
      <div id='conditionsPage'>
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle title='Conditions' />
            <CardText>
              <Tabs id="conditionsPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
               <Tab className='newConditionTab' label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
                 <ConditionDetail id='newCondition' />
               </Tab>
               <Tab className="conditionListTab" label='Conditions' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                <ConditionsTable />
               </Tab>
               <Tab className="conditionDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                 <ConditionDetail 
                 id='conditionDetails' 
                 showDatePicker={true} 
                 />
               </Tab>
             </Tabs>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}

ReactMixin(ConditionsPage.prototype, ReactMeteorData);
