import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Tabs, Tab } from 'material-ui/Tabs';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardTitle, CardText } from 'material-ui/Card';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

import QuestionnaireResponseDetail from '/imports/ui/workflows/questionnaires/QuestionnaireResponseDetail';
import QuestionnaireResponseTable from '/imports/ui/workflows/questionnaires/QuestionnaireResponseTable';
import { Meteor } from 'meteor/meteor';
import Glass from '/imports/ui/Glass';

Session.setDefault('questionnaireResponsePageTabIndex', 1); Session.setDefault('questionnaireResponseSearchFilter', ''); Session.setDefault('selectedQuestionnaireResponse', false);


export class QuestionnaireResponsesPage extends React.Component {
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
      tabIndex: Session.get('questionnaireResponsePageTabIndex'),
      questionnaireResponseSearchFilter: Session.get('questionnaireResponseSearchFilter'),
      currentQuestionnaireResponse: Session.get('selectedQuestionnaireResponse')
    };

    if (Meteor.user()) {
      data.state.isLoggedIn = true;
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("QuestionnaireResponsesPage[data]", data);
    return data;
  }

  handleTabChange(index){
    Session.set('questionnaireResponsePageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedQuestionnaireResponse', false);
    Session.set('questionnaireResponseUpsert', false);
  }

  render() {
    return (
      <div id="questionnaireResponsesPage"> <VerticalCanvas>
          <GlassCard>
            <CardTitle
              title="QuestionnaireResponses"
            />
            <CardText>
              <Tabs id="questionnaireResponsesPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}> <Tab className="newQuestionnaireResponseTab" label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0} >
                  <QuestionnaireResponseDetail id='newQuestionnaireResponse' />
                </Tab>
                <Tab className="questionnaireResponseListTab" label='QuestionnaireResponses' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                  <QuestionnaireResponseTable />
                </Tab>
                <Tab className="questionnaireResponseDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                  <QuestionnaireResponseDetail id='questionnaireResponseDetails' />
                </Tab>
              </Tabs>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}



ReactMixin(QuestionnaireResponsesPage.prototype, ReactMeteorData);
