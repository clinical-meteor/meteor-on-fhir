import { CardText, CardTitle } from 'material-ui/Card';
import {Tab, Tabs} from 'material-ui/Tabs';

import AllergyIntoleranceDetail from '/imports/ui/workflows/allergyIntolerances/AllergyIntoleranceDetail';
import AllergyIntolerancesTable from '/imports/ui/workflows/allergyIntolerances/AllergyIntolerancesTable';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { Meteor } from 'meteor/meteor';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

export class AllergyIntolerancesPage extends React.Component {
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
      tabIndex: Session.get('allergyIntolerancePageTabIndex'),
      allergyIntoleranceSearchFilter: Session.get('allergyIntoleranceSearchFilter'),
      currentAllergyIntolerance: Session.get('selectedAllergyIntolerance')
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
    Session.set('allergyIntolerancePageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedAllergyIntolerance', false);
    Session.set('allergyIntoleranceUpsert', false);
  }

  render() {
    if(process.env.NODE_ENV === "test") console.log('In AllergyIntolerancesPage render');
    return (
      <div id='allergyIntolerancesPage'>
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle title='Allergy Intolerances' />
            <CardText>
              <Tabs id="allergyIntolerancesPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
               <Tab className='newAllergyIntoleranceTab' label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
                 <AllergyIntoleranceDetail id='newAllergyIntolerance' />
               </Tab>
               <Tab className="allergyIntoleranceListTab" label='AllergyIntolerances' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                <AllergyIntolerancesTable id='allergyIntolerancesTable' />
               </Tab>
               <Tab className="allergyIntoleranceDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                 <AllergyIntoleranceDetail id='allergyIntoleranceDetails' />
               </Tab>
             </Tabs>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}

ReactMixin(AllergyIntolerancesPage.prototype, ReactMeteorData);