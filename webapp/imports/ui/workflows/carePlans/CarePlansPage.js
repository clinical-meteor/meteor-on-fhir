import { CardText, CardTitle } from 'material-ui/Card';
import {Tab, Tabs} from 'material-ui/Tabs';

import CarePlanDetail from '/imports/ui/workflows/carePlans/CarePlanDetail';
import CarePlansTable from '/imports/ui/workflows/carePlans/CarePlansTable';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { Meteor } from 'meteor/meteor';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

export class CarePlansPage extends React.Component {
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
      tabIndex: Session.get('carePlanPageTabIndex'),
      carePlanSearchFilter: Session.get('carePlanSearchFilter'),
      currentCarePlan: Session.get('selectedCarePlan')
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
    Session.set('carePlanPageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedCarePlan', false);
    Session.set('carePlanUpsert', false);
  }

  render() {
    if(process.env.NODE_ENV === "test") console.log('In CarePlansPage render');
    return (
      <div id='carePlansPage'>
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle title='CarePlans' />
            <CardText>
              <Tabs id="carePlansPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
               <Tab className='newCarePlanTab' label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
                 <CarePlanDetail id='newCarePlan' />
               </Tab>
               <Tab className="carePlanListTab" label='CarePlans' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                <CarePlansTable />
               </Tab>
               <Tab className="carePlanDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                 <CarePlanDetail id='carePlanDetails' />
               </Tab>
             </Tabs>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}

ReactMixin(CarePlansPage.prototype, ReactMeteorData);
