if(Package['clinical:hl7-resource-observation']){

  import { CardText, CardTitle } from 'material-ui/Card';
  import { Tab, Tabs } from 'material-ui/Tabs';
  
  import { DynamicSpacer }  from '/imports/ui/components/DynamicSpacer';
  import Glass from '/imports/ui/Glass';
  import { GlassCard } from '/imports/ui/components/GlassCard';
  import { Meteor } from 'meteor/meteor';
  import ObservationDetail from '/imports/ui/workflows/observations/ObservationDetail';
  import ObservationsTable from '/imports/ui/workflows/observations/ObservationsTable';
  import ObservationsDeck  from '/imports/ui/workflows/observations/ObservationsDeck';
  import React  from 'react';
  import { ReactMeteorData } from 'meteor/react-meteor-data';
  import ReactMixin  from 'react-mixin';
  import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
  
  Session.setDefault('observationPageTabIndex', 1);
  Session.setDefault('observationSearchFilter', '');
  Session.setDefault('selectedObservation', false);
  
  
  export class ObservationsPage extends React.Component {
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
        tabIndex: Session.get('observationPageTabIndex'),
        observationSearchFilter: Session.get('observationSearchFilter'),
        currentObservation: Session.get('selectedObservation')
      };
  
      if (Meteor.user()) {
        data.state.isLoggedIn = true;
      }
  
      data.style = Glass.blur(data.style);
      data.style.appbar = Glass.darkroom(data.style.appbar);
      data.style.tab = Glass.darkroom(data.style.tab);
  
      if(process.env.NODE_ENV === "test") console.log("ObservationsPage[data]", data);
      return data;
    }
  
    // this could be a mixin
    handleTabChange(index){
      Session.set('observationPageTabIndex', index);
    }
  
    // this could be a mixin
    onNewTab(){
      console.log("onNewTab; we should clear things...");
  
      Session.set('selectedObservation', false);
      Session.set('observationDetailState', {
        resourceType: 'Observation',
        status: 'preliminary',
        category: {
          text: ''
        },
        effectiveDateTime: '',
        subject: {
          display: '',
          reference: ''
        },
        performer: {
          display: '',
          reference: ''
        },
        device: {
          display: '',
          reference: ''
        },
        valueQuantity: {
          value: '',
          unit: '',
          system: 'http://unitsofmeasure.org'
        }
      });
    }
  
    render() {
      return (
        <div id="observationsPage">
          <VerticalCanvas>
            <GlassCard height='auto'>
              <CardTitle
                title="Observations"
              />
              <Tabs id="observationsPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
                <Tab className="newObservationTab" label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0} >
                  <ObservationDetail id='newObservation' />
                </Tab>
                <Tab className="observationListTab" label='Observations' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                  <ObservationsTable />
                 </Tab>
                 <Tab className="observationDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                  <ObservationDetail id='observationDetails' />
                </Tab>
              </Tabs>
  
            </GlassCard>
          </VerticalCanvas>
        </div>
      );
    }
  }
  
  
  
  ReactMixin(ObservationsPage.prototype, ReactMeteorData);
  
}
