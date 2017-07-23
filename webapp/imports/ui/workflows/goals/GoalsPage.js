import { CardText, CardTitle } from 'material-ui/Card';
import {Tab, Tabs} from 'material-ui/Tabs';

import { GlassCard } from '/imports/ui/components/GlassCard';
import GoalDetail from '/imports/ui/workflows/goals/GoalDetail';
import GoalsTable from '/imports/ui/workflows/goals/GoalsTable';
import { Meteor } from 'meteor/meteor';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

export class GoalsPage extends React.Component {
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
      tabIndex: Session.get('goalPageTabIndex'),
      goalSearchFilter: Session.get('goalSearchFilter'),
      currentGoal: Session.get('selectedGoal')
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
    Session.set('goalPageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedGoal', false);
    Session.set('goalUpsert', false);
  }

  render() {
    if(process.env.NODE_ENV === "test") console.log('In GoalsPage render');
    return (
      <div id='goalsPage'>
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle title='Goals' />
            <CardText>
              <Tabs id="goalsPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
               <Tab className='newGoalTab' label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
                 <GoalDetail id='newGoal' />
               </Tab>
               <Tab className="goalListTab" label='Goals' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                <GoalsTable />
               </Tab>
               <Tab className="goalDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                 <GoalDetail id='goalDetails' />
               </Tab>
             </Tabs>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}

ReactMixin(GoalsPage.prototype, ReactMeteorData);
